import { Response, Request } from 'express';

export default class appController {

    public uploadPackages = (req: Request, res: Response) => {
        res.status(200).json(req.files);
    }
}