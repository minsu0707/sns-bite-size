import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      /* cancelQueries -> 인수로 전달한 이 키값에 해당하는 캐시 데이터를
        불러오고 있는 그런 데이터 조회 요청이 있다면 그냥 다 취소시켜버리는 기능 */
      await queryclient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });

      const prevTodos = queryclient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);
      queryclient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });

      return {
        prevTodos,
      };
    },
    onError: (err, variable, context) => {
      if (context && context.prevTodos) {
        queryclient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    onSettled: () => {
      // 캐시 푸효화
      queryclient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
