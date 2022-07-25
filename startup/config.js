module.exports = function () {
  // if (!config.get("jwtPrivateKey")) {
  //   console.error("jwtPrivateKey is not define");
  //   process.exit(1);
  // }
  if (!process.env.vidly_jwtPrivateKey) {
    throw new Error("jwtPrivateKey is not define");
  }
};
