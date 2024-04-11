import { Exam, ExamStatus, ExamsTable } from '../lib/models';
import { paper1 } from './papers';
import { user1 } from './users';

export const exam1: Exam = {
  id: '166093063',
  userinfo: user1,
  paper: paper1,
  score: 6,
  start_time: '2022-12-06 12:00:00',
  end_time: '2022-12-06 13:30:00',
  duration: 90,
  status: ExamStatus.finished,
  right_count: 3,
  total_count: 10,
  answers: {
    '1660930633728188418': 'B',
  },
};

export const createExamData1: ExamsTable = {
  id: '166093063',
  user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  paper_id: '534c9ec8-6b5d-4db6-9bc1-c487ed75879f',
  score: 6,
  start_time: '2022-12-06 12:00:00',
  end_time: '2022-12-06 13:30:00',
  duration: 90,
  status: ExamStatus.finished,
  right_count: 3,
  total_count: 10,
  answers: {},
};
