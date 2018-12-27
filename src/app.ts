import * as express from 'express';
import * as mongoose from 'mongoose';

import { appRouting } from './routes/app.routing';

import { Request, Response, NextFunction } from 'express';

class App {
    app: express.Application;
    private mongoUrl: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    private appRouting: appRouting = new appRouting();

    constructor() {
        this.app = express();
        this.mongoSetup();
        this.config();
    }

    config(): void {
        this.appRouting.routes(this.app);
    }

    mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;

        mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
            .then(result => console.log('DB Connected!'))
            .catch(error => console.error(error));
    }

    cors(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET, POST');
                return res.status(200).json({});
            }

            next();
        });
    }
}

export default new App().app;