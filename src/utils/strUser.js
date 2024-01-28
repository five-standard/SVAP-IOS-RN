import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
  const userName = await AsyncStorage.getItem("userName");
  const accountId = await AsyncStorage.getItem("accountId");
  return { userName: userName, accountId: accountId };
};

export const setUser = async (data) => {
  await AsyncStorage.setItem("userName", data.userName);
  await AsyncStorage.setItem("accountId", data.accountId);
};

export const delUser = async () => {
  await AsyncStorage.removeItem("userName");
  await AsyncStorage.removeItem("accountId");
};
