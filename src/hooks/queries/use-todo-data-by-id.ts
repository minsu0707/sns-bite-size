import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: string) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ["todos", id],

    // staleTime은 데이터가 fresh 상태일 때만 유효함
    staleTime: 5000,
    gcTime: 5000,

    // 1초 마다 api 호출
    // refetchInterval: 1000, 또는 false

    // 마운트 되었을 때는 호출 안함
    // refetchOnMount: false,

    // 다른 창 갔다가 다시 방문 했을 때 호출 안함
    // refetchOnWindowFocus: false,

    // 네트워크 연결이 끊겨도 호출 안함
    // refetchOnReconnect: false,
  });
}
