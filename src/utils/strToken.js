import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  const refresh = await AsyncStorage.getItem("refreshToken");
  return { accessToken: token, refreshToken: refresh };
};

export const setToken = async (tokens) => {
  await AsyncStorage.setItem("accessToken", tokens.accessToken);
  await AsyncStorage.setItem("refreshToken", tokens.refreshToken);
};

export const delToken = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
};
