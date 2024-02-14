import AWS from "aws-sdk";
import * as nodemailer from "nodemailer";
import admin from "firebase-admin";
import serviceAccount from "./google-service.json" assert { type: "json" };
import Razorpay from "razorpay";
import notifications from "../src/notifications/notifications.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import twilio from "twilio";
import { mailErrorHandler } from "../Error/BaseError.js";
import { CronJob } from "cron";
import { createModel } from "../src/models/projectModelsService.js";
import mongoose from "mongoose";

dotenv.config();

// Twilio Configuration

const client = new twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

const awsconfig = {
  region: process.env.region,
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
};
//Aws configuration
AWS.config.update(awsconfig);

const s3 = new AWS.S3();

//mail configuration
const transporter = nodemailer.createTransport({
  host: process.env.mail_host_name,
  port: process.env.mail_port,
  auth: {
    user: process.env.mail_username,
    pass: process.env.mail_password,
  },
});

//firebase configuration
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Razorpay configuration
let instance = new Razorpay({
  key_id: process.env.razorpay_key_id,
  key_secret: process.env.key_secret,
  // headers: {"X-Razorpay-Account": "acc_Ef7ArAsdU5t0XL"}
});

export const successResponse = ({
  req,
  res,
  data,
  code,
  msg,
  token,
  count,
}) => {
  return res.status(code ?? 200).json({ data: data ?? [], msg, token, count });
};

export const errorResponse = ({ req, res, error, code }) => {
  return res.status(code ?? 500).json({ error });
};

export const generateOTP = () => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }
  return otp;
};

export const sendOtpTwillo = async (mobile) => {
  const otp = await generateOTP();
  const message = `Your OTP is: ${otp}`;
  await client.messages.create({
    body: message,
    from: process.env.MOBILE_NUMBER,
    provideFeedback: true,
    to: mobile,
  });
  return otp;
};

/**
 * @param {*} oldImage old user profile url
 */
export const removeFile = (oldImage, foldername) => {
  const startIndex = oldImage.indexOf(foldername) + foldername.length;
  const value = oldImage.substring(startIndex);
  s3.deleteObject(
    {
      Bucket: process.env.bucket_name,
      Key: `${foldername}${value}`,
    },
    (err, data) => {
      if (err) {
        console.error("Error removing file:", err);
        return;
      } else {
        console.log("File removed successfully");
      }
    }
  );
};

/**
 *  * Upload user profile
 * @description Upload file with largest size on s3 bucket.
 * @param {*} filedata
 * @returns
 */
export const uploadFiles = async (filedata, foldername, oldImage) => {
  return new Promise((ress, rej) => {
    const uniqueFileName = `${foldername}/${Date.now()}_${filedata.name.replaceAll(
      " ",
      "_"
    )}`;

    var initiateParams = {
      Bucket: process.env.bucket_name,
      ACL: process.env.bucket_access,
      Key: `${uniqueFileName}`,
    };
    if (oldImage) {
      removeFile(oldImage, foldername);
    }
    s3.createMultipartUpload(initiateParams, (initErr, initRes) => {
      if (initErr) {
        console.error("Error initializing multipart upload:", initErr);
        return rej(initErr);
      }
      const uploadId = initRes.UploadId;
      const partSize = 5 * 1024 * 1024; // 5MB part size (adjust as needed)

      const numParts = Math.ceil(filedata.data.length / partSize);
      const uploadPromises = [];

      for (let i = 0; i < numParts; i++) {
        const start = i * partSize;
        const end = Math.min(start + partSize, filedata.data.length);
        const partBuffer = filedata.data.slice(start, end);

        const uploadParams = {
          Bucket: process.env.bucket_name,
          Key: uniqueFileName,
          PartNumber: i + 1, // Part numbers start from 1
          UploadId: uploadId,
          Body: partBuffer,
        };

        // Upload each part asynchronously
        uploadPromises.push(
          new Promise((resolve, reject) => {
            s3.uploadPart(uploadParams, (uploadErr, uploadData) => {
              if (uploadErr) {
                console.error("Error uploading part:", uploadErr);
                reject(uploadErr);
              } else {
                resolve({
                  ETag: JSON.parse(uploadData.ETag),
                  PartNumber: i + 1,
                });
              }
            });
          })
        );
      }

      // After all parts are uploaded, complete the multipart upload
      Promise.all(uploadPromises)
        .then((parts) => {
          const completeParams = {
            Bucket: process.env.bucket_name,
            Key: uniqueFileName,
            MultipartUpload: {
              Parts: parts,
            },
            UploadId: uploadId,
          };

          s3.completeMultipartUpload(
            completeParams,
            (completeErr, completeData) => {
              if (completeErr) {
                console.error(
                  "Error completing multipart upload:",
                  completeErr
                );
                rej(completeErr);
              } else {
                console.log("Done", completeData.Location);
                // res.json(completeData.Location);
                return ress(completeData.Location);
              }
            }
          );
        })
        .catch((error) => {
          console.error("Error uploading parts:", error);
          rej(error);
          // You might want to abort the multipart upload here if necessary
        });
    });
  });
};

