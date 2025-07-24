import { useEffect } from "react"
import AppRoutes from "./routes/AppRoutes"
import { prefetchOnAppStart } from "@renderer/query/prefetch"
import { useQueryClient } from "@tanstack/react-query"

function App() {
  const queryClient = useQueryClient()

  useEffect(() => {
    prefetchOnAppStart(queryClient)
    
  }, [queryClient])

  return <AppRoutes />
}

export default App
