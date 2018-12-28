import clicktagController from '../controllers/clicktag.controller';

export class clicktagRouting {
    private clicktagController: clicktagController = new clicktagController();

    routes(app): void {
        app.route('/clicktags').post(this.clicktagController.createClicktag);
    }
}