import { Request, Response } from 'express';
import { clicktagService } from '../services/clicktag.service';

export default class clicktagController {
    clicktagService: clicktagService = new clicktagService();
    
    createClicktag = (req: Request, res: Response) => {
        return this.clicktagService.createClicktag(req.body)
            .then(result => {
                res.status(201).json({
                    message: 'Clicktag has been created successfully!',
                    result
                });
            })
            .catch(error => {
                res.status(201).json({
                    message: 'Something went wrong!',
                    error
                });
            });
    }

    getClicktag = () => {
        //todo
    }

    editClicktag = () => {
        //todo
    }

    updateClicktag = () => {
        //todo
    }

    deleteClicktag = () => {
        //todo
    }
}