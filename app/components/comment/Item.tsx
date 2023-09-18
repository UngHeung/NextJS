import React from "react";
import { CommentProps } from "./Form";

const Item = ({ ...props }: CommentProps) => {
  const writer = props.writer;
  const [date, time] = props.date.split(" ");

  return (
    <li>
      <div>
        <strong>{writer}</strong>
        <time dateTime={props.date}>
          {date}
          {time}
        </time>
      </div>
      <p>{props.comment}</p>
      <button>수정</button>
      <button>삭제</button>
    </li>
  );
};

export default Item;
