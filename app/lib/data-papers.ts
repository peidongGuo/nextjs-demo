import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { PapersType } from './models/paper';

export async function fetchFilteredPapers(query: string) {
  noStore();
  try {
    const papers = await sql<PapersType>`
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
    const data = await sql`
      SELECT
        papers.id,
        papers.title,
        papers.creator,
        papers.total_score,
        papers.duration,
        papers.tags,
        papers.questions,
      FROM papers
      WHERE papers.id = ${id};
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
