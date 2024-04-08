import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Paper, PapersTable, QuestionType } from '../lib/models';

export async function fetchFilteredPapers(query: string) {
  noStore();
  try {
    const papers = await sql`
      SELECT
        *
      FROM papers
      WHERE
        papers.title::text ILIKE ${`%${query}%`} OR
        ${`%${query}%`} = ANY(papers.tags)
      ORDER BY papers.create_at DESC
    `;
    return papers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch papers.');
  }
}

export async function fetchPaperById(id: string) {
  noStore();
  try {
    // const data = await sql`
    //   SELECT
    //     papers.id,
    //     papers.title,
    //     papers.creator,
    //     papers.total_score,
    //     papers.duration,
    //     papers.tags,
    //     papers.questions,
    //   FROM papers
    //   WHERE papers.id = ${id};
    // `;
    const data = await sql`
    SELECT p.*, json_agg(row_to_json(q.*)) as questions
    FROM papers p
    LEFT JOIN questions q ON q.id::text = ANY(p.questions)
    WHERE p.id::text = ${id}
    GROUP BY p.id;
    `;
    // const data = await sql`
    // SELECT *
    // FROM papers;
    // `;
    let result: Paper = {} as Paper;
    if (data.rows[0]) {
      result = {
        ...data.rows[0],
        question_count: data.rows[0].questions.length,
        tags: data.rows[0].tags,
        // TODO 待修复问题类型
        question_types: {
          single_choice: data.rows[0].questions.filter(
            (q: any) => q.type == QuestionType.single_choice,
          ).length,
          multiple_choice: data.rows[0].questions.filter(
            (q: any) => q.type == QuestionType.multiple_choice,
          ).length,
          judgment: data.rows[0].questions.filter(
            (q: any) => q.type == QuestionType.judgment,
          ).length,
          code: data.rows[0].questions.filter(
            (q: any) => q.type == QuestionType.code,
          ).length,
        },
      } as Paper;
    }
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch paper.');
  }
}
