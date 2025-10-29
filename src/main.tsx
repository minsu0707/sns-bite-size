import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 전역으로 설정
const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 5 * 60 * 1000,

      refetchOnMount: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // 브라우저의 주소를 리액트 앱이 감지할 수 있도록 해서 UI와 동기화시켜주는 그러한 역할을 함
  <BrowserRouter>
    <QueryClientProvider client={queryclient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
