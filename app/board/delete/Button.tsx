"use client";

import { useRouter } from "next/navigation";
import React from "react";
import "./Button.css";

const Button = (props: { _id: string }) => {
  const router = useRouter();

  const handleRemove = async () => {
    try {
      await fetch("/api/board/delete", { method: "DELETE", body: props._id })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            console.log("서버에 문제 발생!");
            return;
          }
        })
        .then((res) => {
          console.log(res);
          router.push("/board");
          router.refresh();
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button id="board_delete_button" className="btn-basic" onClick={handleRemove}>
      삭제
    </button>
  );
};

export default Button;
