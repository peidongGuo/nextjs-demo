'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createExam(formData: any) {
  // Prepare data for insertion into the database
  const {
    id,
    user_id,
    paper_id,
    score,
    start_time,
    end_time,
    duration,
    status,
    right_count,
    total_count,
    answers,
  } = formData;

  console.log(paper_id, answers);
  let result = null;
  try {
    result = await sql`
      INSERT INTO exams (user_id,paper_id,score,start_time,end_time,duration,status,right_count,total_count,answers)
      VALUES (${user_id},${paper_id},${score},${start_time},${end_time},${duration},${status},${right_count},${total_count},${answers})
      RETURNING *;
    `;
    console.log(result);
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Exam.' };
  }
  revalidatePath('/dashboard/exams');
  redirect(`/dashboard/exams/${result.rows[0].id}/process`);
}

export async function updateExam(formData: any) {
  // Prepare data for insertion into the database
  const {
    id,
    user_id,
    paper_id,
    score,
    start_time,
    end_time,
    duration,
    status,
    right_count,
    total_count,
    answers,
  } = formData;

  console.log(paper_id, answers);
  try {
    await sql`
      UPDATE exams
      SET
        user_id = ${user_id},
        paper_id = ${paper_id},
        score = ${score},
        start_time = ${start_time},
        end_time = ${end_time},
        duration = ${duration},
        status = ${status},
        right_count = ${right_count},
        total_count = ${total_count},
        answers = ${answers}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Exam.' };
  }
  revalidatePath('/dashboard/exams');
  redirect('/dashboard/exams');
}

export async function deleteExam(id: string) {
  try {
    await sql`DELETE FROM exams WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Exam.' };
  }
  revalidatePath('/dashboard/exams');
}
