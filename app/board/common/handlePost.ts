import fetchApi from "@/pages/api/apiConfig";
import { FormEvent } from "@/utils/interface/eventType";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handlePost = async (e: FormEvent, router: AppRouterInstance, { ...props }) => {
  e.preventDefault();
  const apiUrl = `/api/board/${props.reqType === "write" ? "post" : "update"}`;
  const formData = new FormData(e.currentTarget);
  const title = props.title;
  const content = props.content;
  const postid = formData.get("postid");
  const writerid = formData.get("writerid");
  const writer = formData.get("writer");

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
      console.log(response);
      if (response.ok) {
        router.refresh();
        router.push(response.url);
      }
    });
  } catch (e) {
    console.log("common_form_서버에 오류 발생\n" + e);
  }
};

export default handlePost;
