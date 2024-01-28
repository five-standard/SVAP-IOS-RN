import { useState, useEffect } from "react";
import { Layout } from "../components/common/Layout";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Input } from "../components/common/Input";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys";
import { getPosts, getSearchPosts } from "../api/Petition";
import { Post } from "../components/Post";
import { Popup } from "../components/Popup";

export const Watch = ({ route, navigation }) => {
  const [search, setSearch] = useState({
    temp: "",
    data: "",
  });
  const [sort, setSort] = useState({
    accessType: "NORMAL",
    type: "ALL",
  });
  const [open, setOpen] = useState(false);
  let timer;
  const accessType = {
    NORMAL: "최신순",
    WAITING: "검토중",
    APPROVAL: "승인됨",
    VOTE: "투표순",
  };

  useEffect(() => {
    if (route.params) {
      const { searchQuery } = route.params;
      setSearch({ temp: searchQuery, data: searchQuery });
    }
    navigation.getParent().setParams({ screen: undefined });
  }, []);

  const handleChange = ({ text }) => {
    setSearch({ ...search, temp: text });
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearch((prev) => {
        return { ...prev, data: prev.temp };
      });
    }, 1000);
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [queryKeys.watch, sort, search.data],
    queryFn: async () => {
      if (search.data !== "") {
        return await getSearchPosts(search.data);
      } else {
        return await getPosts(sort);
      }
    },
    select: (res) => {
      return res.data;
    },
  });

  const handleType = (e) => {
    const { nativeID } = e._dispatchInstances._debugOwner.memoizedProps;
    setSort({ ...sort, type: nativeID });
  };

  const handleAccessType = (e) => {
    const { nativeID } = e._dispatchInstances._debugOwner.memoizedProps;
    setSort({ ...sort, accessType: nativeID });
    setOpen(false);
  };

  return (
    <Layout>
      <View style={styles.interactContainer}>
        <Input
          search
          placeholder="청원을 검색해보세요."
          value={search.temp}
          onChange={handleChange}
        />
        <View style={styles.spaceContainer}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text
              nativeID="ALL"
              style={[styles.typeText, sort.type === "ALL" && styles.selected]}
              onPress={handleType}
            >
              전체 청원
            </Text>
            <Text
              nativeID="SCHOOL"
              style={[
                styles.typeText,
                sort.type === "SCHOOL" && styles.selected,
              ]}
              onPress={handleType}
            >
              학교 청원
            </Text>
            <Text
              nativeID="DORMITORY"
              style={[
                styles.typeText,
                sort.type === "DORMITORY" && styles.selected,
              ]}
              onPress={handleType}
            >
              가숙사 청원
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 3,
              fontSize: 15,
              alignItems: "center",
            }}
            activeOpacity={1}
            onPress={() => setOpen(true)}
          >
            <Ionicons name="list" size={15} />
            <Text>{accessType[sort.accessType]}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postContainer}>
        {isLoading && (
          <Text style={styles.skeletonText}>불러오고 있습니다</Text>
        )}
        {isSuccess && (
          <FlatList
            ListEmptyComponent={
              <Text style={styles.skeletonText}>글이 존재하지 않습니다</Text>
            }
            data={data}
            renderItem={({ item }) => (
              <Post data={item} navigation={navigation} key={item.id} />
            )}
            contentContainerStyle={{
              gap: 20,
              width: "100%",
              alignItems: "stretch",
            }}
          />
        )}
      </View>
      <Popup value={open} setValue={setOpen}>
        <Text onPress={handleAccessType} nativeID="NORMAL" style={styles.popUp}>
          최신순
        </Text>
        <Text
          onPress={handleAccessType}
          nativeID="WAITING"
          style={styles.popUp}
        >
          검토중
        </Text>
        <Text
          onPress={handleAccessType}
          nativeID="APPROVAL"
          style={styles.popUp}
        >
          승인됨
        </Text>
        <Text onPress={handleAccessType} nativeID="VOTE" style={styles.popUp}>
          투표순
        </Text>
      </Popup>
    </Layout>
  );
};

const styles = StyleSheet.create({
  interactContainer: {
    gap: 10,
    paddingBottom: 10,
    borderBottomColor: "#92929250",
    borderBottomWidth: 1,
    marginBottom: 10,
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
  postContainer: {
    width: "100%",
    paddingBottom: 90,
  },
  skeletonText: {
    alignSelf: "center",
  },
  popUp: {
    fontSize: 15,
  },
});
