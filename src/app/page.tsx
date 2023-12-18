import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World</h1>
    </main>
  );
}
