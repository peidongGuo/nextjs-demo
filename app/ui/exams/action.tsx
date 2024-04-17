'use client';

import { redirect } from 'next/navigation';
import { DeleteQuestion, UpdateQuestion } from '../questions/buttons';
import { CreateExam, DeletePaper, UpdatePaper } from '../papers/buttons';
import { ToggleUserRole, DeleteUser } from '../users/buttons';
import { deleteExam } from '@/app/services/actions-exams';
import { TrashIcon } from '@heroicons/react/24/outline';

export function generateAction(record?) {
  console.log('record', record);
  return (
    <>
      <a href={'/dashboard/exams/' + record.id}>查看</a>
      <UpdateQuestion id={record.id} />
      <DeleteQuestion id={record.id} />
    </>
  );
}

export function generatePapersAction(record?) {
  console.log('record', record);
  return (
    <>
      <a href={'/dashboard/papers/' + record.id}>查看</a>
      <CreateExam id={record.id} />
      <UpdatePaper id={record.id} />
      <DeletePaper id={record.id} />
    </>
  );
}

export function generateExamsAction(record?) {
  console.log('record', record);
  return (
    <>
      <a href={'/dashboard/exams/' + record.id}>查看</a>
      <DeleteExam id={record.id} />
    </>
  );
}

export function generateUsersAction(record?) {
  console.log('record', record);
  return (
    <>
      <ToggleUserRole user={record} />
      <DeleteUser id={record.id} />
    </>
  );
}

export function affixCointainer() {
  return document.getElementById('exam-detail');
}

export function generateTime(timestamp: Date) {
  console.log('record', timestamp);
  return timestamp.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function generateQuestionCount(questions) {
  console.log('questions', questions);
  return questions.length;
}

export function DeleteExam({ id }: { id: string }) {
  const deleteExamWithId = () => {
    console.log(id);
    deleteExam(id);
  };

  return (
    <button
      onClick={deleteExamWithId}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </button>
  );
}
