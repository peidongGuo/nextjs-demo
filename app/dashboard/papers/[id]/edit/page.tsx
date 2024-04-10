import Form from '@/app/ui/papers/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPaperById } from '@/app/services/data-papers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchFilteredQuestions } from '@/app/services/data-questions';
export const metadata: Metadata = {
  title: 'Edit Question',
};
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const paper = await fetchPaperById(id);
  const questions = await fetchFilteredQuestions('');

  if (!paper) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '试卷', href: '/dashboard/papers' },
          {
            label: '编辑试卷',
            href: `/dashboard/papers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form questions={questions} paper={paper} isEdit={true} />
    </main>
  );
}
