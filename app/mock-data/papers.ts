import { Paper, PapersTable } from '../lib/models';
import { questions_data } from './questions';

export const paperTableRow1: PapersTable = {
  // PapersTable
  id: '110544b2-4001-4271-9855-fec4b6a6442a',
  title: '2022练习题库四级c++模拟试卷1（理论+编程）',
  total_score: 100,
  duration: 90,
  creator: 'admin',
  level: 4,
  tags: ['编程实践', 'python'],
  questions: [
    'e947b9e9-84e5-4663-a3e3-3310ca2fc853',
    'd9ef7a01-48cf-4044-a3c2-a6d4348a9b10',
    'ff05b2a6-695b-42e3-bdd3-6430e001a25b',
  ],
};

export const paper1: Paper = {
  id: '110544b2-4001-4271-9855-fec4b6a6442a',
  title: '2022练习题库四级c++模拟试卷1（理论+编程）',
  total_score: 100,
  duration: 90,
  level: 4,
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
