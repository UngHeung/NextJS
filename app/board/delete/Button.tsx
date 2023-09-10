"use client";

import React from "react";

const Button = (props: { _id: string }) => {
  const handleRemove = async () => {
    try {
      await fetch("/api/board/delete", { method: "POST", body: props._id });
    } catch (e) {
      console.error(e);
    }
  };
  return <button onClick={handleRemove}>삭제</button>;
};

export default Button;
