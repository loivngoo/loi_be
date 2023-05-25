import Joi from 'joi';
import createError from 'http-errors';
import sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { CreateJwt } from '../middleware';
import { User } from '../models';
import { Bank } from '../models';
import { Recharge } from '../models';
import { Setting } from '../models';
import { Withdraw } from '../models';
import { eventSale } from '../models';
import { Product } from '../models';
import { Cart } from '../models';
import { on } from 'nodemon';
import { agentRecharge } from '../models';
import { agentWithdraw } from '../models';
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
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: data.phone },
            raw: true,
        });

        if (!user) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        const isMatch = await bcrypt.compare(data.password_v1, user.password_v1);

        if (!isMatch || user.role !== 2) {
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
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

const CreateEvent = async(req, res, next) => {
    var percent = req.body.percent;
    var customer_id = req.body.customer_id;
    var created_at = new Date();
    var expired_date = new Date(created_at);
    console.log(expired_date);
    var listProductType = req.body.product_type;
    expired_date.setMinutes(parseInt(created_at.getMinutes()) + parseInt(req.body.expired_date));
    if (!percent || !created_at || !listProductType || !expired_date) {
        return res.status(500).json({
            status: 500,
            message: "invalidate data"
        });
    }
    console.log(expired_date);
    var event = await eventSale.create({
        percent_sale: percent,
        created_at: created_at,
        listProductType: listProductType,
        expired_at: expired_date,
        agent_id: req.user.id,
        customer_id: customer_id
    });

    return res.status(200).json({
        status: 200,
        data: event
    });
}

const ListEventOfAgent = async(req, res, next) => {
    var eventSales = await eventSale.findAll({
        where: {
            agent_id: req.user.id,
        },
        attributes: ['*'],
        order: [
            ['expired_at', 'ASC']
        ],
        raw: true,
    });

    return res.status(200).json({
        status: 200,
        data: eventSales
    });
}

const ListUserOfAgent = async(req, res, next) => {
    var users = await User.findAll({
        where: {
            agent_id: req.user.id,
        },
        attributes: ['*'],
        raw: true,
    });

    return res.status(200).json({
        status: 200,
        data: users
    });
}

const AgentCreateCustomerAccount = async(req, res, nesxt) => {
    try {
        const ip_address = req.socket.remoteAddress;
        const { password_v1, ...data } = req.body;

        const schema = Joi.object({
            phone: Joi.string().min(10).max(20).required(),
            username: Joi.string().min(10).max(50).required(),
            name_store: Joi.string().min(5).max(150).required(),
            refferer: Joi.string().required(),
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
            where: { invite: data.refferer },
            attributes: ['phone'],
            raw: true,
        });

        if (user && user.phone) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản đã tồn tại trong hệ thống',
            });
        }

        if (!refferer) {
            return res.status(200).json({
                status: 2,
                message: 'Mã mời không tồn tại',
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

        await User.create({...data, password_v1: hashedPassword, invite, ip_address, agent_id: refferer.id });

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

const agentConfirmRecharge = async(req, res, next) => {
    try {
        const { order_code, status } = req.body;

        const rechargeInfo = await agentRecharge.findOne({
            where: {
                order_code: order_code,
            },
            attributes: ['phone', 'amount'],
            raw: true,
        });

        await agentRecharge.update({
            status: status,
        }, {
            where: {
                order_code: order_code,
            },
            raw: true,
        }, );

        if (status == 1 && rechargeInfo) {
            var phone = rechargeInfo.phone;
            var amount = rechargeInfo.amount;
            await Recharge.create({ phone, amount, order_code, status: 0 });
        }

        return res.status(200).json({
            status: 1,
            message: 'chuyển trạng thái thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const agentGetRecharge = async(req, res, next) => {
    try {
        const data = await agentRecharge.findAll({
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

const agentConfirmWithdraw = async(req, res, next) => {
    try {
        const { order_code, status } = req.body;

        const withdrawlInfo = await agentWithdraw.findOne({
            where: {
                order_code: order_code,
            },
            attributes: ['phone', 'amount', 'order_code'],
            raw: true,
        });

        if (withdrawlInfo) {
            const cardInfo = await Bank.findOne({
                where: {
                    phone: withdrawlInfo.phone,
                },
                attributes: ['full_name', 'name_bank', 'number_bank'],
                raw: true,
            });

            const user = User.findOne({
                where: {
                    phone: withdrawlInfo.phone
                },
                attributes: ['id', 'phone', 'money'],
                raw: true
            })

            if (user && user.money - Number(amount) < 0) {
                return res.status(200).json({
                    status: 2,
                    message: 'Số dư khả dụng không đủ',
                });
            }

            if (!cardInfo) {
                return res.status(200).json({
                    status: 2,
                    message: 'Hãy thực hiện liên kết ngân hàng trước',
                });
            }

            if (status == 1) {
                await agentWithdraw.update({
                    status: status,
                }, {
                    where: {
                        order_code: order_code,
                    },
                    raw: true,
                }, );

                var phone = withdrawlInfo.phone;
                var amount = withdrawlInfo.amount;
                await Withdraw.create({ phone, amount, order_code, status: 0, ...cardInfo });
            } else if (status == 2) {
                await agentWithdraw.update({
                    status: status,
                }, {
                    where: {
                        order_code: order_code,
                    },
                    raw: true,
                }, );

                await User.update({
                    money: user.money + withdrawlInfo.amount,
                }, {
                    where: {
                        id: user.id,
                    },
                    raw: true,
                }, );
            }

            return res.status(200).json({
                status: 1,
                message: 'Cập nhật đơn rút thành công',
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const agentGetWithdraw = async(req, res, next) => {
    try {
        const data = await agentWithdraw.findAll({
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
}
module.exports = {
    Login,
    CreateEvent,
    ListEventOfAgent,
    ListUserOfAgent,
    AgentCreateCustomerAccount,
    Status,
    agentConfirmRecharge,
    agentGetRecharge,
    agentConfirmWithdraw,
    agentGetWithdraw
};