import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from '../lib/models';

export async function fetchFilteredUsers(query: string) {
  noStore();
  try {
    const users = await sql<User>`
      SELECT
        *
      FROM users
    `;
    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchUserById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        *
      FROM users
      WHERE users.id = ${id};
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUsersByIds(ids: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        *
      FROM users
      WHERE users.id in ${ids};
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}
