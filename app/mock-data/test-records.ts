import { TestRecord, TestRecordStatus } from '../lib/models';
import { paper1 } from './papers';
import { user1 } from './users';

export const test_record1: TestRecord = {
  userinfo: user1,
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
