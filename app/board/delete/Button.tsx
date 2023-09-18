"use client";

import React, { useState } from "react";
import fetchApi from "@/pages/api/apiConfig";
import { useRouter } from "next/navigation";
import { UserInfoProps } from "@/utils/interface/user/userInterfaces";
import { CommonDeleteRequestProps, DeleteRequestType } from "@/utils/interface/common/commonInterfaces";
import { ButtonEvent } from "@/utils/interface/eventType";
import "./Button.css";

const Button = (props: { postid: string; userdata: UserInfoProps; req: string; authtype?: boolean }) => {
  const postid = props?.postid;
  const userId = props?.userdata?.userid;
  const deleteType: DeleteRequestType = props.req as DeleteRequestType;

  const [bookPassword, setBookPassword] = useState("");
  const router = useRouter();

  const data: CommonDeleteRequestProps = {
    _id: postid,
    userid: userId!,
    deletetype: deleteType,
    authtype: props?.authtype,
    bookpassword: bookPassword,
  };

  const handleRemove = async (e: ButtonEvent, data: CommonDeleteRequestProps) => {
    e.preventDefault();
    console.log(data);
    try {
      await fetchApi("DELETE", `/api/${deleteType}/delete`, data).then((response) => {
        if (response.ok) {
          router.refresh();
          router.push(response.url);
          // deleteType === "board" && router.push("board");
        } else {
          console.log(response.status);
        }
      });
    } catch (e) {
      console.error("common_delete_button_서버에 문제 발생\n" + e);
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
