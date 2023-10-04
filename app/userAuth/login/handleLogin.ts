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

  const result = {
    ok: false,
    message: "",
  };

  if (!email) {
    result.message = "이메일을 입력해주세요.";
    return result;
  }

  if (!password) {
    result.message = "비밀번호를 입력해주세요.";
    return result;
  }

  const data = {
    email: email,
    password: password,
    redirect: false,
  };

  try {
    await signIn("credentials", data).then((response) => {
      if (response?.ok) {
        result.ok = true;
        result.message = "로그인 되었습니다.";
      } else {
        result.message = "이메일 또는 비밀번호를 확인해주세요.";
      }

      return response;
    });
  } catch (e) {
    result.message = "이메일 또는 비밀번호를 확인해주세요.";
  } finally {
    return result;
  }
};

export default handleLogin;
