/**
 * 로그인 컴포넌트
 */

import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import OauthLogin from "../oauth/OauthLogin";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const Signin = async () => {
  let session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <>
      {!user ? (
        <form>
          <section className="sns-login-wrap">
            <OauthLogin isAuth={false} />
          </section>
          <section className="id-login-wrap">
            <input name="userid" type="text" id="user_id" />
            <input name="userpw" type="password" id="user_pw" />
          </section>
          <section className="signin-button-wrap">
            <button>로그인</button>
            <Link href={"/"}>회원가입</Link>
          </section>
          :
        </form>
      ) : (
        <OauthLogin isAuth={true} />
      )}
    </>
  );
};

export default Signin;
