'use client';
import { createExamData1, exam1 } from '@/app/mock-data/exams';
import { deletePaper } from '@/app/services/actions-papers';
import {
  CommandLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import ExamRecord from '../exams/ExamRecord';
import { createExam } from '@/app/services/actions-exams';
import { redirect } from 'next/navigation';
// import { deletePaper } from '@/app/services/actions';

export function CreatePaper() {
  return (
    <Link
      href="/dashboard/papers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Paper</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePaper({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/papers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePaper({ id }: { id: string }) {
  const deletePaperWithId = () => {
    console.log(id);
    deletePaper(id);
  };

  return (
    <button
      onClick={deletePaperWithId}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </button>
  );
}

export function CreateExam({ id }: { id: string }) {
  const beginExam = async () => {
    const exam = createExamData1;
    exam.paper_id = id;
    exam.start_time = new Date().toISOString();
    await createExam(exam);
  };

  return (
    <button
      onClick={beginExam}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">开始测试</span>
      <CommandLineIcon className="w-4" />
    </button>
  );
}
