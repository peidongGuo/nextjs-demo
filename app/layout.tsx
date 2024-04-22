import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
// import 'antd/dist/antd.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { StyleProvider } from '@ant-design/cssinjs';
import Provider from '@/app/context/client-provider';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* <StyleProvider hashPriority="high"> */}
        <AntdRegistry>
          <Provider session={session}>{children}</Provider>
        </AntdRegistry>
        {/* </StyleProvider> */}
      </body>
    </html>
  );
}
