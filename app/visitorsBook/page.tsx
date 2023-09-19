/**
 * 방명록 페이지
 */

import React from "react";
import Button from "../board/delete/Button";
import getDbCollection from "@/pages/api/getDatabase";
import { Form } from "./write/Form";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { VisitorsBookProps } from "@/utils/interface/visitorsBook/visitorsbookInterfaces";
import "./page.css";

export const dynamic = "force-dynamic";

const visitorsBook = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;
  let visitorsBookList = [] as VisitorsBookProps[];

  try {
    visitorsBookList = await (await getDbCollection("visitorsbook")).find().sort({ _id: -1 }).toArray();
  } catch (e) {
    console.log(e + "서버에 문제 발생");
  }

  return (
    <>
      <section className="book-wrap">
        <h3 className="title">방명록</h3>
        <ul className="book-list">
          {visitorsBookList.map((item) => {
            const id = item._id.toString();
            const [date, time] = item?.date?.split(" ");
            return (
              <li key={id}>
                <strong className="book-writer">{item?.writer}</strong>
                <span className="book-date">
                  {`${date}
                  ${time}`}
                </span>
                <hr className="book-line" />
                <span className="book-content">{`${item?.content}`}</span>
                {user?.userid === item?.writerid || !item?.authtype ? (
                  <Button postid={id} userdata={user} req="visitorsbook" authtype={item?.authtype} />
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="book-write-content">
        <Form {...user} />
      </section>
    </>
  );
};

export default visitorsBook;
