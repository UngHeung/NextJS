import getDate from "@/utils/func/getDate";
import fetchApi from "@/pages/api/apiConfig";
import { FormEvent } from "@/utils/interface/eventType";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { CommentUpdateProps } from "@/utils/interface/comment/commentInterface";

const handleCommentUpdate = async (e: FormEvent, router: AppRouterInstance, _id: string) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const commentid = _id;
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
