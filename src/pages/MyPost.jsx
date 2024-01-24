import { useQuery } from "@tanstack/react-query";
import { Layout } from "../components/common/Layout";
import { queryKeys } from "../utils/queryKeys";
import { getMyPost } from "../api/User";
import { Text, StyleSheet, View, ScrollView } from "react-native";
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
      <ScrollView contentContainerStyle={styles.postContainer}>
        {isLoading && <Text>불러오고 있습니다...</Text>}
        {isSuccess &&
          data?.map((i) => (
            <Post data={i} key={i.id} navigation={navigation} />
          ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    gap: 20,
    alignItems: "center",
  },
});
