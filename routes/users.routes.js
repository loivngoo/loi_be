import express from 'express';
import usersController from '../controllers/users.controller';
import { VerifyTokenCustomer } from '../middleware';
import GetListSupport from '../controllers/Support/GetListSupport';
import CreateSupport from '../controllers/Support/CreateSupport';
import CreateChat from '../controllers/Chat/CreateChat';
import GetListChat from '../controllers/Chat/GetListChat';
import DetailEvent from '../controllers/Event/DetailEvent';

const router = express.Router();

const userRoute = (app) => {
    router.post('/auth/login', usersController.Login);
    router.post('/auth/register', usersController.Register);
    router.post('/recharge', VerifyTokenCustomer, usersController.RechargeMethod);
    router.post('/AddBankCard', VerifyTokenCustomer, usersController.AddBankCard);
    router.post('/Withdraw', VerifyTokenCustomer, usersController.WithdrawMethod);

    router.put('/change-password', VerifyTokenCustomer, usersController.ChangePassword);
    router.put('/change-password-payment', VerifyTokenCustomer, usersController.ChangePasswordPayment);
    router.put('/CancelRechargeOrder', VerifyTokenCustomer, usersController.CancelRechargeOrder);

    router.get('/GetBankCard', VerifyTokenCustomer, usersController.GetBankCard);
    router.get('/GetRechargeInfo', VerifyTokenCustomer, usersController.GetRechargeInfo);
    router.get('/GetUserInfo', VerifyTokenCustomer, usersController.GetUserInfo);
    router.get('/GetWithdrawRecord', VerifyTokenCustomer, usersController.GetWithdrawRecord);
    router.get('/GetRechargeRecord', VerifyTokenCustomer, usersController.GetRechargeRecord);
    router.get('/GetSettings', VerifyTokenCustomer, usersController.GetSettings);
    router.get('/status', VerifyTokenCustomer, usersController.StatusToken);
    router.post('/Support/Create', CreateSupport);
    router.post('/Message/Create', CreateChat);
    router.post('/Message/List', GetListChat);
    // EVENT
    router.post('/Event/Detail', DetailEvent);
    router.get('/event/show', VerifyTokenCustomer, usersController.GetEventFromAgent);
    router.get('/product-type', VerifyTokenCustomer, usersController.GetListProductType);
    router.get('/event/products', VerifyTokenCustomer, usersController.GetProducsInType);
    router.post('/event/products/buy', VerifyTokenCustomer, usersController.BuyProduct);
    router.get('/event/cart/history', VerifyTokenCustomer, usersController.buyHistory)

    router.post('/event/end', VerifyTokenCustomer, usersController.endTimeSale);
    return app.use('/api/v1/users', router);
};

export default userRoute;