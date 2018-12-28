import * as fs from 'fs';
import * as unzip from 'unzip';
import { Response, Request } from 'express';

export default class appController {
    private readonly currentData: number = Date.now();
    private uploadedFiles: Array<string> = [];

    public uploadPackages = (req: Request, res: Response) => {
        this.unzipUploadedFiles(req.files);
    }

    private unzipUploadedFiles = (files): Promise<any> => {
        return new Promise((resolve, reject) => {
            files.forEach(file => {
                let path = `src/uploads/${this.currentData}/${file.originalname}`;

                fs.createReadStream(file.path).pipe(unzip.Extract({ path }));

                this.uploadedFiles.push(path);
            });
            resolve(this.uploadedFiles);
        });
    }
}