import express from 'express';
import adminController from '../controllers/admin.controller';
import { VerifyTokenAdmin } from '../middleware';
import GetListSupport from '../controllers/Support/GetListSupport';
import EditSupport from '../controllers/Support/EditSupport';
import JoinConversation from '../controllers/Conversation/JoinConversation';
import GetListChat from '../controllers/Chat/GetListChat';
import CreateChat from '../controllers/Chat/CreateChat';
import CreateChatAmin from '../controllers/Chat/CreateChatAmin';
import CreateEvent from '../controllers/Event/CreateEvent';

const router = express.Router();

const adminRoute = (app) => {
    router.post('/auth/login', adminController.Login);

    router.put('/LockAccount', VerifyTokenAdmin, adminController.LockAccount);
    router.put('/EditUser', VerifyTokenAdmin, adminController.EditUser);
    router.put('/EditBankCard', VerifyTokenAdmin, adminController.EditBankCard);
    router.put('/ConfirmRecharge', VerifyTokenAdmin, adminController.ConfirmRecharge);
    router.put('/ConfirmWithdrawal', VerifyTokenAdmin, adminController.ConfirmWithdrawal);
    router.put('/EditPaymentMethod', VerifyTokenAdmin, adminController.EditPaymentMethod);
    router.put('/SettingsConfig', VerifyTokenAdmin, adminController.SettingsConfig);
    router.put('/EditStatusPay', VerifyTokenAdmin, adminController.EditStatusPay);

    router.get('/status', VerifyTokenAdmin, adminController.Status);
    router.get('/ListUser', VerifyTokenAdmin, adminController.ListUser);
    router.get('/GetRecharge', VerifyTokenAdmin, adminController.GetRecharge);
    router.get('/GetWithdrawl', VerifyTokenAdmin, adminController.GetWithdrawl);
    router.get('/GetSettings', VerifyTokenAdmin, adminController.GetSettings);
    router.get('/PaymentMethod', VerifyTokenAdmin, adminController.PaymentMethod);
    router.post('/Statistical', VerifyTokenAdmin, adminController.Statistical);
    router.get('/GetUserDetail/:id', VerifyTokenAdmin, adminController.GetUserDetail);

    router.get('/Support/List', VerifyTokenAdmin, GetListSupport);
    router.post('/Support/Edit', VerifyTokenAdmin, EditSupport);
    router.post('/Conversation/Join', VerifyTokenAdmin, JoinConversation);
    router.post('/Message/List', VerifyTokenAdmin, GetListChat);
    router.post('/Message/Create', VerifyTokenAdmin, CreateChatAmin);

    // EVENT
    router.post('/Event/Create', VerifyTokenAdmin, CreateEvent);

    return app.use('/api/admin', router);
};

export default adminRoute;
