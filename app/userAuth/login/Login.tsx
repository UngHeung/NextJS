/**
 * 로그인 컴포넌트
 */

"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";
// import OauthLogin from "../oauth/OauthLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.refresh();
        router.push("/");
      }
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)} method="GET">
      {/* <section className="sns-login-wrap">
        <OauthLogin isAuth={false} />
      </section> */}
      {/* <hr className="login-quarter-line" /> */}
      <section className="id-login-wrap">
        <div>
          <input name="email" type="email" id="user_id" placeholder=" " onChange={(e) => setEmail(e.target.value)} value={email} />
          <label htmlFor="user_id">이메일</label>
        </div>
        <div>
          <input name="password" type="password" id="user_pw" placeholder=" " onChange={(e) => setPassword(e.target.value)} value={password} />
          <label htmlFor="user_pw">비밀번호</label>
        </div>
      </section>
      <section className="signin-button-wrap">
        <button className="button btn-login">로그인</button>
        <Link className="button btn-normal" href={"userAuth/signUp"}>
          회원가입
        </Link>
      </section>
    </form>
  );
};

export default Login;
