'use client';
import { FC } from 'react';
import * as yup from 'yup';
import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

const FormSchema = yup.object().shape({
  email: yup.string().required('Email tidak boleh kosong'),
  password: yup.string().required('Password tidak boleh kosong'),
});

const Form: FC = () => {
  const router = useRouter();

  const { handleSubmit, getValues, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(FormSchema),
  });

  const getPayload = () => {
    const form = getValues();
    const payload = {
      email: form.email,
      password: form.password,
    };

    return payload;
  };

  const eventSubmit = async () => {
    const payload = getPayload();

    try {
      const result = await signIn('credentials', {
        email: payload?.email,
        password: payload?.password,
        redirect: false,
      });

      if (result?.status === 200) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form">
      <form
        className="w-3/5 mx-auto"
        onSubmit={(e) => {
          handleSubmit(eventSubmit)(e);
        }}>
        <div className="email">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                name="email"
                id="email"
                placeholder="email@gmail.com"
                className="border-2 w-full mt-4"
              />
            )}
          />
        </div>
        <div className="password">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                name="password"
                id="password"
                placeholder="Masukkan Password"
                className="border-2 w-full my-4"
              />
            )}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
