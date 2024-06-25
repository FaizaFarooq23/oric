const bcrypt = require('bcrypt');

const generatePassword = async () => {
    const password = "admin1122"
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
}

generatePassword();

