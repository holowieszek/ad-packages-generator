import { Request, Response } from 'express';
import { clicktagService } from '../services/clicktag.service';

export default class clicktagController {
    clicktagService: clicktagService = new clicktagService();
    
    createClicktag = (req: Request, res: Response) => {
        // res.status(201).json('clicktags POST');
        return this.clicktagService.createClicktag;
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