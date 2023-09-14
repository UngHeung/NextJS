"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserDataProps } from "@/utils/interface/user/userInterfaces";
import { CommonDeleteRequestProps, DeleteRequestType } from "@/utils/interface/common/commonInterfaces";
import "./Button.css";

const Button = (props: { _id: string; userdata: UserDataProps; req: string; authtype?: boolean }) => {
  const [bookPassword, setBookPassword] = useState("");
  const router = useRouter();

  const id = props?._id.toString();
  const userId = props?.userdata?._id.toString();
  const deleteType: DeleteRequestType = props.req as DeleteRequestType;

  const data: CommonDeleteRequestProps = {
    _id: id,
    userid: userId!,
    deletetype: deleteType,
    authtype: props?.authtype,
    bookpassword: bookPassword,
  };

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>, data: CommonDeleteRequestProps) => {
    e.preventDefault();

    try {
      await fetch(`/api/${deleteType}/delete`, {
        method: "DELETE",
        body: JSON.stringify({ ...data }),
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("방명록 삭제 성공");
          } else {
            console.log("방명록 삭제 실패");
          }
          return res;
        })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            router.refresh();
            deleteType === "board" && router.push("board");
          }
        })
        .catch((e) => {
          console.error(e + "서버에 문제 발생");
        });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {!props.authtype && (
        <input
          id="book_delete_input"
          type="password"
          name="bookpassword"
          onChange={(e) => setBookPassword(e.target.value)}
          value={bookPassword}
          placeholder="비밀번호"
        />
      )}
      <button id="book_delete_button" className="button btn-delete" onClick={(e) => handleRemove(e, data)}>
        삭제
      </button>
    </>
  );
};

export default Button;
