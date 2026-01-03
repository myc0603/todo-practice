import { createTodo } from "./actions";
import { readTodos } from "../lib/todos";

export default async function Page() {
  const todos = await readTodos();

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Todo</h1>

      <form action={createTodo} style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <input
          name="text"
          placeholder="할 일 입력"
          autoComplete="off"
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: 10,
            border: '1px solid #ddd',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid black',
            background: 'black',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          추가
        </button>
      </form>

      <ul style={{ marginTop: 16, padding: 0, listStyle: "none" }}>
        {todos.length === 0 ? (
          <li style={{ color: "#666", padding: "12px 0" }}>아직 할 일이 없어</li>
        ) : (
          todos.map(t => (
            <li
              key={t.id}
              style={{
                padding: "12px 12px",
                border: "1px solid #eee",
                borderRadius: 12,
                marginBottom: 8,
              }}
            >
              {t.text}
              <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                {new Date(t.createAt).toLocaleString()}
              </div>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
