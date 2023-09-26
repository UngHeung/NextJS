/**
 * 회원정보수정 페이지
 */

"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { useRouter } from "next/navigation";
import { FormEvent } from "@/utils/interface/eventType";
import fetchApi from "@/pages/api/apiConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export interface UserInfoUpdateProps {
  _id: string;
  accountname: string;
  password: string;
  updatepassword: boolean;
  newpassword?: string;
}

const InfoUpdate = () => {
  const user = useSession().data?.user as UserSessionProps;
  const router = useRouter();
  const [accountname, setAccountname] = useState(user?.accountname);
  const [password, setPassword] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  if (!user) {
    console.log("회원이 아닙니다.");
    router.push("/");
    return;
  }

  const handleUpdateInfo = async (e: FormEvent, router: AppRouterInstance) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: UserInfoUpdateProps = {
      _id: formData.get("userid") as string,
      accountname: formData.get("accountname") as string,
      password: formData.get("password") as string,
      updatepassword: Boolean(formData.get("updatepassword")),
      newpassword: formData.get("newpassword") as string,
    };
    console.log(data);

    try {
      await fetchApi("POST", "/api/auth/update", data).then((response) => {
        if (response.ok) {
          console.log("변경 성공");
          router.refresh();
          router.push(response.url);
        } else {
          console.log("변경 실패");
          return;
        }
      });
    } catch (e) {
      console.error("userAuth_userInfo_infoUpdate_서버 에러 발생\n" + e);
    }
  };

  return (
    <section>
      <h3 className="title">회원정보수정</h3>
      <form onSubmit={(e) => handleUpdateInfo(e, router)}>
        <input name="userid" type="text" style={{ display: "none" }} defaultValue={user.userid} readOnly />
        <div>
          {/* account name */}
          <input
            id="new_accountname"
            name="accountname"
            type="text"
            value={accountname}
            onChange={(e) => setAccountname(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="new_accountname">이름</label>
        </div>
        <div>
          {/* password */}
          <input
            id="compare_password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="compare_password">기존 비밀번호</label>
        </div>
        <div className="check-password-update">
          {/* update password */}
          <input
            id="update_password"
            name="updatepassword"
            type="checkbox"
            checked={updatePassword}
            onChange={(e) => {
              setUpdatePassword(e.target.checked);
              if (!updatePassword) {
                setNewPassword("");
                setNewPasswordCheck("");
              }
            }}
          />
        </div>
        <label htmlFor="update_password">비밀번호 변경</label>
        {updatePassword && (
          <>
            <div>
              {/* new password */}
              <input
                id="new_password"
                name="newpassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="new_password">새 비밀번호</label>
            </div>
            <div>
              <input
                id="new_password_check"
                type="password"
                value={newPasswordCheck}
                onChange={(e) => setNewPasswordCheck(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="new_password_check">비밀번호 확인</label>
            </div>
          </>
        )}
        <button type="submit">저장</button>
        <button type="button">취소</button>
      </form>
      <label htmlFor=""></label>
    </section>
  );
};

export default InfoUpdate;
