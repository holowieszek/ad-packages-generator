import Clicktag from '../models/clicktag.model';
import { clicktagInterface as IClicktag } from '../interfaces/clicktag.interface';

export class clicktagService {

    getAllClicktags() {
        return Clicktag.find({});
    }

    createClicktag(data) {
        return Clicktag.create(data);
    }

    getClicktagByName(name: string) {
        return Clicktag.find({ name: name });
    }
}