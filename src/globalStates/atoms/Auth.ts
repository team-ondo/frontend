import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "isLoggedin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const deviceIdState = atom({
  key: "deviceId",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
