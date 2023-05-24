import express from 'express';
import usersController from '../controllers/users.controller';
import { VerifyToken } from '../middleware';
import GetListSupport from '../controllers/Support/GetListSupport';
import CreateSupport from '../controllers/Support/CreateSupport';
import CreateChat from '../controllers/Chat/CreateChat';
import GetListChat from '../controllers/Chat/GetListChat';
import DetailEvent from '../controllers/Event/DetailEvent';

const router = express.Router();

const userRoute = (app) => {
    router.post('/auth/login', usersController.Login);
    router.post('/auth/register', usersController.Register);
    router.post('/recharge', VerifyToken, usersController.RechargeMethod);
    router.post('/AddBankCard', VerifyToken, usersController.AddBankCard);
    router.post('/Withdraw', VerifyToken, usersController.WithdrawMethod);

    router.put('/change-password', VerifyToken, usersController.ChangePassword);
    router.put('/change-password-payment', VerifyToken, usersController.ChangePasswordPayment);
    router.put('/CancelRechargeOrder', VerifyToken, usersController.CancelRechargeOrder);

    router.get('/GetBankCard', VerifyToken, usersController.GetBankCard);
    router.get('/GetRechargeInfo', VerifyToken, usersController.GetRechargeInfo);
    router.get('/GetUserInfo', VerifyToken, usersController.GetUserInfo);
    router.get('/GetWithdrawRecord', VerifyToken, usersController.GetWithdrawRecord);
    router.get('/GetRechargeRecord', VerifyToken, usersController.GetRechargeRecord);
    router.get('/GetSettings', VerifyToken, usersController.GetSettings);
    router.get('/status', VerifyToken, usersController.StatusToken);
    router.post('/Support/Create', CreateSupport);
    router.post('/Message/Create', CreateChat);
    router.post('/Message/List', GetListChat);
    // EVENT
    router.post('/Event/Detail', DetailEvent);
    router.get('/event/show', VerifyToken, usersController.GetEventFromAgent);
    router.get('/product-type', VerifyToken, usersController.GetListProductType);
    router.get('/event/products', VerifyToken, usersController.GetProducsInType);
    router.post('/event/products/buy', VerifyToken, usersController.BuyProduct);
    router.get('/event/cart/history', VerifyToken, usersController.buyHistory)
    return app.use('/api/v1/users', router);
};

export default userRoute;