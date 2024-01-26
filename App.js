import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { delToken, getToken } from "./src/utils/strToken";
import { StackNavigation } from "./src/navigators/Stack";
import { getInfo } from "./src/api/User";
import { queryKeys } from "./src/utils/queryKeys";

const queryClient = new QueryClient();

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function test() {
      const data = await getToken();
      if (data.accessToken !== null) {
        setAuth(true);
        getInfo()
          .then((res) => {
            console.log(res.data);
            queryClient.setQueryData(queryKeys.user, {
              userName: res.data.userName,
              accountId: res.data.accountId,
            });
          })
          .catch(() => {});
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
