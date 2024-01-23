import { useQueryClient } from "@tanstack/react-query";
import { View, StyleSheet, Image, Text } from "react-native";
import { Layout } from "../components/Layout";
import Logo from "../assets/Logo.png";
import Slide1 from "../assets/slide/slide1.png";
import Slide2 from "../assets/slide/slide2.png";

export const Home = () => {
  const images = [Slide1, Slide2];

  return (
    <Layout style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={Logo} resizeMode="contain" style={{ width: 80 }} />
      </View>
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
  headerContainer: {
    paddingTop: 10,
  },
});
