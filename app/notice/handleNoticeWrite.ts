import fetchApi from "@/pages/api/apiConfig";
import { FormEvent } from "@/utils/interface/eventType";
import { NoticeProps } from "@/utils/interface/notice/noticeInterface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handleNoticeWrite = async (e: FormEvent, router: AppRouterInstance) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  let important = Boolean(formData.get("important"));
  const importance = parseInt(formData.get("importance") as string);

  if (!importance) {
    important = false;
  }

  const data: NoticeProps = {
    title: title,
    content: content,
    important: important,
    importance: importance,
  };

  fetchApi("POST", "/api/notice/post", data).then((response) => {
    if (response.ok) {
      console.log("공지등록 성공");
      router.refresh();
    } else {
      console.log("공지등록 실패");
    }
  });
};

export default handleNoticeWrite;
