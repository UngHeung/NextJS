/**
 * 수정하기 페이지
 */

import React from "react";
import Form from "../../common/Form";
import getDbCollection from "@/pages/api/getDatabase";
import { ObjectId } from "mongodb";
import { PostProps } from "@/utils/interface/board/boardInterfaces";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { getServerSession } from "next-auth";
import "../../page.css";

const postUpdate = async ({ ...props }: { params: PostProps }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  if (!user) {
    console.log("로그인이 필요합니다.");
    redirect("/userAuth");
  }

  let data = {} as PostProps;

  try {
    data = await (await getDbCollection("board")).findOne({ _id: new ObjectId(props.params._id) });
    data._id = data._id.toString();
  } catch (e) {
    console.log("board_update_id_서버에 문제 발생\n" + e);
    redirect(`/board/detail/${data._id}`);
  }

  return (
    <>
      <main className="board-write-main">
        <h3 className="title">수정하기</h3>
        <header className="board-write-head">
          <Form type="update" data={data} />
        </header>
      </main>
    </>
  );
};

export default postUpdate;
