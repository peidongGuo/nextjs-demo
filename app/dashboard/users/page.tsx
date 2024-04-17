import { Table, Skeleton } from 'antd';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { generateUsersAction } from '@/app/ui/exams/action';
import { fetchFilteredUsers } from '@/app/services/data-users';

export const metadata: Metadata = {
  title: '用户',
};

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'operation',
    render: generateUsersAction,
  },
];

export default async function Page() {
  const exams = await fetchFilteredUsers('');
  console;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>用户</h1>
      </div>
      <div className="mb-4 mt-4 flex items-center justify-between gap-2 md:mt-8"></div>
      <Suspense key={'exam-list'} fallback={<Skeleton active />}>
        <Table columns={columns} dataSource={exams} />
      </Suspense>
    </div>
  );
}
