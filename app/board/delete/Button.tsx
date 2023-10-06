/**
 * 게시물, 방명록 삭제 버튼
 */

"use client";

import React, { useState } from "react";
import fetchApi from "@/pages/api/apiConfig";
import { useRouter } from "next/navigation";
import { UserInfoProps } from "@/utils/interface/user/userInterfaces";
import { CommonDeleteRequestProps, DeleteRequestType } from "@/utils/interface/common/commonInterfaces";
import { ButtonEvent } from "@/utils/interface/eventType";
import { useRecoilState } from "recoil";
import { modalData } from "@/recoil/atoms";
import { ModalOption } from "@/app/components/modal/Modal";
import "./Button.css";

const Button = (props: { postid: string; userdata: UserInfoProps; req: string; authtype?: boolean }) => {
  const postid = props?.postid;
  const userId = props?.userdata?.userid;
  const deleteType: DeleteRequestType = props.req as DeleteRequestType;
  const [modal, setModal] = useRecoilState(modalData);

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

    let result: ModalOption = {
      ok: false,
      title: "삭제 실패",
      message: "",
      url: "",
    };

    try {
      await fetchApi("DELETE", `/api/${deleteType}/delete`, data).then((response) => {
        if (response.ok) {
          result.ok = true;
          result.title = "삭제 성공";
          result.message = "게시물이 삭제되었습니다.";
          result.url = response.url;
        } else if (response.status === 500) {
          result.message = "비밀번호를 확인해주세요.";
        }
      });
    } catch (e) {
      result.title = "서버 오류 발생";
      result.message = "관리자에게 문의하세요.";
    } finally {
      return result;
    }
  };

  return (
    <>
      {!props.authtype && (
        <input
          className="book-delete-input"
          type="password"
          name="bookpassword"
          onChange={(e) => setBookPassword(e.target.value)}
          value={bookPassword}
          placeholder="비밀번호"
        />
      )}
      <button
        className="button btn-delete"
        onClick={async (e) => {
          let result: ModalOption;
          try {
            result = await handleRemove(e, data);

            setModal({
              type: "primary",
              title: result.title,
              message: result.message,
              url: result.url,
              isShow: true,
            });
          } catch (e) {
            console.error(e);
          }
        }}
      >
        삭제
      </button>
    </>
  );
};

export default Button;
