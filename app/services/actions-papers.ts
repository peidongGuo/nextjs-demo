'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export type PapersTable = {
  id: string; // UUID
  title: string; // TEXT
  level: number; // INT
  total_score: number; // INT
  duration: number; // INT
  tags: string[]; // TEXT
  papers: string[]; // TEXT
  create_at?: Date; // TIMESTAMP
  update_at?: Date; // TIMESTAMP
};

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: '必填',
  }),
  total_score: z.coerce.number({
    invalid_type_error: '必填',
  }),
  duration: z.coerce.number({
    invalid_type_error: '必填',
  }),
  questions: z.array(z.string({ invalid_type_error: '必填' })),
  level: z.coerce.number({
    invalid_type_error: '必填',
  }),
  tags: z.array(z.string({ invalid_type_error: '必填' })),
});

const CreatePaper = FormSchema.omit({ id: true });
const UpdatePaper = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    total_score?: string[];
    duration?: string[];
    questions?: string[];
    level?: string[];
    tags?: string[];
  };
  message?: string | null;
};
export async function createPaper(prevState: State, formData: FormData) {
  const validatedFields = CreatePaper.safeParse({
    title: formData.get('title'),
    total_score: formData.get('total_score'),
    duration: formData.get('duration'),
    questions: formData.getAll('questions'),
    level: formData.get('level'),
    tags: formData.getAll('tags'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Paper.',
    };
  }
  // Prepare data for insertion into the database
  const { title, total_score, duration, questions, level, tags } =
    validatedFields.data;

  try {
    await sql`
      INSERT INTO papers (title,creator,duration,total_score,questions,tags,level)
      VALUES (${title}, 'admin', ${duration}, ${total_score}, ARRAY[${questions.join(
        ',',
      )}], ARRAY[${tags.join(',')}], ${level})
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Paper.' };
  }
  revalidatePath('/dashboard/papers');
  redirect('/dashboard/papers');
}

export async function updatePaper(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdatePaper.safeParse({
    title: formData.get('title'),
    total_score: formData.get('total_score'),
    duration: formData.get('duration'),
    questions: formData.getAll('questions'),
    level: formData.get('level'),
    tags: formData.getAll('tags'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Paper.',
    };
  }

  // Prepare data for insertion into the database
  const { title, total_score, duration, questions, level, tags } =
    validatedFields.data;

  try {
    await sql`
    UPDATE papers
      SET
        title = ${title},
        total_score = ${total_score},
        duration = ${duration},
        questions = ARRAY[${questions.join(',')}],
        tags = ARRAY[${tags.join(',')}],
        level = ${level}
      WHERE id = ${id}
 `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Paper.' };
  }
  revalidatePath('/dashboard/papers');
  redirect('/dashboard/papers');
}

export async function deletePaper(id: string) {
  try {
    await sql`DELETE FROM papers WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Paper.' };
  }
  revalidatePath('/dashboard/papers');
}
