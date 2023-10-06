/**
 * 회원가입 핸들러
 */

import fetchApi from "@/pages/api/apiConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { FormEvent } from "react";
import bcrypt from "bcryptjs";
import { ModalOption } from "@/app/components/modal/Modal";

const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");
  let password = formData.get("password") as string;

  const hashPassword = await bcrypt.hash(password, 10);
  password = hashPassword;

  const result: ModalOption = {
    ok: false,
    title: "가입 실패",
    message: "",
    url: "",
  };

  if (!email) {
    result.message = "아이디를 입력해주세요.";
    return result;
  } else if (!password) {
    result.message = "비밀번호를 입력해주세요.";
    return result;
  }

  const data = {
    accountname: formData.get("accountname"),
    email: email,
    password: password,
    admin: false,
  };

  try {
    await fetchApi("POST", "/api/auth/post", data).then((response) => {
      if (response.ok) {
        result.ok = true;
        result.title = "가입 성공";
        result.message = "가입되었습니다.";
        result.url = response.url;
      }
    });
  } catch (e) {
    throw new Error("userAuth_signUp_서버 에러 발생\n" + e);
  } finally {
    return result;
  }
};

export default handleSignUp;
