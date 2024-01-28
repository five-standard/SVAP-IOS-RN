import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StackNav } from "./src/navigators/Stack";
import { delToken, getToken } from "./src/utils/strToken";

const queryClient = new QueryClient();

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function test() {
      const { accessToken } = await getToken();
      accessToken !== null && setAuth(true);
    }
    test();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StackNav auth={auth} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
