import { useState, useEffect } from "react";
import { Layout } from "../components/common/Layout";
import { Text, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "../components/common/Input";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys";
import { getPosts } from "../api/Petition";

export const Watch = ({ route, navigation }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({
    accessType: "ALL",
    type: "NORMAL",
  });

  useEffect(() => {
    if (route.params) {
      setSearch(route.params.searchQuery);
    }
    navigation.getParent().setParams({ screen: undefined });
  }, []);

  const handleChange = ({ text }) => {
    setTimeout(() => {
      setSearch(text);
    }, 200);
  };

  const { data } = useQuery({
    queryKey: [queryKeys.watch, sort, search],
    queryFn: () => {
      getPosts(sort);
    },
  });

  const handleAccessType = (e) => {
    const { nativeID } = e._dispatchInstances._debugOwner.memoizedProps;
    setSort({ ...sort, type: nativeID });
  };

  return (
    <Layout header>
      <View style={styles.interactContainer}>
        <Input
          search
          placeholder="청원을 검색해보세요."
          value={search}
          onChange={handleChange}
        />
        <View style={styles.spaceContainer}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text
              nativeID="ALL"
              style={[styles.typeText, styles.selected]}
              onPress={handleType}
            >
              전체 청원
            </Text>
            <Text
              nativeID="SCHOOL"
              style={[styles.typeText]}
              onPress={handleType}
            >
              학교 청원
            </Text>
            <Text
              nativeID="DORMITORY"
              style={[styles.typeText]}
              onPress={handleType}
            >
              가숙사 청원
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 3,
              fontSize: 15,
              alignItems: "center",
            }}
          >
            <Ionicons name="list" size={15} />
            <Text>작성순</Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  interactContainer: {
    gap: 10,
    paddingBottom: 10,
    borderBottomColor: "#92929250",
    borderBottomWidth: 1,
  },
  spaceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#A7A7A7",
  },
  selected: {
    color: "#2B94FF",
  },
});
