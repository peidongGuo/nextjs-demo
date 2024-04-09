import Form from '@/app/ui/questions/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchQuestionById } from '@/app/services/data-questions';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Edit Question',
};
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const question = await fetchQuestionById(id);

  if (!question) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Questions', href: '/dashboard/questions' },
          {
            label: 'Edit Question',
            href: `/dashboard/questions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form question={question} />
    </main>
  );
}
