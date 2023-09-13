"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      className="button btn-delete"
      onClick={() => {
        signOut();
        router.refresh();
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
