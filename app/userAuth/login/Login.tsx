/**
 * 로그인 컴포넌트
 */

import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import OauthLogin from "../oauth/OauthLogin";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const Login = async () => {
  let session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <>
      {!user ? (
        <form action={"/api/auth/get"} method="GET">
          <section className="sns-login-wrap">
            <OauthLogin isAuth={false} />
          </section>
          <hr className="login-quarter-line" />
          <section className="id-login-wrap">
            <div>
              <input name="email" type="email" id="user_id" placeholder=" " />
              <label htmlFor="user_id">이메일</label>
            </div>
            <div>
              <input name="password" type="password" id="user_pw" placeholder=" " />
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
      ) : (
        <OauthLogin isAuth={true} />
      )}
    </>
  );
};

export default Login;
