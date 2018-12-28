import Clicktag from '../models/clicktag.model';
import { clicktagInterface as IClicktag } from '../interfaces/clicktag.interface';

export class clicktagService {
    createClicktag(data) {
        return Clicktag.create(data);
    }
}