'use client';

import { redirect } from 'next/navigation';

export function generateAction(record?) {
  console.log('record', record);
  return <a href={'/dashboard/exams/' + record.id}>查看</a>;
}

export function affixCointainer() {
  return document.getElementById('exam-detail');
}
