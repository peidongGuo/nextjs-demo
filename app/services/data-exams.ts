import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Exam, ExamsTable, QuestionType } from '../lib/models';
import { fetchPaperWithQuestionsDetailById } from './data-papers';
import { user1 } from '../mock-data/users';

export async function fetchFilteredExams(query: string) {
  noStore();
  try {
    const exams = await sql`
    SELECT
      exams.*,
      papers.title AS paper_title,
      papers.total_score AS paper_total_score,
      papers.questions AS paper_questions,
      users.name AS user_name
    FROM exams
    INNER JOIN papers ON exams.paper_id = papers.id
    INNER JOIN users ON exams.user_id = users.id
    ORDER BY exams.create_at DESC
    `;
    return exams.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch exams.');
  }
}

export async function fetchExamById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        *
      FROM exams
      WHERE exams.id::text = ${id};
    `;
    let result: Exam = {} as Exam;
    console.log(data.rows[0]);
    const paper = await fetchPaperWithQuestionsDetailById(
      data.rows[0].paper_id,
    );
    const userinfo = user1;
    if (data.rows[0]) {
      result = {
        ...data.rows[0],
        paper,
        userinfo,
      } as Exam;
    }
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch exam.');
  }
}
