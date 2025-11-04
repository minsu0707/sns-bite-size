import { Link } from "react-router";
import { Button } from "../ui/button";
import type { Todo } from "@/types";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate: deletedTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  const { mutate: updatedTodo } = useUpdateTodoMutation();
  const handleDeleteClick = () => {
    deletedTodo(id);
  };
  const handleCheckBoxClick = () => {
    updatedTodo({
      id: id,
      isDone: !isDone,
    });
  };

  return (
    <div key={id} className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          disabled={isDeleteTodoPending}
          type={"checkbox"}
          checked={isDone}
          onClick={handleCheckBoxClick}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
        variant={"destructive"}
      >
        삭제
      </Button>
    </div>
  );
}
