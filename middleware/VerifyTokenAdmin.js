import { User } from '../models';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const VerifyTokenAdmin = async (req, res, next) => {
    let key = process.env.JWT_SECRET;
    let authorization = req.headers.authorization;
    if (authorization && authorization.split(' ')[1]) {
        let token = authorization.split(' ')[1];
        jwt.verify(token, key, async (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    status: 4,
                    message: 'Phiên đăng nhập hết hạn',
                });
            }
            let phone = decoded.data;
            let user = await User.findOne({
                where: {
                    phone: phone,
                },
                attributes: ['phone', 'role', 'id', 'invite'],
                raw: true,
            });
            if (!user || user?.role != 1) {
                return res.status(200).json({
                    status: 4,
                    message: 'Phiên đăng nhập hết hạn',
                });
            }
            req.user = user;
            req.phone = phone;
            next();
        });
    } else {
        return res.status(200).json({
            status: 4,
            message: 'Phiên đăng nhập hết hạn',
        });
    }
};

export default VerifyTokenAdmin;
