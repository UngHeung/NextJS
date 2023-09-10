/**
 * 방명록 페이지
 */

import React from "react";
import { connectDB } from "@/utils/database";
import "./page.css";
import Link from "next/link";
import { visitorsBookProps } from "@/utils/interface/visitorsbookInterface";

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
            return (
              <li key={item.id}>
                <strong className="book-writer">✏️ {item.writer}</strong>
                <span className="book-date">
                  {`${item.date.split(" ")[0]}
                  ${item.date.split(" ")[1]}`}
                </span>
                <hr className="book-line" />
                <span className="book-content">{`${item.content}`}</span>
              </li>
            );
          })}
        </ul>
      </section>
      <section>{/* <Link href={"visitorsBook/write"}>방명록 쓰기</Link> */}</section>
    </>
  );
};

export default visitorsBook;
