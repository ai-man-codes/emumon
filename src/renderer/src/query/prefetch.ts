import { QueryClient } from "@tanstack/react-query";
import { emulatorKeys } from "./queryKeys";

export const prefetchOnAppStart = async (queryClient: QueryClient) => {
    await queryClient.prefetchQuery({
        queryKey: emulatorKeys.all,
        queryFn: () => window.api.fetchEmulators(),
        staleTime: 1000 * 60 * 5,
    })
}