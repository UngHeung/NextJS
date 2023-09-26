import fetchApi from "@/pages/api/apiConfig";
import { FormEvent } from "@/utils/interface/eventType";
import { UserInfoUpdateProps } from "@/utils/interface/user/userInterfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const handleUpdateInfo = async (e: FormEvent, router: AppRouterInstance) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const data: UserInfoUpdateProps = {
    _id: formData.get("userid") as string,
    accountname: formData.get("accountname") as string,
    password: formData.get("password") as string,
    updatepassword: Boolean(formData.get("updatepassword")),
    newpassword: formData.get("newpassword") as string,
  };
  console.log(data);

  try {
    await fetchApi("POST", "/api/auth/update", data).then((response) => {
      if (response.ok) {
        console.log("변경 성공");
        router.refresh();
        router.push(response.url);
      } else {
        console.log("변경 실패");
        return;
      }
    });
  } catch (e) {
    console.error("userAuth_userInfo_infoUpdate_서버 에러 발생\n" + e);
  }
};

export default handleUpdateInfo;
