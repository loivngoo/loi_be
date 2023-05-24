import express from 'express';
import agentController from '../controllers/agent.controller';
import { VerifyToken } from '../middleware';
import GetListSupport from '../controllers/Support/GetListSupport';
import EditSupport from '../controllers/Support/EditSupport';
import JoinConversation from '../controllers/Conversation/JoinConversation';
import GetListChat from '../controllers/Chat/GetListChat';
import CreateChat from '../controllers/Chat/CreateChat';
import CreateChatAmin from '../controllers/Chat/CreateChatAmin';
import CreateEvent from '../controllers/Event/CreateEvent';

const router = express.Router();

const agentRoute = (app) => {
    router.post('/auth/login', agentController.Login);
    router.post('/event/create', VerifyToken, agentController.CreateEvent);
    router.get('/event/list', VerifyToken, agentController.ListEventOfAgent);
    router.get('/status', VerifyToken, agentController.Status);
    router.post('/auth/register-customer', agentController.AgentCreateCustomerAccount);
    router.get('/users/list', VerifyToken, agentController.ListUserOfAgent);

    router.get('/users/list', VerifyToken, agentController.ListUserOfAgent);
    router.put('/agent/ConfirmRecharge', VerifyTokenAdmin, adminController.agentConfirmRecharge);

    return app.use('/api/v1/agent', router);
};

export default agentRoute;