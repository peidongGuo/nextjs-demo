import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { PapersTable } from '../lib/models';

export async function fetchFilteredPapers(query: string) {
  noStore();
  try {
    const papers = await sql<PapersTable>`
      SELECT
        papers.id,
        papers.title,
        papers.creator,
        papers.total_score,
        papers.duration,
        papers.tags,
        papers.questions,
        papers.create_at,
        papers.update_at
      FROM papers
      WHERE
        papers.title::text ILIKE ${`%${query}%`} OR
        papers.tags ILIKE ${`%${query}%`}
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
    LEFT JOIN questions q ON q.id::text = ANY(string_to_array(p.questions, ','))
    WHERE p.id::text = ${id}
    GROUP BY p.id;
    `;
    let result = {};
    if (data.rows[0]) {
      result = {
        ...data.rows[0],
        question_count: data.rows[0].questions.length,
        tags: data.rows[0].tags.split(','),
        // TODO 待修复问题类型
        question_types: {
          single_choice: data.rows[0].questions.filter((q: any) => q.type == 1)
            .length,
          multiple_choice: data.rows[0].questions.filter(
            (q: any) => q.type == 2,
          ).length,
          judgment: data.rows[0].questions.filter((q: any) => q.type == 3)
            .length,
          code: data.rows[0].questions.filter((q: any) => q.type == 4).length,
        },
      };
    }
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
