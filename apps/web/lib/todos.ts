import { promises as fs } from 'fs';
import path from 'path';

export type Todo = {
	id: string;
	text: string;
	createAt: number;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const FILE_PATH = path.join(DATA_DIR, 'todos.json');

async function ensureFile() {
	await fs.mkdir(DATA_DIR, { recursive: true });
	try {
			await fs.access(FILE_PATH);
	} catch {
			await fs.writeFile(FILE_PATH, '[]', 'utf-8');
	}
}

export async function readTodos(): Promise<Todo[]> {
	await ensureFile();
	const raw = await fs.readFile(FILE_PATH, 'utf-8');
	const todos = JSON.parse(raw) as Todo[];

	return todos.sort((a, b) => b.createAt - a.createAt);
}

export async function addTodo(text:string): Promise<void> {
	const trimmed = text.trim();
	if (!trimmed) return;

	await ensureFile();
  const raw = await fs.readFile(FILE_PATH, 'utf-8');
	const todos = JSON.parse(raw) as Todo[];
	
	todos.push({
		id: crypto.randomUUID(),
		text: trimmed,
		createAt: Date.now(),
	});

	await fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
}
