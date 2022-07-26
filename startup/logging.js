//
const winston = require("winston");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./logs/uncaughtException.log" })
  );

  // winston.rejections.handle(
  //   new winston.transports.File({ filename: "rejections.log" })
  // );

  //khi ma promise bij reject thif process.on chup va quang throw ex. khi quang throw ex thi thang
  // winston handleException chup lay
  process.on("unhandledRejection", (ex) => {
    // console.log("we got unhandle rejection.....");
    // winston.error(ex.message, ex);
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "./logs/logfile.log" }));

  // process.on("uncaughtException", (ex) => {
  //   console.log("we got uncaughtException.....");
  //   winston.error(ex.message, ex);
  // });
};
