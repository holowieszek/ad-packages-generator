import { clicktagModel } from '../models/clicktag.model';
import { Request, Response } from 'express';

export default class clicktagController {

    createClicktag = (req: Request, res: Response) => {
        res.status(201).json('clicktags POST');
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