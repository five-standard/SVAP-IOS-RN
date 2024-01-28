import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Layout } from "../components/common/Layout";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPopularPetition } from "../api/Petition";
import { Input } from "../components/common/Input";
import Slide2 from "../assets/slide/slide2.png";
import Slide1 from "../assets/slide/slide1.png";
import { queryKeys } from "../utils/queryKeys";

export const Home = ({ navigation }) => {
  const images = [Slide1, Slide2];
  const [search, setSearch] = useState("");

  const { data, isSuccess } = useQuery({
    queryKey: queryKeys.popular,
    queryFn: getPopularPetition,
    select: (res) => {
      return res.data;
    },
  });

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <SliderBox
            dotColor="#2B94FF"
            images={images}
            resizeMode="contain"
            ImageComponentStyle={{
              width: "90%",
              height: "100%",
              backgroundColor: "#F4F4F4",
              borderRadius: 15,
            }}
            paginationBoxStyle={{
              gap: -10,
            }}
            autoplay
            circleLoop
            autoplayInterval={5000}
          />
        </View>
        <Input
          search
          placeholder="청원을 검색해보세요"
          value={search}
          onChange={({ text }) => setSearch(text)}
          onSearch={() =>
            navigation.getParent().jumpTo("청원 보기", {
              screen: "Watch",
              params: { searchQuery: search },
            })
          }
        />
        {isSuccess && (
          <View style={styles.popularContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>인기 청원</Text>
              <Text onPress={() => navigation.push("Detail", { id: data?.id })}>
                더보기
              </Text>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {data?.title}
            </Text>
            <Text>{data?.content}</Text>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  imageContainer: {
    height: 145,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  popularContainer: {
    gap: 10,
  },
});
