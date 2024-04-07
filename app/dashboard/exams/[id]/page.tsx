import { Metadata } from 'next';
import { Button, Card, Col, Row, Space, Checkbox, Radio, Affix } from 'antd';
import { Paper, QuestionType, papers } from '@/app/lib/placeholder-data2';
import LandingSimple from '@/app/code-editor/LandingSimple';
import AffixContainer from '@/app/ui/exams/affix';
import TimeDeadLine from '@/app/ui/exams/TimeDeadLine';
import QuestionRadio from '@/app/ui/exams/QuestionRadio';
import QuestionCheckbox from '@/app/ui/exams/QuestionCheckbox';
import QuestionCode from '@/app/ui/exams/QuestionCode';

export const metadata: Metadata = {
  title: '试卷详情',
};
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data: Paper = papers[0];

  return (
    <div className="w-full" id="exam-detail">
      <div className="flex w-full items-center justify-between">
        {/* <h1 className={`${lusitana.className} text-2xl`}>考试</h1> */}
      </div>
      <Space direction="vertical" size={16} className="w-full">
        <Card title={data.title} className="w-full">
          <div className="mb-4 flex w-full">
            <p className="mr-16">总分: {data.total_score} 分</p>
            <p className="mr-16">时长: {data.duration} 分钟</p>
            <p>剩余时间：</p>
            <div className="mt-[-10px]">
              <TimeDeadLine />
            </div>
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
          {[].map((question, index) => {
            return (
              <div key={index} className="mb-4">
                <Card key={question.id} className="w-full">
                  <p className="mb-4">
                    {index + 1}. {question.title} {question.type}
                  </p>
                  {question.type !== 'code' && (
                    <Space direction="vertical" size={8} className="w-full">
                      {question.options?.map(
                        (option, index) =>
                          String.fromCharCode(65 + index) + '. ' + option,
                      )}
                    </Space>
                  )}
                </Card>
              </div>
            );
          })}
        </Card>
        <Card title="单选题" className="w-full">
          {data.questions.map((question, index) => {
            return (
              <div key={index} className="mb-4">
                <Card key={question.id} className="w-full">
                  <p className="mb-4">
                    {index + 1}. {question.title} {question.type}
                  </p>
                  <Space direction="vertical" size={8} className="w-full">
                    {(question.type === 'single_choice' ||
                      question.type === 'judgment') && (
                      <QuestionRadio question={question} />
                    )}
                    {question.type === 'multiple_choice' && (
                      <QuestionCheckbox question={question} />
                    )}
                    {question.type === 'code' && <QuestionCode key={index} />}
                  </Space>
                </Card>
              </div>
            );
          })}
        </Card>
      </Space>
    </div>
  );
}
