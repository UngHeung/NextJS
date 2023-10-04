/**
 * Atoms
 */

import { PostProps } from "@/utils/interface/board/boardInterfaces";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { atom } from "recoil";

export const loginUser = atom({
  key: "loginUser",
  default: {
    userid: "",
    accountname: "",
    email: "",
    admin: false,
  } as UserSessionProps,
});

// export const postData = atom({
//   key: "postData",
//   default: {
//     _id: "",
//     writerid: "",
//     writer: "",
//     title: "",
//     content: "",
//   } as PostProps,
// });

export const modalData = atom({
  key: "modalData",
  default: {
    type: "",
    title: "",
    message: "",
    url: "",
    isShow: false,
  },
});
