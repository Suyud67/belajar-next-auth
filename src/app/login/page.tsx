import { FC } from 'react';
import Form from '@/components/form';

const Login: FC = () => {
  return (
    <div className="min-h-screen w-4/5 mx-auto my-8">
      <div className=" bg-slate-50 rounded-lg p-4">
        <div className="text-center text-2xl font-semibold mt-4">
          <h1>Login page</h1>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default Login;
