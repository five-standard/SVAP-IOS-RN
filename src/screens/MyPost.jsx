import { useQuery } from "@tanstack/react-query";
import { Layout } from "../components/common/Layout";
import { queryKeys } from "../utils/queryKeys";
import { getMyPost } from "../api/User";
import { Text, StyleSheet, FlatList } from "react-native";
import { Post } from "../components/Post";

export const MyPost = ({ navigation }) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: queryKeys.myPost,
    queryFn: getMyPost,
    select: (res) => {
      return res.data;
    },
  });

  return (
    <Layout header>
      {isLoading && <Text>불러오고 있습니다...</Text>}
      {isSuccess && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Post data={item} navigation={navigation} key={item.id} />
          )}
          keyExtractor={(data) => data.id}
          contentContainerStyle={styles.postContainer}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    gap: 20,
  },
});
