import "./Form.css";

import React from "react";

export const Form = () => {
  const getDate = () => {
    const date = new Date();
    let result = `${date.getFullYear()}-${date.getMonth() - 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    return result;
  };

  return (
    <form id="book_write_form" action={""}>
      <header className="book-write-head">
        <div>
          <label className="book-writer-input" htmlFor="book_writer_input">
            작성자명
          </label>
          <input id="book_writer_input" name="writer" type="text" placeholder="이름" />
        </div>
        <input id="book_date_input" name="date" type="text" defaultValue={getDate()} />
        <button type="submit" className="book-write-submit">
          등록
        </button>
      </header>
      <section>
        <textarea className="book-content-area" placeholder="방명록을 작성해주세요"></textarea>
      </section>
    </form>
  );
};
