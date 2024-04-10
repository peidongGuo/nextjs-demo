'use client';
import Link from 'next/link';
import { Button, Form, Input, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { PapersTable, QuestionsTable } from '@/app/lib/models';
import { tags } from '@/app/lib/tags';
import { useEffect } from 'react';
import {
  updateQuestionNew,
  createQuestionNew,
} from '@/app/services/actions-questions';

const { Option } = Select;

export default function CreateForm({
  question,
  isEdit,
}: {
  question: QuestionsTable;
  isEdit?: boolean;
}) {
  const [form] = useForm();

  const onFinish = (values: any) => {
    isEdit ? updateQuestionNew(values) : createQuestionNew(values);
  };

  useEffect(() => {
    console.log('question', question);
    if (isEdit) {
      form.setFieldsValue({
        id: question.id,
        title: question.title,
        type: question.type,
        options: question.options,
        answer: question.answer,
        difficulty: question.difficulty,
        score: question.score,
        analysis: question.analysis,
        tags: question.tags,
      });
    }
  }, [isEdit, form, question]);
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
            label="题目"
            rules={[{ required: true, message: '请输入题目' }]}
          >
            <Input placeholder="请输入题目" />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择题目类型' }]}
          >
            <Select placeholder="选择题目类型">
              <Option value="single_choice">单选题</Option>
              <Option value="multiple_choice">多选题</Option>
              <Option value="judgment">判断题</Option>
              <Option value="code">编码题</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item label="选项">
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...field}
                      key={index}
                      name={field.name}
                      initialValue={form.getFieldValue(['options', field.name])}
                      rules={[{ required: true, message: '请输入选项' }]}
                    >
                      <div className="mb-2 flex items-center">
                        <Input placeholder="请输入选项" />
                        <CloseOutlined onClick={() => remove(field.name)} />
                      </div>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      + Add Option
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          {/* <Form.Item
            name="options"
            label="选项"
            rules={[{ required: true, message: '请输入选项' }]}
          >
            <Input.TextArea placeholder="请输入选项" />
          </Form.Item>
          <Form.Item
            name="options"
            label="选项"
            rules={[{ required: true, message: '请输入选项' }]}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="mb-2 flex items-center">
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="请输入选项"
                />
                <CloseOutlined onClick={() => handleRemoveOption(index)} />
              </div>
            ))}
            <Button type="dashed" onClick={handleAddOption} block>
              + Add Option
            </Button>
          </Form.Item>

          <Form.List name="options">
            {(fields, { add, remove }) => (
              <div
                style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
              >
                {fields.map((field) => (
                  <>
                    <Form.Item noStyle name={[field, 'first']}>
                      <Input placeholder="first" />
                    </Form.Item>

                    <CloseOutlined
                      onClick={() => {
                        remove(field);
                      }}
                    />
                  </>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Add Item
                </Button>
              </div>
            )}
          </Form.List> */}
        </div>
        <div className="mb-4">
          <Form.Item
            name="answer"
            label="答案"
            rules={[{ required: true, message: '请输入答案' }]}
          >
            <Input.TextArea placeholder="请输入答案" />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="analysis"
            label="分析"
            rules={[{ required: true, message: '请输入分析' }]}
          >
            <Input.TextArea placeholder="请输入分析" />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="difficulty"
            label="难度"
            rules={[{ required: true, message: '请选择难度' }]}
          >
            <Select placeholder="选择难度">
              <Option value="1">简单</Option>
              <Option value="2">一般</Option>
              <Option value="3">中等</Option>
              <Option value="4">偏难</Option>
              <Option value="5">困难</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="score"
            label="分数"
            rules={[{ required: true, message: '请输入分数' }]}
          >
            <Input type="number" placeholder="请输入分数" />
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
        <Link href="/dashboard/questions">
          <Button className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
            取消
          </Button>
        </Link>
        <Button type="primary" htmlType="submit">
          {isEdit ? '编辑试题' : '创建试题'}
        </Button>
      </div>
    </Form>
  );
}
