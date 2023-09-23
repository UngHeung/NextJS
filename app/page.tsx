import React from "react";
import getDbCollection from "@/pages/api/getDatabase";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "./page.css";
import NoticeForm from "./notice/NoticeForm";
import { NoticeProps } from "@/utils/interface/notice/noticeInterface";

export const dynamic = "force-dynamic";

const home = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  let noticeList: NoticeProps[];

  try {
    noticeList = await (await getDbCollection("notice")).find().sort({ importance: -1, _id: -1 }).toArray();
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
      {!user?.admin ? null : <NoticeForm />}
    </>
  );
};

export default home;
