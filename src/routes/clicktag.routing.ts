import clicktagController from '../controllers/clicktag.controller';

export class clicktagRouting {
    private clicktagController: clicktagController = new clicktagController();

    routes(app): void {
        app.route('/clicktags')
            .get(this.clicktagController.getAllClicktags)
            .post(this.clicktagController.createClicktag);

        app.route('/clicktags/:name')
            .get(this.clicktagController.getClicktagByName)
    }
}