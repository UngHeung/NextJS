/**
 * 방명록 작성 핸들러
 */

import fetchApi from "@/pages/api/apiConfig";
import getDate from "@/utils/func/getDate";
import { FormEvent } from "@/utils/interface/eventType";
import { VisitorsBookRequestProps } from "@/utils/interface/visitorsBook/visitorsbookInterfaces";
import { ModalOption } from "@/app/components/modal/Modal";

const handleVisitorsBook = async (e: FormEvent, authtype: boolean) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const writer = formData.get("writer");
  const writerid = formData.get("writerid");
  const content = formData.get("content");
  const bookpassword = formData.get("bookpassword");

  const result: ModalOption = {
    ok: false,
    title: "등록 실패",
    message: "",
    url: "",
  };

  if (!content) {
    result.message = "내용을 입력해주세요.";
    return result;
  }

  const data: VisitorsBookRequestProps = {
    writer: writer as string,
    writerid: writerid as string,
    content: content as string,
    bookpassword: bookpassword as string,
    date: getDate(),
    authtype: authtype,
  };

  try {
    await fetchApi("POST", "/api/visitorsbook/post", data).then((response) => {
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

export default handleVisitorsBook;
