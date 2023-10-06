import fetchApi from "@/pages/api/apiConfig";
import { FormEvent } from "@/utils/interface/eventType";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handlePost = async (e: FormEvent, { ...props }) => {
  e.preventDefault();
  const apiUrl = `/api/board/${props.reqType === "write" ? "post" : "update"}`;
  const formData = new FormData(e.currentTarget);
  const title = props.title;
  const content = props.content;
  const postid = formData.get("postid");
  const writerid = formData.get("writerid");
  const writer = formData.get("writer");

  const result = {
    ok: false,
    title: "등록 실패",
    message: "",
    url: "",
  };

  if (!title) {
    result.message = "제목을 입력해주세요.";
    return result;
  } else if (!content) {
    result.message = "내용을 입력해주세요";
    return result;
  }

  const data = {
    _id: postid,
    writerid: writerid,
    writer: writer,
    title: title,
    content: content,
    postid: postid,
  };

  try {
    await fetchApi("POST", apiUrl, data).then((response) => {
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

export default handlePost;
