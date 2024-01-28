import { useQuery } from "@tanstack/react-query";
import { Layout } from "../../components/common/Layout";
import { queryKeys } from "../../utils/queryKeys";
import { Text, FlatList } from "react-native";
import { Post } from "../../components/Post";
import { getMyPost } from "../../api/User";

export const MyPost = ({ navigation }) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: queryKeys.myPost,
    queryFn: getMyPost,
    select: (res) => {
      return res.data;
    },
  });

  return (
    <Layout>
      {isLoading && (
        <Text style={{ alignSelf: "center" }}>불러오고 있습니다...</Text>
      )}
      {isSuccess && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Post data={item} navigation={navigation} key={item.id} />
          )}
          keyExtractor={(data) => data.id}
          contentContainerStyle={{ gap: 20, alignItems: "stretch" }}
        />
      )}
    </Layout>
  );
};
