import userRoute from '../routes/users.routes';
import adminRoute from '../routes/admin.routes';
import agentRoute from '../routes/agent.routes';
import uploadRoute from '../routes/upload.routes';
const initWebRouter = (app) => {
    userRoute(app);
    adminRoute(app);
    agentRoute(app);
    uploadRoute(app);
};

export default initWebRouter;
