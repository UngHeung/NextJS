"use client";

import React from "react";
import { loginUser, modalData } from "@/recoil/atoms";
import { signOut } from "next-auth/react";
import { useRecoilState, useResetRecoilState } from "recoil";

const LogoutButton = () => {
  const resetUser = useResetRecoilState(loginUser);
  const [modal, setModal] = useRecoilState(modalData);

  return (
    <button
      className="button btn-delete"
      onClick={() => {
        signOut();
        resetUser();
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
