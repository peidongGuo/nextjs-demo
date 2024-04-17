import AcmeLogo from '@/app/ui/acme-logo';
import RegisterForm from '@/app/ui/register-form';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '注册',
};
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-62 md:w-66 text-white">
            <AcmeLogo />
          </div>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
