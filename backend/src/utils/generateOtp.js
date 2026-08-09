// export const generateOtp = () => {
//   return Math.floor(100000 + Math.random() * 999999);
// };

import { randomInt, createHash } from "crypto";

export const generateOtp = () => {
  return randomInt(100000, 1000000).toString();
};

export const hashOtp = (otp) => {
  return createHash("sha256").update(otp).digest("hex");
};
