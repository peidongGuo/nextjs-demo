import Form from '@/app/ui/questions/create-form';
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
          { label: '试题', href: '/dashboard/questions' },
          {
            label: '编辑试题',
            href: `/dashboard/questions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form question={question} isEdit={true} />
    </main>
  );
}
