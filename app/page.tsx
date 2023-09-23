import React from "react";
import getDbCollection from "@/pages/api/getDatabase";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "./page.css";

interface NoticeProps {
  important: boolean;
  importantNo?: number;
  title: string;
  content: string;
}

export const dynamic = "force-dynamic";

const home = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  let noticeList: NoticeProps[];

  try {
    noticeList = await (await getDbCollection("notice")).find().sort({ importance: -1 }).toArray();
  } catch (e) {
    console.error("home_서버에 문제 발생\n" + e);
    redirect("/home");
  }

  return (
    <>
      <section className={`notice-wrap ${user?.admin ? "admin" : null}`}>
        <h3 className="title">공지사항</h3>
        <ul className="notice-list">
          {!noticeList ? (
            <>공지사항이 없습니다.</>
          ) : (
            noticeList.map((item, idx) => {
              return (
                <li key={idx} className="notice-item">
                  <h4 className={`notice-title ${item.important ? "important" : null}`}>{item.title}</h4>
                  <p className="notice-content">{item.content}</p>
                </li>
              );
            })
          )}
        </ul>
      </section>
      {!user?.admin ? null : (
        <form className="notice-form">
          <header className="notice-form-head">
            <input type="text" name="title" id="notice_input_title" className="notice-input-title" placeholder="제목" />
            <input type="checkbox" name="important" id="notice_input_important" />
            <label className="notice-input-important" htmlFor="notice_input_important">
              중요
            </label>
            <select name="notice-input-importance" id="notice_input_importance">
              <option defaultChecked value="0">
                --
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className="button btn-normal">등록</button>
          </header>
          <textarea name="content" className="notice-input-content" placeholder="내용"></textarea>
        </form>
      )}
    </>
  );
};

export default home;
