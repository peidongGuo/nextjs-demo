import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { Button, Card, Col, Row, Space, Checkbox, Radio, Input } from 'antd';
import { Paper, QuestionType, papers } from '@/app/lib/placeholder-data2';
import LandingSimple from '@/app/code-editor/LandingSimple';

export const metadata: Metadata = {
  title: 'Invoices',
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const data: Paper = papers[0];
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {/* <h1 className={`${lusitana.className} text-2xl`}>考试</h1> */}
      </div>
      <Space direction="vertical" size={16} className="w-full">
        <Card title={data.title} className="w-full">
          <div className="mb-4 flex w-full">
            <p className="mr-16">总分: {data.total_score} 分</p>
            <p>时长: {data.duration} 分钟</p>
          </div>
          <Row className="mb-4">
            <Col span={4}>题目总数</Col>
            <Col span={4}>单选题数 </Col>
            <Col span={4}>多选题数 </Col>
            <Col span={4}>判断题数 </Col>
            <Col span={4}>实践题数 </Col>
            <Col span={4}>总分</Col>
          </Row>
          <Row>
            <Col span={4}>{data.question_count}</Col>
            <Col span={4}>{data.question_types.single_choice}</Col>
            <Col span={4}>{data.question_types.multiple_choice}</Col>
            <Col span={4}>{data.question_types.judgment}</Col>
            <Col span={4}>{data.question_types.code}</Col>
            <Col span={4}>{data.total_score}</Col>
          </Row>
        </Card>
        <Card title="单选题" className="w-full">
          {data.questions.map((question, index) => {
            return (
              <div className="mb-4">
                <Card key={question.id} className="w-full">
                  <p className="mb-4">
                    {index + 1}. {question.title} {question.type}
                  </p>

                  <Space direction="vertical" size={8} className="w-full">
                    {(question.type === 'single_choice' ||
                      question.type === 'judgment') &&
                      question.options?.map((option, index) => {
                        return (
                          <Radio key={index} value={option}>
                            {String.fromCharCode(65 + index) + '. ' + option}
                          </Radio>
                        );
                      })}
                    {question.type === 'multiple_choice' &&
                      question.options?.map((option, index) => {
                        return (
                          <Checkbox key={index} value={option}>
                            {String.fromCharCode(65 + index) + '. ' + option}
                          </Checkbox>
                        );
                      })}
                    {question.type === 'code' && <LandingSimple key={index} />}
                  </Space>
                </Card>
              </div>
            );
          })}
        </Card>
      </Space>

      {/* <iframe
        className="h-[800px] w-full"
        src="https://www.ciitpc.com/python/index.html"
      ></iframe> */}
    </div>
  );
}
