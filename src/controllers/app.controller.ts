import * as fs from 'fs';
import * as unzip from 'unzip';
import * as glob from 'glob';
import * as replaceInFile from 'replace-in-file';
import { Response, Request } from 'express';

export default class appController {
    private readonly currentData: number = Date.now();
    private uploadedFiles: Array<string> = [];
    private indexFilesPaths: Array<string> = [];

    public uploadPackages = async (req: Request, res: Response) => {
        await this.unzipUploadedFiles(req.file);
        await this.findIndexFiles();
        await this.replaceClicktags();

        res.status(200).json('done');
    }

    private unzipUploadedFiles = (file): Promise<any> => {
        return new Promise((resolve, reject) => {
            let path = `src/uploads/${this.currentData}/${file.originalname}`;
            this.uploadedFiles.push(path);

            fs.createReadStream(file.path).pipe(unzip.Extract({ path })).on('close', () => {
                resolve(this.uploadedFiles);
            });
        });
    }

    private findIndexFiles = (): Promise<any> => {
        const path = this.uploadedFiles[0] + '/**/index.html';

        return new Promise((resolve, reject) => {
            const self = this;
            glob(path, (err, files) => {
                
                err ? reject(err) : true
                self.indexFilesPaths.push(files);

                resolve(self.indexFilesPaths);
            });
        });
    }

    private replaceClicktags = (): Promise<boolean> => {
        const options = {
            files: this.indexFilesPaths[0],
            from: ['hook1', 'hook2'],
            to: ['hook1_replaced', 'hook2_replaced']
        }

        return new Promise((resolve, reject) => {
            replaceInFile(options, (error, changes) => {
                if (error) {
                    reject();
                }

                resolve(true);
            });
        });
    }

}