'use client';

import { redirect } from 'next/navigation';
import { DeleteQuestion, UpdateQuestion } from '../questions/buttons';

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
  return questions.length;
}
