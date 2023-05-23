import express from 'express';
import agentController from '../controllers/agent.controller';
import { VerifyTokenAdmin } from '../middleware';
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
    router.post('/event/create', VerifyTokenAdmin, agentController.CreateEvent);
    router.get('/event/list', VerifyTokenAdmin, agentController.ListEventOfAgent);
    router.get('/users/list', VerifyTokenAdmin, agentController.ListUserOfAgent);
    return app.use('/api/v1/agent', router);
};

export default agentRoute;
