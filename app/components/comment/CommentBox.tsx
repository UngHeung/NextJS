import React from "react";
import Form, { CommentFormProps } from "./Form";

const CommentBox = ({ ...props }: CommentFormProps) => {
  return (
    <>
      <section>
        <ul>
          <li></li>
        </ul>
      </section>
      <section>
        <Form {...props} />
      </section>
    </>
  );
};

export default CommentBox;
