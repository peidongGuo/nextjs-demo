import Form from '@/app/ui/questions/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/services/data';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Question',
};
export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Questions', href: '/dashboard/questions' },
          {
            label: 'Create Question',
            href: '/dashboard/questions/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
