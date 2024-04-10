import Form from '@/app/ui/papers/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/services/data';
import { Metadata } from 'next';
import { fetchFilteredQuestions } from '@/app/services/data-questions';
import { PapersTable } from '@/app/lib/models';
export const metadata: Metadata = {
  title: 'Create Invoice',
};
export default async function Page() {
  const initPaper: PapersTable = {
    id: 'create',
    creator: 'admin',
    title: '',
    total_score: 0,
    duration: 0,
    questions: [],
    level: 0,
    tags: [],
  };
  const questions = await fetchFilteredQuestions('');

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
      <Form questions={questions} isEdit={false} paper={initPaper} />
    </main>
  );
}
