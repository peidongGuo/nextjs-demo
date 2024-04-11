'use client';

import { Button, Card, Col, Row, Space, Checkbox, Radio, Affix } from 'antd';
import TimeDeadLine from '@/app/ui/exams/TimeDeadLine';
import QuestionRadio from '@/app/ui/exams/QuestionRadio';
import QuestionCheckbox from '@/app/ui/exams/QuestionCheckbox';
import QuestionCode from '@/app/ui/exams/QuestionCode';
import { useState } from 'react';
import { Exam, Paper } from '@/app/lib/models';
import { updateExam } from '@/app/services/actions-exams';

export default function ExamRecord({ exam }: { exam: Exam }) {
  const data: Paper = exam.paper;
  const [answers, setAnswers] = useState({} as Record<string, string>);

  const handleItemChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submit = () => {
    console.log(answers);
    updateExam({ ...exam, answers: answers });
  };

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
                      <QuestionRadio
                        question={question}
                        onChange={handleItemChange}
                      />
                    )}
                    {question.type === 'multiple_choice' && (
                      <QuestionCheckbox
                        question={question}
                        onChange={handleItemChange}
                      />
                    )}
                    {question.type === 'code' && (
                      <QuestionCode
                        question={question}
                        key={index}
                        onChange={handleItemChange}
                      />
                    )}
                  </Space>
                </Card>
              </div>
            );
          })}
        </Card>
        <Button type="primary" className="w-full" onClick={submit}>
          提交
        </Button>
      </Space>
    </div>
  );
}
