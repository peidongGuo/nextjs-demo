'use client';
import { Form, Input, Select, Button } from 'antd';
import {
  CheckOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createQuestion } from '@/app/services/actions-questions';
import { useForm } from 'antd/lib/form/Form';
import { QuestionsTable } from '@/app/lib/models';

const { Option } = Select;

export default function CreateForm({ question }: { question: QuestionsTable }) {
  const [form] = useForm();

  const onFinish = (values: any) => {
    createQuestion(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="title"
        label="标题"
        rules={[{ required: true, message: '请输入题目名称' }]}
      >
        <Input placeholder="请输入题目名称" />
      </Form.Item>

      <Form.Item
        name="type"
        label="题目类型"
        rules={[{ required: true, message: '请选择题目类型' }]}
      >
        <Select placeholder="选择题目类型">
          <Option value="single_choice">单选题</Option>
          <Option value="multiple_choice">多选题</Option>
          <Option value="judgment">判断题</Option>
          <Option value="code">编码题</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="options"
        label="选项"
        rules={[{ required: true, message: '请输入选项' }]}
      >
        <Input.TextArea placeholder="请输入选项" />
      </Form.Item>

      <Form.Item
        name="answer"
        label="答案"
        rules={[{ required: true, message: '请输入答案' }]}
      >
        <Input.TextArea placeholder="请输入答案" />
      </Form.Item>

      <Form.Item
        name="analysis"
        label="分析"
        rules={[{ required: true, message: '请输入分析' }]}
      >
        <Input.TextArea placeholder="请输入分析" />
      </Form.Item>

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

      <Form.Item
        name="score"
        label="分数"
        rules={[{ required: true, message: '请输入分数' }]}
      >
        <Input type="number" placeholder="请输入分数" />
      </Form.Item>

      <Form.Item
        name="tags"
        label="标签"
        rules={[{ required: true, message: '请输入标签' }]}
      >
        <Input.TextArea placeholder="请输入标签" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          创建题目
        </Button>
      </Form.Item>
    </Form>
  );
}
