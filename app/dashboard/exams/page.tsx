import Search from '@/app/ui/search';
import { Table, Skeleton } from 'antd';
import { Suspense } from 'react';
import { Metadata } from 'next';
import {
  generateAction,
  generateExamsAction,
  generatePapersAction,
  generateQuestionCount,
  generateTime,
} from '@/app/ui/exams/action';
import { CreatePaper } from '@/app/ui/papers/buttons';
import { fetchFilteredExams } from '@/app/services/data-exams';

export const metadata: Metadata = {
  title: '考试',
};

const columns = [
  {
    title: '名称',
    dataIndex: 'paper_title',
    key: 'paper_title',
  },
  {
    title: '总分',
    dataIndex: 'paper_total_score',
    key: 'paper_total_score',
  },
  {
    title: '得分',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '时长',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: '题目总数',
    dataIndex: 'paper_questions',
    key: 'paper_questions',
    render: generateQuestionCount,
  },
  {
    title: '答对题数',
    dataIndex: 'right_count',
    key: 'right_count',
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: '结束时间',
    dataIndex: 'end_time',
    key: 'end_time',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'operation',
    render: generateExamsAction,
  },
];

export default async function Page() {
  const exams = await fetchFilteredExams('');
  console;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>考试</h1>
      </div>
      <div className="mb-4 mt-4 flex items-center justify-between gap-2 md:mt-8"></div>
      <Suspense key={'exam-list'} fallback={<Skeleton active />}>
        <Table columns={columns} dataSource={exams} />
      </Suspense>
    </div>
  );
}
