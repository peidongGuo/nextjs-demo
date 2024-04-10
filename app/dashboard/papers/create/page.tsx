import Form from '@/app/ui/papers/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/services/data';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Invoice',
};
export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '试卷', href: '/dashboard/papers' },
          {
            label: '创建试卷',
            href: '/dashboard/papers/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
