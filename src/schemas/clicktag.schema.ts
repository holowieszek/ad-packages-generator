import { Schema } from 'mongoose';

export const clicktagSchema: Schema = new Schema({
    hook1: {
        type: String,
    },
    clicktag1: {
        type: String,
    },
    hook2: {
        type: String,
    },
    clicktag2: {
        type: String
    }
});