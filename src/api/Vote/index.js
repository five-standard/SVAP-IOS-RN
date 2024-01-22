import { instance } from "..";

export const postVote = async (id) => {
  // 청원 투표
  return await instance.patch(`/vote/${id}`);
};
