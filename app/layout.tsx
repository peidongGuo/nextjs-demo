import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
// import 'antd/dist/antd.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { StyleProvider } from '@ant-design/cssinjs';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* <StyleProvider hashPriority="high"> */}
        <AntdRegistry>{children}</AntdRegistry>
        {/* </StyleProvider> */}
      </body>
    </html>
  );
}
