export class appRouting {
    routes(app): void {
        app.route('/').get((req, res) => {
            res.status(200).json('hello world');
        });
    }
}