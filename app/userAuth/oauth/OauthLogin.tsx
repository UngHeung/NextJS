/**
 * 외부 로그인 컴포넌트
 */

"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";

const SnsLogin = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <>
      {!isAuth ? (
        <button type="button" onClick={() => signIn()}>
          GitHub 계정으로 로그인
        </button>
      ) : (
        <button onClick={() => signOut()}>로그아웃</button>
      )}
    </>
  );
};

export default SnsLogin;
