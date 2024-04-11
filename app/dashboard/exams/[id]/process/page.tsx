import { Metadata } from 'next';
import ExamRecord from '@/app/ui/exams/ExamRecord';
import { fetchExamById } from '@/app/services/data-exams';

export const metadata: Metadata = {
  title: '考试中',
};
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const exam = await fetchExamById(id);

  return (
    <main>
      <ExamRecord exam={exam} />
    </main>
  );
}
