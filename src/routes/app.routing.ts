import appController from '../controllers/app.controller';
import Upload from '../middlewares/upload.middleware';

export class appRouting {
    private appController: appController = new appController();
    private upload: Upload = new Upload();

    routes(app): void {
        app.route('/').post(this.upload.extractFile(), this.appController.uploadPackages);
    }
}