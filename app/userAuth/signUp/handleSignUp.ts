/**
 * 회원가입 핸들러
 */

import fetchApi from "@/pages/api/apiConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { FormEvent } from "react";
import bcrypt from "bcryptjs";

const handleSignUp = async (e: FormEvent<HTMLFormElement>, redirect: AppRouterInstance) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");
  let password = formData.get("password") as string;

  const hashPassword = await bcrypt.hash(password, 10);
  password = hashPassword;

  const data = {
    accountname: formData.get("accountname"),
    email: email,
    password: password,
    admin: false,
  };

  if (!email || !password) {
    console.log("아이디 또는 비밀번호 미입력");
    return;
  }

  try {
    await fetchApi("POST", "/api/auth/post", data).then((response) => {
      redirect.push(response.url);
    });
  } catch (e) {
    throw new Error(e + "서버에 문제 발생");
  }
};

export default handleSignUp;
