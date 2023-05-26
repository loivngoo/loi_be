import Joi from 'joi';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { CreateJwt } from '../middleware';
import { User } from '../models';
import { Bank } from '../models';
import { Recharge } from '../models';
import { Setting } from '../models';
import { Withdraw } from '../models';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

const isPhoneVn = (params) => {
    let pattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    return pattern.test(params);
};

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

function timerJoin(params = '', split = '') {
    // params là truyền vào timespam còn split là truyền vào ngăn cách(-, :)
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    return years + split + months + split + days;
}

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Login = async(req, res, next) => {
    try {
        const data = req.body;

        const schema = Joi.object({
            phone: Joi.string().required(),
            password_v1: Joi.string().required(),
        });

        const { error } = schema.validate(data);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: data.phone },
            attributes: ['phone', 'password_v1', 'role'],
            raw: true,
        });

        console.log(user);

        if (!user) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        const isMatch = await bcrypt.compare(data.password_v1, user.password_v1);

        if (!isMatch || user.role !== 1) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        let token = CreateJwt(user.phone);

        return res.status(200).json({
            status: 1,
            token: token,
            message: 'Đăng nhập thành công',
            user: user,
        });
    } catch (error) {
        console.log(error);
    }
};

const Status = async(req, res, next) => {
    try {
        return res.status(200).json({
            status: 1,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const ListUser = async(req, res, next) => {
    try {
        const data = await User.findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ],
        });
        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetRecharge = async(req, res, next) => {
    try {
        const data = await Recharge.findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ]
        });
        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetWithdrawl = async(req, res, next) => {
    try {
        const data = await Withdraw.findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ]
        });

        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetSettings = async(req, res, next) => {
    try {
        const data = await Setting.findOne({ raw: true });

        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const PaymentMethod = async(req, res, next) => {
    try {
        const data = await RechargeInfo.findAll({ raw: true });

        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetUserDetail = async(req, res, next) => {
    try {
        const id = req.params.id;
        const userInfo = await User.findOne({
            where: {
                id: id,
            },
            attributes: ['phone', 'money', 'username', 'role', 'ip_address', 'status', 'createdAt'],
            raw: true,
        });

        if (!userInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Nhận thành bại',
            });
        }

        const bankcard = await Bank.findOne({
            where: {
                phone: userInfo.phone,
            },
            attributes: ['name_bank', 'full_name', 'number_bank', 'wallet_usdt'],
            raw: true,
        });

        const TotalRecharge = await Recharge.findAll({
            where: {
                phone: userInfo.phone,
                status: 1,
            },
            attributes: ['amount'],
            raw: true,
        });

        const ResultRecharge = TotalRecharge.reduce((a, b) => {
            return a + b.amount;
        }, 0);

        const TotalWithdrawl = await Withdraw.findAll({
            where: {
                phone: userInfo.phone,
                status: 1,
            },
            attributes: ['amount'],
            raw: true,
        });

        const ResultWithdrawl = TotalWithdrawl.reduce((a, b) => {
            return a + b.amount;
        }, 0);

        const data = {...userInfo, ...bankcard, ResultRecharge, ResultWithdrawl };

        return res.status(200).json({
            status: 1,
            data: data,
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const Statistical = async(req, res, next) => {
    try {
        const { startDate, endDate } = req.body;

        const date = new Date();
        const years = formateT(date.getFullYear());
        const months = formateT(date.getMonth() + 1);
        const days = formateT(date.getDate());

        const users = await User.count({
            attributes: ['phone'],
            raw: true,
        }); // Đếm tất cả user

        const user = await User.count({
            attributes: ['phone'],
            where: {
                createdAt: {
                    [Op.gte]: `${years}-${months}-${days} 00:00:00`,
                    [Op.lt]: `${years}-${months}-${days} 23:59:00`,
                },
            },
            raw: true,
        }); // Đếm user mới đăng kí trong ngày

        const totalRecharge = await Recharge.sum('amount', {
            where: {
                status: 1,
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            raw: true,
        }); // Tổng nạp

        const totalWithdrawl = await Withdraw.sum('amount', {
            where: {
                status: 1,
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            raw: true,
        }); // Tổng rút

        const totalDetail = await FinancialDetails.sum('amount', {
            where: {
                type: 4,
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            raw: true,
        }); // Tổng cộng tiền

        return res.status(200).json({
            status: 1,
            data: {
                TotalUser: users,
                TotalUserNew: user,
                TotalRecharge: totalRecharge,
                TotalWithdrawl: totalWithdrawl,
                TotalPlus: totalDetail,
            },
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const LockAccount = async(req, res, next) => {
    try {
        const { id, status } = req.body;

        const userInfo = await User.findOne({
            where: {
                id: id,
            },
            attributes: ['phone'],
            raw: true,
        });

        if (!userInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Nhận thành bại',
            });
        }

        await User.update({ id, status }, {
            where: {
                id: id,
            },
            raw: true,
        }, );

        return res.status(200).json({
            status: 1,
            message: 'Khóa tài khoản thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const EditUser = async(req, res, next) => {
    try {
        const { id, money, type, password } = req.body;

        const userInfo = await User.findOne({
            where: {
                id: id,
            },
            attributes: ['phone', 'money'],
            raw: true,
        });

        if (!userInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Nhận thành bại',
            });
        }

        if (type === 'plus') {
            await User.update({ money: userInfo.money + Number(money) }, {
                where: {
                    id: id,
                },
                raw: true,
            }, );

            return res.status(200).json({
                status: 1,
                message: 'Cộng tiền thành công',
            });
        }

        if (type === 'minus') {
            await User.update({ money: userInfo.money - Number(money) }, {
                where: {
                    id: id,
                },
                raw: true,
            }, );

            return res.status(200).json({
                status: 1,
                message: 'Trừ tiền thành công',
            });
        }

        if (type === 'change-password') {
            console.log(password);
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.update({ password_v1: hashedPassword }, {
                where: {
                    id: id,
                },
                raw: true,
            }, );
            return res.status(200).json({
                status: 1,
                message: 'Đổi mật khẩu thành công',
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const EditBankCard = async(req, res, next) => {
    try {
        const { userId, NameBank, NameUser, Stk, walletUsdt } = req.body;

        const userInfo = await User.findOne({
            where: {
                id: userId,
            },
            attributes: ['phone'],
            raw: true,
        });

        if (!userInfo) {
            return res.status(200).json({
                status: 2,
                message: 'Nhận thành bại',
            });
        }

        await Bank.update({
            name_bank: NameBank,
            full_name: NameUser,
            number_bank: Stk,
            wallet_usdt: walletUsdt,
        }, {
            where: {
                phone: userInfo.phone,
            },
            raw: true,
        }, );

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật ngân hàng thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const ConfirmRecharge = async(req, res, next) => {
    try {
        const { order_code, status } = req.body;

        const rechargeInfo = await Recharge.findOne({
            where: {
                order_code: order_code,
            },
            attributes: ['phone', 'amount'],
            raw: true,
        });

        await Recharge.update({
            status: status,
        }, {
            where: {
                order_code: order_code,
            },
            raw: true,
        }, );

        const userInfo = await User.findOne({
            where: {
                phone: rechargeInfo.phone,
            },
            attributes: ['phone', 'money'],
            raw: true,
        });

        if (status == 1) {
            await User.update({
                money: userInfo.money + rechargeInfo.amount,
            }, {
                where: {
                    phone: rechargeInfo.phone,
                },
                raw: true,
            }, );
        }

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật đơn nạp thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const ConfirmWithdrawal = async(req, res, next) => {
    try {
        const { order_code, status } = req.body;

        const withdrawlInfo = await Withdraw.findOne({
            where: {
                order_code: order_code,
            },
            attributes: ['phone', 'amount'],
            raw: true,
        });

        await Withdraw.update({
            status: status,
        }, {
            where: {
                order_code: order_code,
            },
            raw: true,
        }, );

        const userInfo = await User.findOne({
            where: {
                phone: withdrawlInfo.phone,
            },
            attributes: ['phone', 'money'],
            raw: true,
        });

        if (status == 2) {
            await User.update({
                money: userInfo.money + withdrawlInfo.amount,
            }, {
                where: {
                    phone: withdrawlInfo.phone,
                },
                raw: true,
            }, );
        }
        return res.status(200).json({
            status: 1,
            message: 'Cập nhật đơn rút thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const EditPaymentMethod = async(req, res, next) => {
    try {
        const { id, NameMethod, NumberMethod, NameUser, TypeMethod, StatusMethod } = req.body;

        await RechargeInfo.update({
            name_info: NameMethod,
            detail_info: NumberMethod,
            name_account: NameUser,
            type: TypeMethod,
            status: StatusMethod,
        }, {
            where: {
                id: id,
            },
            raw: true,
        }, );

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật phương thức thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const SettingsConfig = async(req, res, next) => {
    try {
        const data = req.body;

        await Setting.update(data, {
            where: {},
            raw: true,
        });

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật phương thức thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const EditStatusPay = async(req, res, next) => {
    try {
        const { phone, status_pay } = req.body;

        await User.update({
            status_pay: status_pay,
        }, {
            where: {
                phone: phone,
            },
            raw: true,
        }, );

        return res.status(200).json({
            status: 1,
            message: 'Cập nhật tài khoản thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const adminCreateAgentAccount = async(req, res, nesxt) => {
    try {
        const ip_address = req.socket.remoteAddress;
        const { password_v1, ...data } = req.body;

        const schema = Joi.object({
            phone: Joi.string().min(10).max(20).required(),
            username: Joi.string().min(10).max(50).required(),
            name_store: Joi.string().min(5).max(150).required(),
            invite: Joi.string().required(),
            password_v1: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: data.phone },
            attributes: ['phone'],
            raw: true,
        });

        const refferer = await User.findOne({
            where: { invite: data.invite },
            attributes: ['phone'],
            raw: true,
        });

        if (user && user.phone) {
            return res.status(200).json({
                status: 2,
                message: 'User da ton tai',
            });
        }

        if (refferer) {
            return res.status(200).json({
                status: 2,
                message: 'Ma moi da ton tai',
            });
        }

        let result = '';
        let result2 = '';
        let result3 = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let characters2 = '0123456789';
        let charactersLength = characters.length;
        let charactersLength2 = characters2.length;
        for (let i = 0; i < 2; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        for (let i = 0; i < 2; i++) {
            result2 += characters2.charAt(Math.floor(Math.random() * charactersLength2));
        }

        for (let i = 0; i < 1; i++) {
            result3 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const invite = result + result2 + result3;

        const hashedPassword = await bcrypt.hash(password_v1, 10);

        await User.create({...data, password_v1: hashedPassword, invite, ip_address, agent_id: null, role_id: 2 });

        let token = CreateJwt(data.phone);

        return res.status(200).json({
            status: 1,
            token: token,
            message: 'Đăng ký thành công',
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    Login,
    Status,
    ListUser,
    GetRecharge,
    GetWithdrawl,
    GetSettings,
    PaymentMethod,
    GetUserDetail,
    Statistical,
    LockAccount,
    EditUser,
    EditBankCard,
    ConfirmRecharge,
    ConfirmWithdrawal,
    EditPaymentMethod,
    SettingsConfig,
    EditStatusPay,
    adminCreateAgentAccount
};