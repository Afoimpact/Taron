class Helpers {
  static generateRandom = (len, type) => {
    let characters
    if (type === 'alphabets') {
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }
    if (type === 'numeric') {
      characters = '0123456789';
    }
    if (type === 'alphanumeric') {
      characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    const value = this.generate(len, characters);
    return value;
  };

  static generate = (length, characters) => {
    var result = '';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  static slugifyName = (fullName) => {
    return `${fullName.replace(/ /g, '')}${this.generateRandom(5, 'numeric')}`;
  };


  static isPasswordStrong = (password) => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const value =  strongRegex.test(password);
    return value
  }
}

module.exports = Helpers