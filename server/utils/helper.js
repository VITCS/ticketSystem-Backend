const CryptoJS = require('crypto-js');

//To get random verification code to verify signup email/forgot password email
const getVerificationCode = async () => {     
    return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}

//Encrypting the password submitted by the user
const hashPassword = async (password) => {
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);
}

const decrypt = (val) => {
    const decrypted = CryptoJS.AES.decrypt(val, 'help-256-secure').toString(CryptoJS.enc.Latin1)
    return decrypted;
}

const encrypt = (val) => {
  const cryptobject = CryptoJS.AES.encrypt(val, "help-256-secure");
  const encrypted = {
    key: cryptobject.key + "", // don't send this
    iv: cryptobject.iv + "", // don't send this
    salt: cryptobject.salt + "", // don't send this
    ciphertext: cryptobject.ciphertext + "", // don't send this
    str: cryptobject + "" // send or store this
  };
  return encrypted.str;
};

const getDaysDifferences = async(fromDate,toDate) => {
  let firstDate = new Date(fromDate),
      secondDate = new Date(toDate),
      timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());

  let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  console.log('differentDays ', differentDays);

  return differentDays;
}


module.exports = {
    getVerificationCode,
    hashPassword,
    decrypt,
    encrypt,
    getDaysDifferences
}