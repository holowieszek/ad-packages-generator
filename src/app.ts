import * as express from 'express';
import { appRouting } from './routes/app.routing';

class App {
    app: express.Application;
    private appRouting: appRouting = new appRouting();

    constructor() {
        this.app = express();
        this.config();
    }

    config(): void {
        this.appRouting.routes(this.app);
    }
}

export default new App().app;