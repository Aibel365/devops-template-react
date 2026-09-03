import { queryClient } from "#/integrations/aibel/services/client/queryClient";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

let context:
    | {
          queryClient: QueryClient;
      }
    | undefined;

export function getContext() {
    if (context) {
        return context;
    }

    context = {
        queryClient
    };

    return context;
}

export default function TanStackQueryProvider({ children }: { children: ReactNode }) {
    const { queryClient: contextQueryClient } = getContext();

    return <QueryClientProvider client={contextQueryClient}>{children}</QueryClientProvider>;
}
