/**
 * 로그인 컴포넌트
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import handleLogin from "./handleLogin";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { loginUser } from "@/recoil/atoms";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useRecoilState(loginUser);

  return (
    <form
      onSubmit={async (e) => {
        try {
          await handleLogin(e, router);
          const user = (await getSession())?.user as UserSessionProps;
          setUser(user);
        } catch (e) {
          console.log("login_서버 에러 발생\n" + e);
        }
      }}
      method="GET"
    >
      <section className="id-login-wrap">
        <div>
          <input
            name="email"
            type="email"
            id="user_id"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="user_id">이메일</label>
        </div>
        <div>
          <input
            name="password"
            type="password"
            id="user_pw"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
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
