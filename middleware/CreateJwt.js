import jwt from 'jsonwebtoken';
require('dotenv').config();

const CreateJwt = (data, time = '3d') => {
    let payload = { data };
    let key = process.env.JWT_SECRET;
    let token = '';
    try {
        token = jwt.sign(payload, key, { expiresIn: time });
    } catch (error) {
        console.log(error);
    }
    return token;
};

export default CreateJwt;
