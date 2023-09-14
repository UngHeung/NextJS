/**
 * 방명록 페이지
 */

import React from "react";
import { connectDB } from "@/utils/database";
import "./page.css";
import { visitorsBookProps } from "@/utils/interface/visitorsBook/visitorsbookInterface";
import { Form } from "./write/Form";
import Button from "../board/delete/Button";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { userProps } from "../board/common/Form";

export const dynamic = "force-dynamic";

const visitorsBook = async () => {
  const client = await connectDB;
  const db = client.db("simplepage");
  const session = await getServerSession(authOptions);
  const user: userProps = session?.user as userProps;

  const visitorsBookList: visitorsBookProps[] = await db.collection("visitorsbook").find().sort({ _id: -1 }).toArray();

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
