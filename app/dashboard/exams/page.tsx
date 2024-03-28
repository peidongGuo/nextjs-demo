import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { Table, Skeleton } from 'antd';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { Paper, QuestionType, papers } from '@/app/lib/placeholder-data2';
import { generateAction } from '@/app/ui/exams/action';
import { useServer } from 'next/dist/shared/server';
import { record } from 'zod';

export const metadata: Metadata = {
  title: '试卷',
};

const ActionRenderer = ({ text, record }) => {
  // Render 操作列的内容
  // ...

  return <span>{/* Render 的内容 */}</span>;
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
    dataIndex: 'question_count',
    key: 'question_count',
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    key: 'created_time',
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time',
    key: 'updated_time',
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'operation',
    render: generateAction,
  },
];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  const dataSource = papers;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>试卷</h1>
      </div>
      <div className="mb-4 mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="搜索关键字" />
      </div>
      <Suspense key={query + currentPage} fallback={<Skeleton active />}>
        <Table columns={columns} dataSource={dataSource} />
      </Suspense>
    </div>
  );
}
