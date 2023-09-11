/**
 * 방명록 페이지
 */

import React from "react";
import { connectDB } from "@/utils/database";
import "./page.css";
import { visitorsBookProps } from "@/utils/interface/visitorsbookInterface";
import { Form } from "./write/Form";
import Button from "../board/delete/Button";

const visitorsBook = async () => {
  const client = await connectDB;
  const db = client.db("simplepage");

  const visitorsBookList: visitorsBookProps[] = await db.collection("visitorsbook").find().toArray();

  return (
    <>
      <section className="book-wrap">
        <h3 className="title">방명록</h3>
        <ul className="book-list">
          {visitorsBookList.reverse().map((item) => {
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
                <Button _id={item?._id} req="visitorsBook" />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="book-write-content">
        <Form />
      </section>
    </>
  );
};

export default visitorsBook;
