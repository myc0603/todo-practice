'use server';

import { revalidatePath } from 'next/cache';
import { addTodo } from '../lib/todos';

export async function createTodo(formData: FormData) {
  const text = String(formData.get('text') ?? '');
  await addTodo(text);
  revalidatePath('/');
}
