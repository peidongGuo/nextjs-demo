import Form from '@/app/ui/questions/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/services/data';
import { Metadata } from 'next';
import { QuestionType, QuestionsTable, UserRoles } from '@/app/lib/models';
import { auth } from '@/auth';
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
  const session = await auth();
  return (
    <>
      {session?.user?.role === UserRoles.admin && (
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
      )}
      <h2>您还没有权限！</h2>
    </>
  );
}
