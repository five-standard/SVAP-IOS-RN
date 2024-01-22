import { instance } from "..";

export const postSignUp = async (Data) => {
  // 회원가입
  return await instance.post("/user/signup", Data);
};

export const postLogin = async (Data) => {
  // 로그인
  return await instance.post("/user/login", Data);
};

export const getMyPost = async () => {
  // 내가 쓴 청원 보기
  return await instance.get("/user");
};

export const getDuplicationId = async (data) => {
  // ID 중복확인
  return await instance.post("/user/ck-account-id", { accountId: data });
};

export const getDuplicationName = async (Data) => {
  // 이름 중복확인
  return await instance.post("/user/ck-username", Data);
};

export const getInfo = async () => {
  // 유저정보 확인
  return await instance.get("/user/my-info");
};

export const postRefresh = async (token) => {
  // 토큰 리프레쉬
  return await instance.post(
    "/user/reissue",
    {},
    { headers: { AUTHORIZATION_HEADER: token } }
  );
};
