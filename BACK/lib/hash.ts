import crypto from "crypto";

export async function verify(password: string, hash: string) {
  var [hashed, salt] = hash.split(".");

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      Buffer.from(salt, "base64"),
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        /* istanbul ignore next */
        if (err) {
          reject(err);
        }
        if (
          !crypto.timingSafeEqual(
            Buffer.from(hashed, "base64"),
            Buffer.from(hashedPassword)
          )
        ) {
          resolve(false);
        }
        return resolve(true);
      }
    );
  });
}

export async function hash(password: string): Promise<string> {
  var salt = crypto.randomBytes(16);
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        /* istanbul ignore next */
        if (err) {
          reject(err);
        }
        resolve(
          hashedPassword.toString("base64") + "." + salt.toString("base64")
        );
      }
    );
  });
}