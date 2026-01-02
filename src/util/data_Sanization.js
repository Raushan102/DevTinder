const validator = require("validator");

const validators = {
  Validate_firstName(data) {
    if (data.trim().length > 20) {
      throw new Error("first name should less the 20 letter");
    } else {
      return true;
    }
  },
  Validate_id() {
    return true;
  },
  Validate_lastName(data) {
    if (data.trim().length > 20) {
      throw new Error("last name shloud less the 20 letter");
    } else {
      return true;
    }
  },
  
  Validate_email(data) {
    if (!validator.isEmail(data)) {
      throw new Error("email is not currect");
    } else {
      return true;
    }
  },
  Validate_password(data) {
    if (validator.isStrongPassword(data)) {
      return true;
    } else {
      throw new Error(
        "please check password it should contain { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }"
      );
    }
  },
  Validate_gender(data) {
    if (["male", "female", "other"].includes(data)) {
      return true;
    } else {
      throw new Error(
        "please check gender it should be male , female and other"
      );
    }
  },
  Validate_age(data) {
    if (data >= 18 || data < 150) {
      return true;
    } else {
      throw new Error("age should be greater then 18 and less then 150");
    }
  },
  Validate_photoUrl(data) {
    if (validator.isURL(data)) {
      return true;
    } else {
      throw new Error("url is not currect");
    }
  },

  Validate_about(data) {
    if (data.length < 1000) {
      return true;
    } else {
      throw new Error("about section should be less then 1000 word's");
    }
  },

  Validate_skills(data) {
    if (data.length < 20) {
      const result = data.every((ele) => {
        return ele.length < 20;
      });
      if (result) {
        return true;
      } else {
        throw new Error("skills name should be less the 20 words");
      }
    } else {
      throw new Error("total skills should be less then 20");
    }
  },
};

function sanization(data) {
  try {
    Object.keys(data).forEach((ele) => {
      ele = ele.trim();
      const functionName = `Validate_${ele}`;

      if (validators[functionName]) {
        validators[functionName](data[ele]);
      } else {
        throw new Error(`invalid fields  ${ele}  please check field`);
      }
    });
  } catch (err) {
    throw err;
  }
}

module.exports = sanization;
