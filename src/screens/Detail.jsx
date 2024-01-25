import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { queryKeys } from "../utils/queryKeys";
import { getPostDetail } from "../api/Petition";
import { Layout } from "../components/common/Layout";
import { Loc } from "../utils/dataTypes";
import { Ionicons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import { Button } from "../components/common/Button";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { postReport } from "../api/Report";
import { postVote } from "../api/Vote";

export const Detail = ({ route }) => {
  const { id } = route.params;
  const queryClient = useQueryClient();
  const [type, setType] = useState(undefined);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [queryKeys.detail, id],
    queryFn: () => getPostDetail(id),
    select: (res) => {
      return res.data;
    },
  });

  const { mutate } = useMutation({
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
      return () => queryClient.setQueryData([queryKeys.detail, id], old);
    },
    onError: (error, v, rollback) => {
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.detail, id] });
    },
  });

  return (
    <Layout header>
      {isLoading && <Text>불러오고 있습니다</Text>}
      <ScrollView>
        {isSuccess && (
          <>
            <View style={styles.betweenContainer}>
              <Text style={{ color: "#2B94FF", fontSize: 15 }}>
                #{Loc[data.types]}_{data.location}
              </Text>
              <Ionicons name="menu" size={30} />
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
              <Button onPress={mutate}>
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
              action={() => {}}
            />
          )
        ) : (
          <></>
        )}
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
    paddingVertical: 10,
    borderColor: "#D3D3D3",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
