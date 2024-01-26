import { instance } from "..";

export const postPost = async (data, files) => {
  // 청원 글 작성
  if (files) data.imageUrl = files;
  return await instance.post("/petition", data);
};

export const postImage = async (data) => {
  // 이미지 업로드
  return await instance.post("/petition/image", data);
};

export const patchPost = async (data, id) => {
  // 청원 글 수정
  return await instance.patch(`/petition/${id}`, data);
};

export const deletePost = async (id) => {
  // 청원 글 삭제
  return await instance.delete(`/petition/${id}`);
};

export const getPostDetail = async (id) => {
  // 청원 글 상세보기
  return await instance.get(`/petition/${id}`);
};

export const getSearchPosts = async (data) => {
  // 청원 검색
  return await instance.post("/petition/search", { title: data });
};

export const getPopularPetition = async () => {
  // 인기 청원 조회
  return await instance.get("/petition/popular");
};

export const getPosts = async (data) => {
  // 청원 조회
  return await instance.get(`/petition/sort/${data.type}/${data.accessType}`);
};
