const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("API_URL =", API_URL);

export interface Todo {
    id: string;
    todo: string;
    completed: boolean;
}

export async function getTodos(): Promise<Todo[]> {
    console.log("Fetching:", `${API_URL}/todos`);

    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export async function createTodo(text: string): Promise<Todo> {
    console.log("Adding todo:", `${API_URL}/todos`, text);
    const todo = {
        id: Date.now().toString(),
        todo: text,
        completed: false
    }
    const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: text }),
    });
    return await response.json();
}

export async function deleteTodo(id: string): Promise<void> {
    console.log("Deleting todo:", `${API_URL}/todos/${id}`);
    const result = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE"
    });

    return result.json();
}
export async function updateTodo(todo: Todo): Promise<Todo> {
    console.log("Updating todo:", `${API_URL}/todos/${todo.id}`);


    const result = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
    });
    return result.json();
}

export async function getTodoid(id: string): Promise<Todo> {
    console.log("Fetching todo:", `${API_URL}/todos/${id}`);
    const result = await fetch(`${API_URL}/todos/${id}`);
    const data = await result.json();
    return data;
}