import fetchApi from "@/pages/api/apiConfig";
import { ModalOption } from "@/app/components/modal/Modal";
import { FormEvent } from "@/utils/interface/eventType";
import { UserInfoUpdateProps } from "@/utils/interface/user/userInterfaces";

const handleUpdateInfo = async (e: FormEvent) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const result: ModalOption = {
    ok: false,
    title: "업데이트 실패",
    message: "",
    url: "",
  };

  const data: UserInfoUpdateProps = {
    _id: formData.get("userid") as string,
    accountname: formData.get("accountname") as string,
    password: formData.get("password") as string,
    updatepassword: Boolean(formData.get("updatepassword")),
    newpassword: formData.get("newpassword") as string,
  };

  try {
    await fetchApi("POST", "/api/auth/update", data).then((response) => {
      if (response.ok) {
        console.log(response);
        result.ok = true;
        result.title = "업데이트 성공";
        result.message = "정보가 업데이트 되었습니다.";
        result.url = response.url;
      } else if (response.status === 500) {
        result.message = "비밀번호를 확인해주세요.";
      }
    });
  } catch (e) {
    throw new Error("userAuth_userInfo_infoUpdate_서버 에러 발생\n" + e);
  } finally {
    return result;
  }
};

export default handleUpdateInfo;
