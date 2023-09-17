/**
 * 로그인 핸들러
 */

import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { FormEvent } from "react";

const handleLogin = async (e: FormEvent<HTMLFormElement>, router: AppRouterInstance) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");
  const password = formData.get("password");

  const data = {
    email: email,
    password: password,
    redirect: false,
  };

  if (!email || !password) {
    console.log("아이디 또는 비밀번호 미입력");
    return;
  }

  try {
    await signIn("credentials", data)
      .then((res) => {
        console.log(res?.ok);
        if (res?.ok) {
          console.log("로그인 성공");
        } else {
          console.log("로그인 실패");
          return;
        }

        return res;
      })
      .then((res) => {
        if (res?.ok) {
          router.refresh();
          router.push("/");
        }
      });
  } catch (e) {
    throw new Error(e + "서버에 문제 발생");
  }
};

export default handleLogin;
