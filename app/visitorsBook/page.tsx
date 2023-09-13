/**
 * 방명록 페이지
 */

import React from "react";
import { connectDB } from "@/utils/database";
import "./page.css";
import { visitorsBookProps } from "@/utils/interface/visitorsbookInterface";
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

  const visitorsBookList: visitorsBookProps[] = await db.collection("visitorsbook").find().toArray();

  return (
    <>
      <section className="book-wrap">
        <h3 className="title">방명록</h3>
        <ul className="book-list">
          {visitorsBookList.map((item) => {
            item._id = item._id.toString();
            return (
              <li key={item?._id}>
                <strong className="book-writer">{item?.writer}</strong>
                <span className="book-date">
                  {`${item?.date.split(" ")[0]}
                  ${item?.date.split(" ")[1]}`}
                </span>
                <hr className="book-line" />
                <span className="book-content">{`${item?.content}`}</span>
                {user?._id === item?.writerid || !item?.authtype ? <Button _id={item?._id} userdata={user} req="visitorsBook" authtype={item?.authtype} /> : null}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="book-write-content">
        <Form userdata={user} />
      </section>
    </>
  );
};

export default visitorsBook;
