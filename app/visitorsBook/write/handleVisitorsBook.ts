import fetchApi from "@/pages/api/apiConfig";
import getDate from "@/utils/func/getDate";
import { FormEvent } from "@/utils/interface/eventType";
import { VisitorsBookRequestProps } from "@/utils/interface/visitorsBook/visitorsbookInterfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handleVisitorsBook = async (e: FormEvent, authtype: boolean, router: AppRouterInstance) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const writer = formData.get("writer");
  const writerid = formData.get("writerid");
  const content = formData.get("content");
  const bookpassword = formData.get("bookpassword");

  if (!content) {
    console.log("내용이 없습니다.");
    return;
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
      if (response.status === 200) {
        router.refresh();
        router.push(response.url);
      }
    });
  } catch (e) {
    console.error(e);
  }
};

export default handleVisitorsBook;
