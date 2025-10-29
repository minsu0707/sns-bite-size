import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation";

export default function TodoEditor() {
  const [content, setContent] = useState<string>("");
  const { mutate: addTodo, isPending } = useCreateTodoMutation();

  const handleAddClick = () => {
    if (!content.trim()) return;
    addTodo(content);
    setContent("");
  };

  return (
    <div className="flex gap-2">
      <Input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="새로운 할 일을 입력하세요..."
      />
      <Button disabled={isPending} onClick={handleAddClick}>
        추가
      </Button>
    </div>
  );
}
