'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: '必填',
  }),
  type: z.string({}),
  options: z.array(z.string({ invalid_type_error: '必填' })),
  answer: z.string({
    invalid_type_error: '必填',
  }),
  score: z.coerce.number({
    invalid_type_error: '必填',
  }),
  analysis: z.string({
    invalid_type_error: '必填',
  }),
  difficulty: z.coerce.number({
    invalid_type_error: '必填',
  }),
  tags: z.array(z.string({ invalid_type_error: '必填' })),
});

const CreateQuestion = FormSchema.omit({ id: true });
const UpdateQuestion = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    type?: string[];
    options?: string[];
    answer?: string[];
    score?: string[];
    analysis?: string[];
    difficulty?: string[];
    tags?: string[];
  };
  message?: string | null;
};
export async function createQuestion(prevState: State, formData: FormData) {
  const validatedFields = CreateQuestion.safeParse({
    title: formData.get('title'),
    type: formData.get('type'),
    options: formData.getAll('options'),
    answer: formData.get('answer'),
    score: formData.get('score'),
    analysis: formData.get('analysis'),
    difficulty: formData.get('difficulty'),
    tags: formData.getAll('tags'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Question.',
    };
  }
  // Prepare data for insertion into the database
  const { title, type, options, answer, score, analysis, difficulty, tags } =
    validatedFields.data;

  // Test it out:
  console.log(title, type, options, answer, score, analysis, difficulty, tags);
  console.log('123');

  try {
    await sql`
      INSERT INTO questions (title,creator,type,score,options,tags,analysis,answer,difficulty)
      VALUES (${title}, 'admin', ${type}, ${score}, ARRAY[${options.join(
        ',',
      )}], ARRAY[${tags.join(',')}], ${analysis}, ${answer}, ${difficulty})
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Question.' };
  }
  console.log('123');

  revalidatePath('/dashboard/questions');
  redirect('/dashboard/questions');
}

export async function updateQuestion(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateQuestion.safeParse({
    title: formData.get('title'),
    type: formData.get('type'),
    options: formData.getAll('options'),
    answer: formData.get('answer'),
    score: formData.get('score'),
    analysis: formData.get('analysis'),
    difficulty: formData.get('difficulty'),
    tags: formData.getAll('tags'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Question.',
    };
  }
  // Prepare data for insertion into the database
  const { title, type, options, answer, score, analysis, difficulty, tags } =
    validatedFields.data;

  // Test it out:
  console.log(title, type, options, answer, score, analysis, difficulty, tags);

  try {
    await sql`
      UPDATE questions
      SET
        title = ${title},
        type = ${type},
        options = ARRAY[${options.join(',')}],
        answer = ${answer},
        score = ${score},
        analysis = ${analysis},
        difficulty = ${difficulty},
        tags = ARRAY[${tags.join(',')}]
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: `Database Error: Failed to Update Question.${error}` };
  }
  console.log('123');
  revalidatePath('/dashboard/questions');
  redirect('/dashboard/questions');
}

export async function deleteQuestion(id: string) {
  try {
    await sql`DELETE FROM questions WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Question.' };
  }
  revalidatePath('/dashboard/questions');
}
