import appController from '../controllers/app.controller';

export class appRouting {
    private appController: appController = new appController();
    
    routes(app): void {
        app.route('/').get(this.appController.uploadPackages);
    }
}