import fetchApi from "@/pages/api/apiConfig";
import getDate from "@/utils/func/getDate";
import { FormEvent } from "@/utils/interface/eventType";
import { CommentProps } from "./Form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handleCommentWrite = async (e: FormEvent, router: AppRouterInstance) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const data: CommentProps = {
    postid: formData.get("postid") as string,
    writerid: formData.get("writerid") as string,
    writer: formData.get("writer") as string,
    comment: formData.get("comment") as string,
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
