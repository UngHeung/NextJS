/**
 * 게시물 상세 페이지
 */

export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import Button from "../../delete/Button";
import getDbCollection from "@/pages/api/getDatabase";
import CommentList from "@/app/components/comment/CommentBox";
import { ObjectId } from "mongodb";
import { PostProps } from "@/utils/interface/board/boardInterfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { CommentFormProps } from "@/utils/interface/comment/commentInterface";
import "./page.css";

const postDetail = async ({ ...props }: { params: PostProps }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  let detail = {} as PostProps;

  try {
    detail = await (await getDbCollection("board")).findOne({ _id: new ObjectId(props.params._id) });
    detail._id = detail._id.toString();
  } catch (e) {
    console.error("board_detail_id_서버에 문제 발생\n" + e);
    // redirect("/board");
  }

  const postInfo: CommentFormProps = {
    postid: props.params._id,
    writer: user?.accountname,
    writerid: user?.userid,
  };

  return (
    <>
      <main className="board-detail-main">
        <header className="board-detail-head">
          <h3 className="board-detail-title">{detail?.title}</h3>
          <span className="board-detail-writer">{detail?.writer}</span>
        </header>
        <section className="board-detail-content-wrap">
          <p className="board-detail-content">{detail?.content}</p>
          <input type="checkbox" name="board-like" id="board_detail_like" />
        </section>
        <section className="board-detail-link-wrap">
          <Link className="button btn-normal" href={"/board"}>
            목록
          </Link>
          {user?.userid === detail?.writerid ? (
            <>
              <Link className="button btn-normal" href={`/board/update/${detail?._id}`}>
                수정
              </Link>
              <Button postid={detail?._id} req="board" userdata={user} authtype={true} />
            </>
          ) : null}
        </section>
        <section>
          <CommentList {...postInfo} />
        </section>
      </main>
    </>
  );
};

export default postDetail;
