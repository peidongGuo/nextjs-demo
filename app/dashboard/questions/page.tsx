import Search from '@/app/ui/search';
import { Table, Skeleton } from 'antd';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { generateAction, generateTime } from '@/app/ui/exams/action';
import { fetchFilteredQuestions } from '@/app/services/data-questions';

export const metadata: Metadata = {
  title: '题目',
};

const columns = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '题型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '选项',
    dataIndex: 'options',
    key: 'options',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '答案',
    dataIndex: 'answer',
    key: 'answer',
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    key: 'difficulty',
  },
  {
    title: '分析',
    dataIndex: 'analysis',
    key: 'analysis',
  },
  {
    title: '更新时间',
    dataIndex: 'update_at',
    key: 'update_at',
    render: generateTime,
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'operation',
    render: generateAction,
  },
];

export default async function Page() {
  const questions = await fetchFilteredQuestions('');
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>题目</h1>
      </div>
      <div className="mb-4 mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="搜索关键字" />
      </div>
      <Suspense key={'question-list'} fallback={<Skeleton active />}>
        <Table columns={columns} dataSource={questions} />
      </Suspense>
    </div>
  );
}
