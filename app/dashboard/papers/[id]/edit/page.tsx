import Form from '@/app/ui/papers/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPaperById } from '@/app/services/data-papers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Edit Question',
};
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const paper = await fetchPaperById(id);

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
      <Form paper={paper} />
    </main>
  );
}
