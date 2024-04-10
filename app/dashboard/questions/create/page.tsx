import Form from '@/app/ui/questions/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/services/data';
import { Metadata } from 'next';
import { QuestionType, QuestionsTable } from '@/app/lib/models';
export const metadata: Metadata = {
  title: 'Create Question',
};
export default async function Page() {
  const initQuestion: QuestionsTable = {
    id: 'create',
    title: '',
    type: QuestionType.single_choice,
    options: [],
    answer: '',
    score: 0,
    analysis: '',
    difficulty: 0,
    tags: [],
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '试题', href: '/dashboard/questions' },
          {
            label: '创建试题',
            href: '/dashboard/questions/create',
            active: true,
          },
        ]}
      />
      <Form question={initQuestion} />
    </main>
  );
}
