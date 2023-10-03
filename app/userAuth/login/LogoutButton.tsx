"use client";

import { loginUser } from "@/recoil/atoms";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useResetRecoilState } from "recoil";

const LogoutButton = () => {
  const router = useRouter();
  const resetUser = useResetRecoilState(loginUser);

  return (
    <button
      className="button btn-delete"
      onClick={() => {
        signOut();
        resetUser();
        // router.push("/");
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
