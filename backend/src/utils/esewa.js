import crypto from "crypto";

export const generateEsewaSignature = ({ total_amount, transaction_uuid, product_code }) => {
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  return crypto.createHmac("sha256", process.env.ESEWA_SECRET_KEY).update(message).digest("base64");
};