/**
 * Send mail on payment and student course subscription.
 * @param {*} usermail
 * @param {*} mailSubject
 * @returns
 */
export const sendMail = (usermail, mailSubject, body) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
     <div> <center>${body ?? "Test text"}</center></div>
    </body>
    </html>`;
  const mailOptions = {
    from: process.env.sender_mail,
    to: usermail,
    subject: mailSubject,
    html: htmlTemplate,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new mailErrorHandler(error.message);
    } else {
      console.log("Email sent: ");
      return info;
    }
  });
};

/**
 * send single notification on mobile application
 * @param {*} fcmtoken
 * @param {*} title
 * @param {*} body
 * @param {*} data
 * @returns
 */
export const sendNotification = (fcmtoken, title, body, data) => {
  if (fcmtoken === undefined) return;
  return new Promise((succ, rej) => {
    const message = {
      data: { data: JSON.stringify(data) },
      notification: {
        title: title,
        body: body,
      },
      token: fcmtoken,
    };
    admin
      .messaging()
      .send(message)
      .then(async (response) => {
        const newNotification = new notifications({
          title: title,
          description: body,
          notificationType: title,
          userId: data.studentId,
        });
        console.log("Notification sent successfully:", response);
        await newNotification.save();
        return succ("Notification sent successfully");
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        return rej("Error sending notification");
      });
  });
};

/**
 * Send notification on multiples of users at same times
 * @param {*} fcmtoken fcm with user data.like [{studentId:{fcmToken:kjljlkjklk, _id: kjflskdjflskdjfkls}}]
 * @param {*} title
 * @param {*} body
 * @param {*} data
 * @returns
 */
export const sendMultiNotification = (fcmtoken, title, body, data) => {
  if (!fcmtoken.length) return;
  return new Promise((succ, rej) => {
    for (const user of fcmtoken) {
      const message = {
        data: { data: JSON.stringify(data) },
        notification: {
          title: title,
          body: body,
        },
        token: user.studentId.fcmToken,
      };
      admin
        .messaging()
        .send(message)
        .then(async (response) => {
          await notifications.create({
            title: title,
            description: body,
            notificationType: title,
            userId: user.studentId._id,
          });
          return succ("Notification sent successfully");
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
          return rej("Error sending notification");
        });
    }
  });
};

export const generateUUID = () => {
  let d = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

/**Razorpay order Generate */
export const orderGenerate = (amount) => {
  return new Promise((succ, rej) => {
    instance.orders
      .create({
        amount: amount * 100,
        currency: "INR",
        receipt: generateUUID(),
      })
      .then((data) => succ(data))
      .catch((error) => rej(error));
  });
};

/**
UPload files on s3 bucket
 */
export const smallFileOns3 = (file, folder) => {
  return new Promise((resolve, reject) => {
    var params = {
      Bucket: process.env.bucket_name,
      Body: file,
      ACL: process.env.bucket_access,
      Key: folder,
    };
    s3.upload(params, (error, s3Data) => {
      if (error) {
        console.log({ error });
        return reject(error);
      } else {
        console.log(s3Data.Location);
        return resolve(s3Data.Location);
      }
    });
  });
};

/**@description Data encryption */
export const encryptData = (data) => {
  const encJson = CryptoJS.AES.encrypt(
    data,
    process.env.JWT_PAYLOAD_SECRET_KEY
  ).toString();
  const encData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson)
  );
  return encData;
};

/**@description Data Decryption*/
export const decryptData = (data) => {
  const decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  const bytes = CryptoJS.AES.decrypt(
    decData,
    process.env.JWT_PAYLOAD_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes);
};

// const job = new CronJob(
//   "* * * * *",
//   async function () {
//     const allmodels = mongoose.modelNames();
//     if (allmodels) {
//       allmodels.forEach(async (ele) => {
//         await createModel({ modelsName: ele });
//       });
//     }
//   }, // onTick
//   null, // onComplete
//   true, // start
//   "Asia/Kolkata" // timeZone
// );
