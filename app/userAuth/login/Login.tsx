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
import { loginUser, modalData } from "@/recoil/atoms";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { ModalOption } from "@/app/components/modal/Modal";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useRecoilState(loginUser);
  const [modal, setModal] = useRecoilState(modalData);

  return (
    <form
      onSubmit={async (e) => {
        let result: ModalOption;
        let user: UserSessionProps;
        try {
          result = await handleLogin(e, router);
          user = (await getSession())?.user as UserSessionProps;
          setModal({ ...result, type: "primary", url: result.ok ? "/" : "", isShow: true });

          if (result.ok) {
            setUser(user);
          }
        } catch (e) {
          console.error(e);
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
