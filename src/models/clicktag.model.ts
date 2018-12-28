import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { clicktagInterface as IClicktag } from '../interfaces/clicktag.interface';
import { clicktagSchema } from '../schemas/clicktag.schema';

export interface clicktagModel extends IClicktag, Document {}

export default mongoose.model<clicktagModel>('Clicktag', clicktagSchema);