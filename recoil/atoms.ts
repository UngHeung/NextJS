/**
 * Atoms
 */

import { atom } from "recoil";

export const loginUser = atom({
  key: "loginUser",
  default: {
    userid: "",
    accountname: "",
    email: "",
  },
});
