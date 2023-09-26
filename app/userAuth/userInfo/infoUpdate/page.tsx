/**
 * 회원정보수정 페이지
 */

"use client";

import React, { useState } from "react";
import handleUpdateInfo from "./handleUpdateInfo";
import { useSession } from "next-auth/react";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { useRouter } from "next/navigation";
import "./page.css";

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
          <label htmlFor="update_password">비밀번호 변경</label>
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
