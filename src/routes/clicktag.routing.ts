import clicktagController from '../controllers/clicktag.controller';

export class clicktagRouting {
    private clicktagController: clicktagController = new clicktagController();

    routes(app): void {
        app.route('/clicktags')
            .get(this.clicktagController.getAllClicktags)
            .post(this.clicktagController.createClicktag);

        app.route('/clicktags/:id')
            .get(this.clicktagController.getClicktagById)

        app.route('/clicktags/:id')
            .delete(this.clicktagController.deleteClicktag)
            .patch(this.clicktagController.updateClicktag)
    }
}