"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { userProps } from "../common/Form";
import "./Button.css";

const Button = (props: { _id: string; userdata: userProps; req: string; authtype: boolean }) => {
  const router = useRouter();
  const [bookPassword, setBookPassword] = useState("");

  const handleRemove = async () => {
    try {
      await fetch(`/api/${props.req}/delete`, { method: "DELETE", body: JSON.stringify({ _id: props._id, bookpassword: bookPassword, userdata: props.userdata }) })
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
          router.push(`/${props.req}`);
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
    <>
      {!props.authtype && <input id="book_delete_input" type="password" name="bookpassword" onChange={(e) => setBookPassword(e.target.value)} value={bookPassword} placeholder="비밀번호" />}
      <button id="book_delete_button" className="button btn-delete" onClick={handleRemove}>
        삭제
      </button>
    </>
  );
};

export default Button;
