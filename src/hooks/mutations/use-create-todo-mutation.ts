import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (nеwTodo) => {
      /*  todos의 캐시 데이터를 무효화 메서드
      즉, 데이터를 다시 리페칭 시킴 */
      // 이렇게 쿼리키를 상수로 선언해서 나누어 사용하면 불필요한 데이터 리페칭 발생 X
      // queryclient.invalidateQueries({
      //   queryKey: QUERY_KEYS.todo.list,
      // });
      queryclient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [nеwTodo];
        return [...prevTodos, nеwTodo];
      });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
