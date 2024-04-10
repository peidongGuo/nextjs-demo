import Search from '@/app/ui/search';
import { Table, Skeleton } from 'antd';
import { Suspense } from 'react';
import { fetchFilteredPapers } from '@/app/services/data-papers';
import { Metadata } from 'next';
import {
  generateAction,
  generatePapersAction,
  generateQuestionCount,
  generateTime,
} from '@/app/ui/exams/action';
import { CreatePaper } from '@/app/ui/papers/buttons';

export const metadata: Metadata = {
  title: '试卷',
};

const columns = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '总分',
    dataIndex: 'total_score',
    key: 'total_score',
  },
  {
    title: '时长',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: '题目总数',
    dataIndex: 'questions',
    key: 'questions',
    render: generateQuestionCount,
  },
  {
    title: '创建时间',
    dataIndex: 'create_at',
    key: 'create_at',
    render: generateTime,
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
    render: generatePapersAction,
  },
];

export default async function Page() {
  const papers = await fetchFilteredPapers('');
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>试卷</h1>
      </div>
      <div className="mb-4 mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="搜索关键字" />
        <CreatePaper />
      </div>
      <Suspense key={'exam-list'} fallback={<Skeleton active />}>
        <Table columns={columns} dataSource={papers} />
      </Suspense>
    </div>
  );
}
