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

        if (!isMatch) {
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

const Register = async(req, res, next) => {
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
};

const GetUserInfo = async(req, res, next) => {
    const phone = req.phone;
    const data = await User.findOne({
        where: {
            phone: phone,
        },
        attributes: ['phone', 'username', 'name_store', 'money', 'invite'],
        raw: true,
    });
    return res.status(200).json(data);
};

const GetSettings = async(req, res, next) => {
    const data = await Setting.findOne({
        where: {},
        attributes: ['link_support'],
        raw: true,
    });
    return res.status(200).json(data);
};

const StatusToken = async(req, res, next) => {
    return res.status(200).json({
        status: 1,
    });
};

const AddBankCard = async(req, res, next) => {
    try {
        const data = req.body;
        const phone = req.phone;

        if (!data.wallet_usdt) {
            const schema = Joi.object({
                full_name: Joi.string().max(100).required(),
                name_bank: Joi.string().max(100).required(),
                number_bank: Joi.string().max(100).required(),
                wallet_usdt: Joi.any().optional(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(200).json({
                    status: 2,
                    message: error.details[0].message,
                });
            }
        } else {
            const schema = Joi.object({
                wallet_usdt: Joi.string().max(100).required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(200).json({
                    status: 2,
                    message: error.details[0].message,
                });
            }
        }

        const bank = await Bank.findOne({
            where: { phone: phone },
            attributes: ['phone', 'number_bank', 'wallet_usdt'],
            raw: true,
        });

        if (bank && bank.number_bank) {
            if (!data.wallet_usdt) {
                return res.status(200).json({
                    status: 2,
                    message: 'Tài khoản này đã liên kết thẻ ngân hàng',
                });
            }
        }

        if (data.wallet_usdt && !bank) {
            await Bank.create({ phone, ...data });
        }

        if (data.wallet_usdt && (bank && bank.wallet_usdt)) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản này đã liên kết ví USDT',
            });
        }

        if (!data.wallet_usdt && !bank) {
            await Bank.create({ phone, ...data });
        }

        if (!data.wallet_usdt && (bank && bank.wallet_usdt)) {
            await Bank.update({...data, wallet_usdt: bank.wallet_usdt }, {
                where: {
                    phone: phone,
                },
            }, );
        }

        if (data.wallet_usdt && (bank && bank.number_bank)) {
            await Bank.update({ wallet_usdt: data.wallet_usdt }, {
                where: {
                    phone: phone,
                },
            }, );
        }

        return res.status(200).json({
            status: 1,
            message: 'Liên kết thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetBankCard = async(req, res, next) => {
    const phone = req.phone;
    const data = await Bank.findOne({
        where: {
            phone: phone,
        },
        attributes: ['full_name', 'name_bank', 'number_bank', 'wallet_usdt'],
        raw: true,
    });
    return res.status(200).json(data);
};

const ChangePassword = async(req, res, next) => {
    try {
        const phone = req.phone;
        const data = req.body;
        const schema = Joi.object({
            password_v1: Joi.string().required(),
            new_password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: phone },
            attributes: ['phone', 'password_v1'],
            raw: true,
        });

        const isMatch = await bcrypt.compare(data.password_v1, user.password_v1);

        if (!isMatch) {
            return res.status(200).json({
                status: 2,
                message: 'Mật khẩu hiện tại không chính xác',
            });
        }

        const hashedPassword = await bcrypt.hash(data.new_password, 10);

        await User.update({ password_v1: hashedPassword }, {
            where: {
                phone: phone,
            },
        }, );

        return res.status(200).json({
            status: 1,
            message: 'Đổi mật khẩu thành công',
        });
    } catch (error) {
        next(error);
    }
};

const ChangePasswordPayment = async(req, res, next) => {
    try {
        const phone = req.phone;
        const data = req.body;
        const schema = Joi.object({
            password_v2: Joi.string().required(),
            new_password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: phone },
            attributes: ['phone', 'password_v2'],
            raw: true,
        });

        const isMatch = await bcrypt.compare(data.password_v2, user.password_v2);

        if (!isMatch) {
            return res.status(200).json({
                status: 2,
                message: 'Mật khẩu hiện tại không chính xác',
            });
        }

        const hashedPassword = await bcrypt.hash(data.new_password, 10);

        await User.update({ password_v2: hashedPassword }, {
            where: {
                phone: phone,
            },
        }, );

        return res.status(200).json({
            status: 1,
            message: 'Đổi mật khẩu thành công',
        });
    } catch (error) {
        next(error);
    }
};

const GetRechargeInfo = async(req, res, next) => {
    try {
        const phone = req.phone;
        const RechargeOrder = await Recharge.findOne({
            where: { phone: phone, status: 0 },
            attributes: ['order_code', 'amount', 'status', 'createdAt'],
            raw: true,
        });

        if (!RechargeOrder) {
            return res.status(200).json({
                status: 2,
                message: 'Not Found',
            });
        }

        const InfoRecharge = await Setting.findOne({
            attributes: ['full_name', 'name_bank', 'number_bank', 'wallet_usdt', 'link_support'],
            raw: true,
        });

        return res.status(200).json({
            status: 1,
            data: {...RechargeOrder, ...InfoRecharge },
            message: 'Nhận thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const RechargeMethod = async(req, res, next) => {
    try {
        const phone = req.phone;
        const { amount } = req.body;
        const amounts = [50000, 200000, 500000, 1000000, 5000000, 10000000, 30000000, 500000000];

        const schema = Joi.object({
            amount: Joi.number()
                .min(50000)
                .max(500000000)
                .required()
                .messages({
                    'number.empty': 'Vui lòng nhập số tiền nạp',
                    'number.min': 'Số tiền nạp tối thiểu là: ' + amounts[0],
                    'number.max': 'Số tiền nạp tối đa là: ' + amounts[amounts.length - 1],
                }),
        });

        const { error } = schema.validate({ amount });

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const RechargeOrder = await agentRecharge.findAll({
            where: { phone: phone, status: 0 },
            attributes: ['id'],
            raw: true,
        });

        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const RechargeOrderToday = await agentRecharge.findAll({
            where: {
                phone: phone,
                createdAt: {
                    [Op.between]: [
                        sequelize.literal(`"${startDate.toISOString()}"`),
                        sequelize.literal(`"${endDate.toISOString()}"`),
                    ],
                },
            },
            attributes: ['id'],
            raw: true,
        });

        if (RechargeOrderToday.length > 10) {
            return res.status(200).json({
                status: 2,
                message: 'Mỗi ngày bạn chỉ có thể tạo tối đa 10 đơn nạp',
            });
        }

        if (RechargeOrder.length > 0) {
            return res.status(200).json({
                status: 2,
                message: 'Có đơn nạp chưa hoàn tất giao dịch',
            });
        }

        let order_code = timerJoin() + randomStr(11).toUpperCase();

        await agentRecharge.create({ phone, amount, order_code, status: 0 });

        return res.status(200).json({
            status: 1,
            message: 'Tạo đơn nạp thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const WithdrawMethod = async(req, res, next) => {
    try {
        const phone = req.phone;
        const { amount } = req.body;
        const amounts = [50000, 200000, 500000, 1000000, 5000000, 10000000, 30000000, 500000000];

        const schema = Joi.object({
            amount: Joi.number()
                .min(50000)
                .max(500000000)
                .required()
                .messages({
                    'number.empty': 'Vui lòng nhập số tiền rút',
                    'number.min': 'Số tiền rút tối thiểu là: ' + amounts[0],
                    'number.max': 'Số tiền rút tối đa là: ' + amounts[amounts.length - 1],
                }),
        });

        const { error } = schema.validate({ amount });

        if (error) {
            return res.status(200).json({
                status: 2,
                message: error.details[0].message,
            });
        }

        const user = await User.findOne({
            where: { phone: phone },
            attributes: ['phone', 'money'],
            raw: true,
        });

        const WithdrawOrder = await Withdraw.findAll({
            where: { phone: phone, status: 0 },
            attributes: ['id'],
            raw: true,
        });

        const cardInfo = await Bank.findOne({
            where: {
                phone: phone,
            },
            attributes: ['full_name', 'name_bank', 'number_bank'],
            raw: true,
        });

        if (WithdrawOrder.length > 0) {
            return res.status(200).json({
                status: 2,
                message: 'Có đơn rút chưa hoàn tất giao dịch',
            });
        }

        if (user.money - Number(amount) < 0) {
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

        let order_code = timerJoin() + randomStr(11).toUpperCase();

        await Withdraw.create({ phone, amount, order_code, status: 0, ...cardInfo });

        return res.status(200).json({
            status: 1,
            message: 'Tạo đơn rút thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetWithdrawRecord = async(req, res, next) => {
    const phone = req.phone;
    const data = await Withdraw.findAll({
        where: {
            phone: phone,
        },
        attributes: ['order_code', 'amount', 'status', 'createdAt'],
        order: [
            ['id', 'DESC']
        ],
        raw: true,
    });
    return res.status(200).json(data);
};

const GetRechargeRecord = async(req, res, next) => {
    const phone = req.phone;
    const data = await Recharge.findAll({
        where: {
            phone: phone,
        },
        attributes: ['order_code', 'amount', 'status', 'createdAt'],
        order: [
            ['id', 'DESC']
        ],
        raw: true,
    });
    return res.status(200).json(data);
};

const CancelRechargeOrder = async(req, res, next) => {
    try {
        const phone = req.phone;

        const RechargeOrder = await Recharge.findOne({
            where: { phone: phone, status: 0 },
            attributes: ['id'],
            raw: true,
        });

        if (!RechargeOrder) {
            return res.status(200).json({
                status: 2,
                message: 'Đơn nạp không tồn tại',
            });
        }

        await Recharge.update({ status: 2 }, {
            where: {
                id: RechargeOrder.id,
            },
        }, );

        return res.status(200).json({
            status: 1,
            message: 'Hủy đơn nạp thành công',
        });
    } catch (error) {
        console.log(error);
    }
};

const GetEventFromAgent = async(req, res, next) => {
    try {
        console.log(req.user.agent_id);
        var eventSales = await eventSale.findAll({
            where: {
                agent_id: req.user.agent_id,
                expired_at: {
                    [Op.gt]: new Date(),
                },
                created_at: {
                    [Op.lte]: new Date(),
                },
                customer_id: req.user.id
            },
            attributes: ['*'],
            order: [
                ['expired_at', 'ASC']
            ],
            raw: true,
        });

        eventSales.forEach(event => {
            event.product_type = event.product_type.split(",");
        });
        return res.status(200).json({
            status: 200,
            message: eventSales,
            // products: products
        });
    } catch (error) {
        console.log(error);
    }
}

const GetListProductType = async(req, res, next) => {
    var eventSales = await eventSale.findAll({
        where: {
            agent_id: req.user.agent_id,
            expired_at: {
                [Op.gt]: new Date(),
            },
            created_at: {
                [Op.lte]: new Date(),
            },
            customer_id: req.user.id
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

const GetProducsInType = async(req, res, next) => {
    var type = req.query.type;
    var eventSales = await eventSale.findOne({
        where: {
            agent_id: req.user.agent_id,
            expired_at: {
                [Op.gt]: new Date(),
            },
            created_at: {
                [Op.lte]: new Date(),
            },
            listProductType: type,
            customer_id: req.user.id
        },
        attributes: ['*'],
        order: [
            ['expired_at', 'ASC']
        ],
        raw: true,
    });

    var products = await Product.findAll({
        where: {
            product_type: type,
        },
        attributes: ['*'],
        raw: true,
    });

    if (eventSales) {
        products.forEach(prod => {
            prod.sale_price = (prod.full_price * eventSales.percent_sale) / 100;
            prod.percent_sale = eventSales.percent_sale;
        });
    } else {
        products.forEach(prod => {
            prod.sale_price = prod.full_price;
            prod.percent_sale = 0;
        });
    }
    return res.status(200).json({
        status: 200,
        products: products,
        event_sale: eventSales
    });
}

const BuyProduct = async(req, res, next) => {
    var product_id = req.body.product_id;
    var product_type = req.body.product_type;
    var event_id = req.body.event_id;
    var money = req.user.money;
    var agent_id = req.user.agent_id;
    var eventSales = await eventSale.findOne({
        where: {
            agent_id: req.user.agent_id,
            expired_at: {
                [Op.gt]: new Date(),
            },
            created_at: {
                [Op.lte]: new Date(),
            },
            id: event_id,
            listProductType: product_type
        },
        attributes: ['*'],
        order: [
            ['expired_at', 'ASC']
        ],
        raw: true,
    });

    if (!eventSales) {
        var sale_price = product.full_price; //(product.full_price * eventSales.percent_sale) / 100;
    } else {
        var sale_price = (product.full_price * eventSales.percent_sale) / 100;
    }

    var product = await Product.findOne({
        where: {
            id: product_id,
            product_type: product_type
        },
        attributes: ['*'],
        raw: true
    });

    if (!product) {
        return res.status(200).json({
            status: 200,
            message: 'Không tồn tại sản phẩm này'
        });
    }
    let userUpdateMoney = await User.update({ money: (req.user.money) - sale_price }, {
        where: {
            id: req.user.id,
        },
        raw: true,
    }, )
    if (userUpdateMoney) {
        var cartAdd = await Cart.create({
            product_id: product.id,
            product_type: product.product_type,
            full_price: product.full_price,
            sale_price: sale_price,
            agent_id: agent_id,
            event_id: (eventSales) ? eventSales.id : null,
            is_closed: null,
            created_at: new Date(),
            customer_id: req.user.id
        });
    }

    return res.status(200).json({
        status: 200,
        message: "Mua thành công"
    });
}

const buyHistory = async(req, res, next) => {
    console.log(req.user.id);
    var carts = await Cart.findAll({
        where: {
            customer_id: req.user.id
        },
        include: [{
                model: Product,
                required: true,
                on: {
                    col1: sequelize.where(sequelize.col("Product.id"), "=", sequelize.col("Cart.product_id")),
                },
                right: true // has no effect, will create an inner join
            },
            {
                model: User,
                required: true,
                on: {
                    col1: sequelize.where(sequelize.col("User.id"), "=", sequelize.col("Cart.agent_id")),
                },
                right: true // has no effect, will create an inner join
            }
        ]
    });
    carts.forEach(product => {
        product.Product.agent_id = product.User.id;
        product.Product.agent_name = product.User.username;
        product.Product.invite = product.User.invite
    });
    return res.status(200).json({
        status: 200,
        data: carts
    });
};


module.exports = {
    Register,
    Login,
    GetUserInfo,
    GetSettings,
    StatusToken,
    ChangePassword,
    ChangePasswordPayment,
    GetRechargeInfo,
    RechargeMethod,
    WithdrawMethod,
    GetWithdrawRecord,
    GetRechargeRecord,
    CancelRechargeOrder,
    AddBankCard,
    GetBankCard,
    GetEventFromAgent,
    GetListProductType,
    GetProducsInType,
    BuyProduct,
    buyHistory,
};