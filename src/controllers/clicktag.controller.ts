import { Request, Response } from 'express';
import { returnResponse } from '../helpers/request.helper';
import { clicktagService } from '../services/clicktag.service';

export default class clicktagController {
    clicktagService: clicktagService = new clicktagService();
    
    getAllClicktags = (req: Request, res: Response) => {
        return this.clicktagService.getAllClicktags()
            .then(result => returnResponse(res, 200, result))
            .catch(error => returnResponse(res, 400, error));
    }

    createClicktag = (req: Request, res: Response) => {
        return this.clicktagService.createClicktag(req.body)
            .then(result => returnResponse(res, 201, result))
            .catch(error => returnResponse(res, 400, error));
    }

    getClicktagByName = (req: Request, res: Response) => {
        const { name } = req.params;
        return this.clicktagService.getClicktagByName(name)
            .then(result => returnResponse(res, 200, result))
            .catch(error => returnResponse(res, 400, error))
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