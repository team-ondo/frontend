import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "isLoggedin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
