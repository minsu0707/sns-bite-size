import { Link } from "react-router";
import { Button } from "../ui/button";
import { useDeleteTodo } from "@/store/todos";

export default function TodoItem({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const deleteTodo = useDeleteTodo();

  return (
    <div key={id} className="flex items-center justify-between border p-2">
      <Link to={`/todolist/${id}`}>{content}</Link>
      <Button onClick={() => deleteTodo(id)} variant={"destructive"}>
        삭제
      </Button>
    </div>
  );
}
