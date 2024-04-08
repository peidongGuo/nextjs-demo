import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { QuestionsTable } from '../lib/models';

export async function fetchFilteredQuestions(query: string) {
  noStore();
  try {
    const questions = await sql<QuestionsTable>`
      SELECT
        *
      FROM questions
    `;
    return questions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchQuestionById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        *
      FROM questions
      WHERE questions.id = ${id};
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchQuestionsByIds(ids: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        *
      FROM questions
      WHERE questions.id in ${ids};
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
