import { useState } from "react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Layout } from "../components/common/Layout";
import { Image, TouchableOpacity, View } from "react-native";
import { InputLayout } from "../components/InputLayout";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export const Write = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    types: "",
    location: "",
    imgUrl: {},
  });
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const handleImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
      base64: true,
    });
    if (result.canceled) {
      return null; // 이미지 업로드 취소한 경우
    } else {
      setData({ ...data, imgUrl: result.assets[0].uri });
    }
  };

  const handleChange = ({ name, text }) => {
    setData({ ...data, [name]: text });
  };

  return (
    <Layout style={{ gap: 25 }}>
      <InputLayout text="제목" required>
        <Input
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요."
          style={{ backgroundColor: "#F4F4F4", borderColor: "#F4F4F4" }}
        />
      </InputLayout>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <InputLayout
          style={{ width: "47%" }}
          text="종류"
          required
        ></InputLayout>
        <InputLayout style={{ width: "47%" }} text="위치" required>
          <Input
            value={data.location}
            name="location"
            onChange={handleChange}
            placeholder="위치를 입력하세요."
            style={{ backgroundColor: "#F4F4F4", borderColor: "#F4F4F4" }}
          />
        </InputLayout>
      </View>
      <InputLayout text="내용" required>
        <Input
          name="content"
          value={data.content}
          onChange={handleChange}
          placeholder="제목을 입력하세요."
          style={{
            backgroundColor: "#F4F4F4",
            borderColor: "#F4F4F4",
            height: 220,
          }}
          multiline
        />
      </InputLayout>
      <InputLayout text="사진">
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
            }}
            activeOpacity={1}
            onPress={handleImage}
          >
            <Ionicons name="camera" size={20} />
          </TouchableOpacity>
          <Image
            source={{ uri: data.imgUrl }}
            style={{ width: 70, height: 70, borderRadius: 10 }}
          />
        </View>
      </InputLayout>
      <Button>업로드</Button>
    </Layout>
  );
};
