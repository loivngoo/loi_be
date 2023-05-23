import userRoute from '../routes/users.routes';
import adminRoute from '../routes/admin.routes';
import agentRoute from '../routes/agent.routes';
const initWebRouter = (app) => {
    userRoute(app);
    adminRoute(app);
    agentRoute(app);
};

export default initWebRouter;
