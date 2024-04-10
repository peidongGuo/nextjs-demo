'use client';
import Link from 'next/link';
import { Button, Form, Input, Select } from 'antd';
import { createPaperNew, updatePaperNew } from '@/app/services/actions-papers';
import { useForm } from 'antd/lib/form/Form';
import { PapersTable, QuestionsTable } from '@/app/lib/models';
import { tags } from '@/app/lib/tags';
import { useEffect } from 'react';

const { Option } = Select;

export default function CreateForm({
  questions,
  paper,
  isEdit,
}: {
  questions: QuestionsTable[];
  paper: PapersTable;
  isEdit: boolean;
}) {
  const [form] = useForm();

  const onFinish = (values: any) => {
    isEdit ? updatePaperNew(values) : createPaperNew(values);
  };

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        id: paper.id,
        title: paper.title,
        total_score: paper.total_score,
        duration: paper.duration,
        questions: paper.questions,
        level: paper.level,
        tags: paper.tags,
      });
    }
  }, [isEdit, form, paper]);
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {isEdit && (
          <div className="mb-4 hidden">
            <Form.Item name="id" label="id">
              <Input />
            </Form.Item>
          </div>
        )}

        <div className="mb-4">
          <Form.Item
            name="title"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
        </div>

        <div className="mb-4">
          <Form.Item
            name="total_score"
            label="总分"
            rules={[{ required: true, message: '请输入总分' }]}
          >
            <Input placeholder="请输入总分" />
          </Form.Item>
        </div>

        <div className="mb-4">
          <Form.Item
            name="duration"
            label="时长"
            rules={[{ required: true, message: '请输入时长' }]}
          >
            <Input placeholder="请输入时长" />
          </Form.Item>
        </div>

        <div className="mb-4">
          <Form.Item
            name="questions"
            label="题目"
            rules={[{ required: true, message: '请选择题目' }]}
          >
            <Select mode="multiple" placeholder="选择题目" allowClear>
              {questions.map((question) => (
                <Option key={question.id} value={question.id}>
                  {question.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="mb-4">
          <Form.Item
            name="level"
            label="等级"
            rules={[{ required: true, message: '请选择难度' }]}
          >
            <Select placeholder="选择难度">
              <Option value="1">一级</Option>
              <Option value="2">二级</Option>
              <Option value="3">三级</Option>
              <Option value="4">四级</Option>
              <Option value="5">五级</Option>
              <Option value="6">六级</Option>
              <Option value="7">七级</Option>
              <Option value="8">八级</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="mb-4">
          <Form.Item
            name="tags"
            label="标签"
            rules={[{ required: true, message: '请选择标签' }]}
          >
            <Select placeholder="选择标签" mode="multiple">
              {tags.map((tag, index) => (
                <Option key={`tag-${index}`} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/papers">
          <Button className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
            取消
          </Button>
        </Link>
        <Button type="primary" htmlType="submit">
          {isEdit ? '编辑试卷' : '创建试卷'}
        </Button>
      </div>
    </Form>
  );
}
