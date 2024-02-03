import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { InputLayout } from "../components/InputLayout";
import { Layout } from "../components/common/Layout";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { patchPost, postImage, postPost } from "../api/Petition";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys";

export const Write = ({ navigation, route }) => {
  const [data, setData] = useState({
    title: "",
    content: "",
    types: "",
    location: "",
    imgUrl: [],
  });
  const [drop, setDrop] = useState(false);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const queryClient = useQueryClient();
  const type = {
    SCHOOL: "학교 청원",
    DORMITORY: "기숙사 청원",
  };
  const disabled =
    data.title.length >= 5 &&
    data.content.length >= 8 &&
    data.types !== "" &&
    data.location.length >= 3 &&
    data.location.length < 10;
  const editData = route.params?.data;

  useEffect(() => {
    if (editData) {
      setData(editData);
    }
  }, []);

  const handleImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (result.canceled) {
      return null;
    } else {
      const { uri, fileName } = result.assets[0];
      const type = "image/" + fileName.split(".").pop();
      setData({
        ...data,
        imgUrl: data.imgUrl.concat([{ uri: uri, name: fileName, type: type }]),
      });
    }
  };

  const handleChange = ({ name, text }) => {
    setData({ ...data, [name]: text });
  };

  const handleDropdown = (e) => {
    const { nativeID } = e._dispatchInstances._debugOwner.memoizedProps;
    setData({ ...data, types: nativeID });
    setDrop(false);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    data.imgUrl.forEach((i) => {
      formData.append("image", i);
    });

    if (!editData) {
      postImage(formData).then((res) => {
        postPost(data, res.data.imageUrl).then(() => {
          navigation.jumpTo("청원 보기", {
            screen: "Watch",
          });
        });
      });
    } else {
      patchPost(data, data.id).then(async () => {
        await queryClient.invalidateQueries([queryKeys.detail, data.id]);
        navigation.goBack();
      });
    }
  };

  return (
    <Layout style={{ gap: 20 }}>
      <InputLayout text="제목" required>
        <Input
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요."
          style={styles.inputContainer}
        />
      </InputLayout>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 100,
        }}
      >
        <InputLayout style={{ width: "47%" }} text="종류" required>
          <TouchableOpacity
            style={[styles.dropdownContainer]}
            onPress={() => setDrop(!drop)}
            activeOpacity={1}
          >
            <Text style={data.types === "" && { color: "#BEBEBE" }}>
              {data.types === "" ? "종류를 선택하세요" : type[data.types]}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.dropdownContainer,
              styles.dropdownElement,
              { display: `${!drop && "none"}` },
            ]}
          >
            <Text nativeID="SCHOOL" onPress={handleDropdown}>
              학교 청원
            </Text>
            <Text nativeID="DORMITORY" onPress={handleDropdown}>
              기숙사 청원
            </Text>
          </View>
        </InputLayout>
        <InputLayout style={{ width: "47%" }} text="위치" required>
          <Input
            value={data.location}
            name="location"
            onChange={handleChange}
            placeholder="위치를 입력하세요."
            style={styles.inputContainer}
          />
        </InputLayout>
      </View>
      <InputLayout text="내용" required>
        <Input
          name="content"
          value={data.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요."
          style={[styles.inputContainer, { height: 190 }]}
          multiline
        />
      </InputLayout>
      <InputLayout text="사진">
        <View>
          <ScrollView horizontal contentContainerStyle={{ gap: 5 }}>
            {!editData ? (
              <TouchableOpacity
                style={styles.imageContainer}
                activeOpacity={1}
                onPress={handleImage}
              >
                <Ionicons name="camera" size={20} />
              </TouchableOpacity>
            ) : (
              <></>
            )}

            {data.imgUrl.length > 0 &&
              data.imgUrl.map((i, j) => {
                return (
                  <Image
                    key={j}
                    source={{ uri: editData ? i : i.uri }}
                    style={styles.imageElement}
                  />
                );
              })}
          </ScrollView>
        </View>
      </InputLayout>
      <Button disabled={!disabled} onPress={handleSubmit}>
        {editData ? "수정 완료" : "업로드"}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#F4F4F4",
    borderColor: "#F4F4F4",
  },
  imageContainer: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
  },
  imageElement: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderColor: "#A7A7A7",
    borderWidth: 0.5,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 1,
    borderColor: "#F4F4F4",
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  dropdownElement: {
    flexDirection: "column",
    marginTop: 65,
    gap: 10,
    position: "absolute",
    shadowColor: "#000",
    shadowRadius: 0.1,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 15,
    paddingTop: 3,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
});
