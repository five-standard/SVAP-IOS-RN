import { useState } from "react";
import { Layout } from "../components/common/Layout";
import { Text } from "react-native";

export const Watch = ({ route }) => {
  const { searchQuery } = route.params;
  console.log(searchQuery);
  const [search, setSearch] = useState("");
  useState(() => {
    searchQuery && setSearch(searchQuery);
  }, [searchQuery]);

  return (
    <Layout header>
      <Text>{searchQuery} 야발</Text>
    </Layout>
  );
};
