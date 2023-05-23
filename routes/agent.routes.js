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

const userRoute = (app) => {
    router.post('/auth/login', adminController.Login);

    return app.use('/api/agent', router);
};

export default userRoute;
