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

const CreateEvent = async(req, res, next) => {
  var percent = req.body.percent;
  var customer_id = req.body.customer_id;
  var created_at = new Date ();
  var expried_date = new Date(created_at);
  console.log(expried_date);
  var listProductType = req.body.product_type;
  expried_date.setMinutes(parseInt(created_at.getMinutes()) + parseInt(req.body.expried_date));
  if (!percent || !created_at ||  !listProductType || !expried_date) {
    return res.status(500).json({
      status: 500,
      message: "invalidate data"
    });
  }
  console.log(expried_date);
  var event = await eventSale.create({
    percent_sale: percent,
    created_at: created_at,
    listProductType: listProductType,
    expried_at: expried_date,
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
          ['expried_at', 'ASC']
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

module.exports = {
  Login,
  CreateEvent,
  ListEventOfAgent,
  ListUserOfAgent
};