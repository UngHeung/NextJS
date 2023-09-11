import Link from "next/link";
import React from "react";

const home = () => {
  return (
    <div>
      <Link href={"./userAuth"}>로그인</Link>
    </div>
  );
};

export default home;
