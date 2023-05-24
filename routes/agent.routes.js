import express from 'express';
import agentController from '../controllers/agent.controller';
import { VerifyTokenAgent } from '../middleware';
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
    router.post('/event/create', VerifyTokenAgent, agentController.CreateEvent);
    router.get('/event/list', VerifyTokenAgent, agentController.ListEventOfAgent);
    router.get('/status', VerifyTokenAgent, agentController.Status);
    router.post('/auth/register-customer', agentController.AgentCreateCustomerAccount);
    router.get('/users/list', VerifyTokenAgent, agentController.ListUserOfAgent);

    router.get('/users/list', VerifyTokenAgent, agentController.ListUserOfAgent);
    router.put('/agent/ConfirmRecharge', VerifyTokenAgent, agentController.agentConfirmRecharge);
    router.get('/agent/GetRecharge', VerifyTokenAgent, agentController.agentGetRecharge);
    return app.use('/api/v1/agent', router);
};

export default agentRoute;