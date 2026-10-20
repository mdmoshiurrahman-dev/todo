import { TodoListContainer } from "@/components/TodoListContainer";
export default async function Home() {
  const res = await fetch("http://localhost:5000/lists");
  const lists = await res.json();
  return (
    <>
      <TodoListContainer lists={lists} />
    </>
  );
}
