import fetchApi from "@/pages/api/apiConfig";
import getDate from "@/utils/func/getDate";
import { CommentProps } from "@/utils/interface/comment/commentInterface";
import { FormEvent } from "@/utils/interface/eventType";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handleCommentWrite = async (e: FormEvent, router: AppRouterInstance) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const postid = formData.get("postid");
  const writerid = formData.get("writerid");
  const writer = formData.get("writer");
  const comment = formData.get("commnet");

  if (!comment) {
    console.log("내용이 없습니다.");
    return;
  }

  const data: CommentProps = {
    postid: postid as string,
    writerid: writerid as string,
    writer: writer as string,
    comment: comment as string,
    date: getDate(),
  };

  try {
    await fetchApi("POST", "/api/comment/post", data).then((response) => {
      if (response.ok) {
        router.refresh();
        router.push(response.url);
      }
    });
  } catch (e) {
    console.log("comment_form_서버에 오류 발생\n" + e);
  }
};

export default handleCommentWrite;
