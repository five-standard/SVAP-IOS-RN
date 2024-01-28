import { instance } from ".";

export const postReport = async (id) => {
  // 청원 신고
  return await instance.post(`/report/${id}`);
};
