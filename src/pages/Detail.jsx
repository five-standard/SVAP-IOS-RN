import { useQuery } from "@tanstack/react-query";
import { View, Text, StyleSheet } from "react-native";
import { queryKeys } from "../utils/queryKeys";
import { getPostDetail } from "../api/Petition";
import { Layout } from "../components/common/Layout";
import { Loc } from "../utils/dataTypes";
import { Ionicons } from "@expo/vector-icons";

export const Detail = ({ route }) => {
  const { id } = route.params;

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [queryKeys.detail, id],
    queryFn: () => getPostDetail(id),
    select: (res) => {
      return res.data;
    },
  });

  console.log(data);

  return (
    <Layout header>
      {isLoading && <Text>불러오고 있습니다</Text>}
      {isSuccess && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#2B94FF", fontSize: 15 }}>
            #{Loc[data.types]}_{data.location}
          </Text>
          <Ionicons name="drag" />
        </View>
      )}
    </Layout>
  );
};

export const styles = StyleSheet.create({});
