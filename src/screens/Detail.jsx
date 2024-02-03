import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Layout } from "../components/common/Layout";
import { Button } from "../components/common/Button";
import { deletePost, getPostDetail } from "../api/Petition";
import { queryKeys } from "../utils/queryKeys";
import { Modal } from "../components/Modal";
import { Popup } from "../components/Popup";
import { getUser } from "../utils/strUser";
import { postReport } from "../api/Report";
import { Loc } from "../utils/dataTypes";
import { postVote } from "../api/Vote";

export const Detail = ({ route, navigation }) => {
  const [type, setType] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");

  const { id } = route.params;
  const queryClient = useQueryClient();

  useEffect(() => {
    async function test() {
      const { accountId } = await getUser();
      setUser(accountId);
    }
    test();
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [queryKeys.detail, id],
    queryFn: () => getPostDetail(id),
    select: (res) => {
      return res.data;
    },
  });

  const { mutate: acceptPost } = useMutation({
    mutationFn: () => postVote(id),
    onMutate: () => {
      const old = queryClient.getQueryData([queryKeys.detail, id]);
      queryClient.cancelQueries([queryKeys.detail, id]);
      queryClient.setQueryData([queryKeys.detail, id], {
        ...old,
        data: {
          ...old.data,
          voted: !old.data.voted,
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.detail, id] });
    },
  });

  const { mutate: delPost } = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      navigation.goBack();
    },
  });

  return (
    <Layout>
      {isLoading && <Text>불러오고 있습니다</Text>}
      <ScrollView>
        {isSuccess && (
          <>
            <View style={styles.betweenContainer}>
              <Text style={{ color: "#2B94FF", fontSize: 15 }}>
                #{Loc[data.types]}_{data.location}
              </Text>
              {user === data.accountId && (
                <Ionicons name="menu" onPress={() => setOpen(true)} size={30} />
              )}
            </View>
            <View style={styles.betweenContainer}>
              <Text style={{ fontSize: 18 }}>{data.title}</Text>
              <Text style={{ fontSize: 15 }}>{data.dateTime}</Text>
            </View>
            <View
              style={{
                paddingVertical: 10,
                marginVertical: 10,
                borderColor: "#D3D3D3",
                borderTopWidth: 1,
                borderBottomWidth: 1,
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 15 }}>{`${data.content}`}</Text>
              {data.imgUrl && (
                <View style={styles.imageContainer}>
                  <SliderBox
                    dotColor="#2B94FF"
                    images={data.imgUrl}
                    ImageComponentStyle={{
                      width: "90%",
                      borderRadius: 10,
                      backgroundColor: "#F4F4F4",
                    }}
                    paginationBoxStyle={{
                      gap: -10,
                    }}
                  />
                </View>
              )}

              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  청원 투표하기
                </Text>
                <Text style={{ fontSize: 12, color: "#7C7C7C" }}>
                  이 청원과 같은 생각이라면 아래 버튼을 눌러주세요!
                </Text>
              </View>
              <Button onPress={acceptPost}>
                {data.voted ? "찬성 취소" : "찬성"}
              </Button>
            </View>
            <View style={styles.betweenContainer}>
              <Text style={{ fontWeight: "bold" }}>
                조회수 {data.viewCounts}
              </Text>
              <Text
                onPress={() => setType("report")}
                style={{ color: "#2B94FF", fontSize: 15, fontWeight: "bold" }}
              >
                청원 신고하기
              </Text>
            </View>
          </>
        )}
        {type ? (
          type === "report" ? (
            <Modal
              title="청원 신고하기"
              subTitle="부적절한 신고는 차단의 대상이 될 수 있습니다."
              value={type}
              setValue={setType}
              action={() => postReport(id)}
            />
          ) : (
            <Modal
              title="청원 삭제하기"
              subTitle="정말 삭제하시겠습니까?"
              value={type}
              setValue={setType}
              action={delPost}
            />
          )
        ) : (
          <></>
        )}
        <Popup value={open} setValue={setOpen}>
          <Text
            onPress={() => {
              setOpen(false);
              navigation.push("Edit", {
                screen: "Edit",
                data: data,
              });
            }}
          >
            수정
          </Text>
          <Text
            onPress={() => {
              setOpen(false);
              setType("delete");
            }}
          >
            삭제
          </Text>
        </Popup>
      </ScrollView>
    </Layout>
  );
};

export const styles = StyleSheet.create({
  betweenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
