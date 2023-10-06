import getDate from "@/utils/func/getDate";
import fetchApi from "@/pages/api/apiConfig";
import { FormEvent } from "@/utils/interface/eventType";
import { CommentUpdateProps } from "@/utils/interface/comment/commentInterface";
import { ModalOption } from "../modal/Modal";

const handleCommentUpdate = async (e: FormEvent, _id: string) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const commentid = _id;
  const comment = formData.get("comment");
  const postid = formData.get("postid");

  const result: ModalOption = {
    ok: false,
    title: "등록 실패",
    message: "",
    url: "",
  };

  if (!comment) {
    result.message = "내용을 입력해주세요.";
    return result;
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
        result.ok = true;
        result.title = "수정 성공";
        result.message = "수정되었습니다.";
        result.url = response.url;
      }
    });
  } catch (e) {
    result.title = "서버 오류 발생";
    result.message = "관리자에게 문의하세요";
  } finally {
    return result;
  }
};

export default handleCommentUpdate;
