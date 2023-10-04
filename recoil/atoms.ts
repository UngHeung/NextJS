/**
 * Atoms
 */

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { PostProps } from "@/utils/interface/board/boardInterfaces";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";

const { persistAtom } = recoilPersist();

export const loginUser = atom({
  key: "loginUser",
  default: {
    userid: "",
    accountname: "",
    email: "",
    admin: false,
  } as UserSessionProps,
  effects_UNSTABLE: [persistAtom],
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
  effects_UNSTABLE: [persistAtom],
});
