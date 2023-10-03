/**
 * Atoms
 */

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
