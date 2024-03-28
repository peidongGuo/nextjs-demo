import { questions_data } from './question-data2';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  create_time?: string;
  update_time?: string;
};

export enum QuestionType {
  single_choice = 'single_choice',
  multiple_choice = 'multiple_choice',
  judgment = 'judgment',
  code = 'code',
}

export type Paper = {
  id: string;
  title: string;
  total_score: number;
  duration: number;
  question_count: number;
  question_types: {
    single_choice: number;
    multiple_choice: number;
    judgment: number;
    code: number;
  };
  create_time: string;
  update_time: string;
  tags: string[];
  questions: Question[];
};

export type Question = {
  id: string;
  type: QuestionType;
  title: string;
  options?: string[] | null[];
  answer: string | null;
  score: number;
  analysis: string;
  difficulty?: number;
  tags?: string[];
};

enum TestRecordStatus {
  finished = 'finished',
  unfinished = 'unfinished',
}
export type TestRecord = {
  userinfo: User;
  paper: Paper;
  score: number;
  start_time: string;
  end_time: string;
  duration: number;
  status: TestRecordStatus;
  right_count: number;
  total_count: number;
  answers: { question_id: string; answer: string }[];
};

export enum OrderStatus {
  succeed = 'succeed',
  failed = 'failed',
  paying = 'paying',
}

export type Order = {
  id: string;
  userinfo: User;
  paper: Paper;
  status: OrderStatus;
  create_time: string;
  pay_time: string;
  price: number;
};

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const paper1: Paper = {
  id: '110544b2-4001-4271-9855-fec4b6a6442a',
  title: '2022练习题库四级c++模拟试卷1（理论+编程）',
  total_score: 100,
  duration: 90,
  question_count: 24,
  question_types: {
    single_choice: 15,
    multiple_choice: 5,
    judgment: 0,
    code: 4,
  },
  create_time: '2022-12-06',
  update_time: '2022-12-06',
  tags: ['编程实践', 'python'],
  questions: questions_data,
};

const test_record1: TestRecord = {
  userinfo: users[0],
  paper: paper1,
  score: 6,
  start_time: '2022-12-06 12:00:00',
  end_time: '2022-12-06 13:30:00',
  duration: 90,
  status: TestRecordStatus.finished,
  right_count: 3,
  total_count: 100,
  answers: [
    {
      question_id: '1660930633728188418',
      answer: 'B',
    },
    {
      question_id: '1660930633732382722',
      answer: 'D',
    },
    {
      question_id: '1660930633732382723',
      answer: 'A',
    },
  ],
};

const order1: Order = {
  id: '210544b2-4001-4271-9855-fec4b6a6442a',
  userinfo: users[0],
  paper: paper1,
  status: OrderStatus.succeed,
  create_time: '2022-12-06 14:00:02',
  pay_time: '2022-12-06 14:02:00',
  price: 100,
};

const papers: Paper[] = [paper1];
const test_records: TestRecord[] = [test_record1];
const orders: Order[] = [order1];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  users,
  papers,
  test_records,
  orders,
};

module.exports = {
  users,
  papers,
  test_records,
  orders,
};
