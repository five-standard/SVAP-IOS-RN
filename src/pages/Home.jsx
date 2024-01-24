import { View, StyleSheet, Image, Text } from "react-native";
import { Layout } from "../components/common/Layout";
import Slide1 from "../assets/slide/slide1.png";
import Slide2 from "../assets/slide/slide2.png";

export const Home = () => {
  const images = [Slide1, Slide2];

  return (
    <Layout header style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={Slide1}
          resizeMode="contain"
          style={{ width: "100%", borderRadius: 15 }}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {},
});
