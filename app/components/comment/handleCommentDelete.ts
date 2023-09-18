import fetchApi from "@/pages/api/apiConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handleRemoveItem = (commentid: string, postid: string, router: AppRouterInstance) => {
  const data = {
    _id: commentid,
    postid: postid,
  };

  fetchApi("DELETE", "/api/comment/delete", data).then((response) => {
    if (response.ok) {
      router.refresh();
      router.push(response.url);
    }
  });
};

export default handleRemoveItem;
