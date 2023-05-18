import userRoute from '../routes/users.routes';
import adminRoute from '../routes/admin.routes';

const initWebRouter = (app) => {
    userRoute(app);
    adminRoute(app);
};

export default initWebRouter;
