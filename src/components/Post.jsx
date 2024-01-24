import { View, Text, TouchableOpacity } from "react-native";
import { Loc } from "../utils/dataTypes";
export const Post = ({ data, navigation }) => {
  return (
    <TouchableOpacity
      opacity={false}
      style={{
        width: "100%",
        gap: 4,
      }}
      onPress={() => navigation.push("상세보기", { id: data.id })}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{data.title}</Text>
        <Text style={{ fontSize: 15 }}>{data.dateTime}</Text>
      </View>
      <Text style={{ color: "#2B94FF", fontWeight: "bold", fontSize: 16 }}>
        #{Loc[data.types]}_{data.location}
      </Text>
      <Text numberOfLines={1}>{data.content}</Text>
    </TouchableOpacity>
  );
};
