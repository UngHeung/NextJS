import fetchApi from "@/pages/api/apiConfig";
import getDate from "@/utils/func/getDate";
import { CommentProps } from "@/utils/interface/comment/commentInterface";
import { FormEvent } from "@/utils/interface/eventType";
import { ModalOption } from "@/app/components/modal/Modal";

const handleCommentWrite = async (e: FormEvent) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const postid = formData.get("postid");
  const writerid = formData.get("writerid");
  const writer = formData.get("writer");
  const comment = formData.get("comment");

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
        result.ok = true;
        result.title = "등록 성공";
        result.message = "등록되었습니다.";
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

export default handleCommentWrite;
