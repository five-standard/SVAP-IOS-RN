import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getToken } from "./src/utils/strToken";
import { StackNavigation } from "./src/navigators/Stack";

const queryClient = new QueryClient();

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function test() {
      const data = await getToken();
      if (data.accessToken !== null) {
        setAuth(true);
      }
    }
    test();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StackNavigation auth={auth} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
