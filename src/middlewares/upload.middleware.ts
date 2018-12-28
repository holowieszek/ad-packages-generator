import * as multer from 'multer';
import * as fs from 'fs';

export default class Upload {
    private uploadPath: string = './src/uploads';
    private MIME_TYPE_MAP: Object = {
        'application/zip': 'zip'
    };

    public uploadConfig() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                if (!fs.existsSync(this.uploadPath)) {
                    fs.mkdir(this.uploadPath, err => cb(err, this.uploadPath));
                }
                const validate = this.validateFile(file);
                cb(validate, this.uploadPath);
            },
            filename: (req, file, cb) => {
                const name = file.originalname.toLowerCase().split(' ').join('-');
                const ext = this.MIME_TYPE_MAP[file.mimetype];
                cb(null, name + '-' + Date.now() + '.' + ext);
            }
        });

        return storage;
    }

    public validateFile(file) {
        const isValid = this.MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mimetype');
        if (isValid) {
            error = null;
        }

        return error;
    }

    public extractFile() {
        return multer({ storage: this.uploadConfig() }).array('files');
    }
}