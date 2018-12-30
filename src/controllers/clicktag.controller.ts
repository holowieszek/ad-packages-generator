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

    getClicktagById = (req: Request, res: Response) => {
        const { id } = req.params;
        
        return this.clicktagService.getClicktagById(id)
            .then(result => returnResponse(res, 200, result))
            .catch(error => returnResponse(res, 400, error));
    }

    updateClicktag = (req: Request, res: Response) => {
        return this.clicktagService.updateClicktag(req.params.id, req.body)
            .then(result => returnResponse(res, 201, result))
            .catch(error => returnResponse(res, 400, error));
    }

    deleteClicktag = (req: Request, res: Response) => {
        const { id } = req.params;

        return this.clicktagService.deleteClicktag(id)
            .then(result => returnResponse(res, 201, result))
            .catch(error => returnResponse(res, 400, error));
    }
}