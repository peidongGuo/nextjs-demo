'use client';
import Link from 'next/link';
import { Button, Form, Input, Select, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { createUser } from '../services/actions-users';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();
  const [form] = useForm();
  const validateConfirmPassword = (_, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('两次输入的密码不匹配!'));
    }
    return Promise.resolve();
  };
  const onFinish = async (values: any) => {
    const result = await createUser(values);
    if (result?.id) {
      message.success('用户创建成功');
      router.push('/login');
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <Form.Item
            name="name"
            label="名字"
            rules={[{ required: true, message: '请输入用户名字' }]}
          >
            <Input placeholder="请输入名字" />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="confirm_password"
            label="确认密码"
            rules={[
              { required: true, message: '请输入确认密码' },
              { validator: validateConfirmPassword },
            ]}
          >
            <Input.Password placeholder="请输入确认密码" />
          </Form.Item>
        </div>
        <div className="mb-4">
          <Form.Item
            name="phone_number"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3456789]\d{9}$/, message: '请输入有效的手机号' },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/login">
          <Button className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
            取消
          </Button>
        </Link>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </div>
    </Form>
  );
}
