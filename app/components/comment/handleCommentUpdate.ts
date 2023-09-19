import getDate from "@/utils/func/getDate";
import fetchApi from "@/pages/api/apiConfig";
import { CommentUpdateProps } from "./Form";
import { FormEvent } from "@/utils/interface/eventType";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handleCommentUpdate = async (e: FormEvent, router: AppRouterInstance) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const commentid = formData.get("commentid");
  const comment = formData.get("comment");
  const postid = formData.get("postid");

  if (!comment) {
    console.log("내용이 없습니다.");
    return;
  }

  const data: CommentUpdateProps = {
    _id: commentid as string,
    comment: comment as string,
    postid: postid as string,
    date: getDate(),
  };

  try {
    await fetchApi("POST", "/api/comment/update", data).then((response) => {
      if (response.ok) {
        router.refresh();
        router.push(response.url);
      }
    });
  } catch (e) {
    console.error("comment_update_서버에 오류 발생\n" + e);
  }
};

export default handleCommentUpdate;
