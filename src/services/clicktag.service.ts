import Clicktag from '../models/clicktag.model';
import { clicktagInterface as IClicktag } from '../interfaces/clicktag.interface';

export class clicktagService {

    getAllClicktags() {
        return Clicktag.find({});
    }

    createClicktag(data) {
        return Clicktag.create(data);
    }

    getClicktagById(id: string) {
        return Clicktag.find({ _id: id });
    }

    deleteClicktag(id: string) {
        return Clicktag.deleteOne({ _id: id });
    }

    updateClicktag(id: string, data: object) {
        return Clicktag.findOneAndUpdate({ _id: id }, data);
    }
}