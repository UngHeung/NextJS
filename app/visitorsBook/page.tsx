/**
 * 방명록 페이지
 */

import React from "react";
import Button from "../board/delete/Button";
import { connectDB } from "@/utils/database";
import { Form } from "./write/Form";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { UserDataProps, UserSessionProps } from "@/utils/interface/user/userInterfaces";
import "./page.css";
import { VisitorsBookProps } from "@/utils/interface/visitorsBook/visitorsbookInterfaces";

export const dynamic = "force-dynamic";

const visitorsBook = async () => {
  const client = await connectDB;
  const db = client.db("simplepage");
  const session = await getServerSession(authOptions);
  const user: UserDataProps = session?.user as UserSessionProps;

  const visitorsBookList: VisitorsBookProps[] = await db.collection("visitorsbook").find().sort({ _id: -1 }).toArray();

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
                {user?._id === item?.writerid || !item?.authtype ? (
                  <Button _id={id} userdata={user} req="visitorsBook" authtype={item?.authtype} />
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
