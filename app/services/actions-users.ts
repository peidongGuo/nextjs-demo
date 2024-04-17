'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { message } from 'antd';

export async function createUser(formData: any) {
  // Prepare data for insertion into the database
  let { name, email, password, phone_number } = formData;
  const role = 'customer';
  password = await bcrypt.hash(password, 10);
  let result = null;
  try {
    result = await sql`
      INSERT INTO users (name, email, password, phone_number, role)
      VALUES (${name}, ${email}, ${password}, ${phone_number}, ${role})
      RETURNING *;
    `;
    console.log(result);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create User.' };
  }

  revalidatePath('/login');
  redirect(`/login`);
}

export async function updateUser(formData: any) {
  // Prepare data for insertion into the database
  const { id, name, email, password, phone_number, role } = formData;

  try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, password = ${password}, phone_number = ${phone_number}, role = ${role}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create User.' };
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function deleteUser(id: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete User.' };
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}
