import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { FormEvent } from "react";

const handleSignUp = async (e: FormEvent<HTMLFormElement>, redirect: AppRouterInstance) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");
  const password = formData.get("password");

  const data = {
    accountname: formData.get("accountname"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!email || !password) {
    console.log("아이디 또는 비밀번호 미입력");
    return;
  }

  try {
    await fetch("/api/auth/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          console.log("가입 성공");
        } else {
          console.log("가입 실패");
          return;
        }
      })
      .then(() => {
        redirect.push("/userAuth");
      });
  } catch (e) {
    throw new Error(e + "서버에 문제 발생");
  }
};

export default handleSignUp;
