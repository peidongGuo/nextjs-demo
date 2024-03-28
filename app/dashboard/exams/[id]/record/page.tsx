import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Paper, QuestionType, papers } from '@/app/lib/placeholder-data2';
import ExamRecord from '@/app/ui/exams/ExamRecord';

export const metadata: Metadata = {
  title: '开始考试',
};
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data: Paper = papers[0];

  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(id),
  //   fetchCustomers(),
  // ]);
  // if (!invoice) {
  //   notFound();
  // }
  return (
    <main>
      <ExamRecord paper={data} />
    </main>
  );
}
