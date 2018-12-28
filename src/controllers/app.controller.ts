import * as fs from 'fs';
import * as unzip from 'unzip';
import * as glob from 'glob';
import * as replaceInFile from 'replace-in-file';
import { Response, Request } from 'express';
import { clicktagService } from '../services/clicktag.service';

export default class appController {
    private readonly currentData: number = Date.now();
    private clicktagService: clicktagService = new clicktagService();

    private uploadedFiles: Array<string> = [];
    private indexFilesPaths: Array<string> = [];

    public uploadPackages = async (req: Request, res: Response) => {
        await this.unzipUploadedFiles(req.file);
        await this.findIndexFiles();

        const clicktag = await this.getClicktag(req.body.name);
        
        await this.replaceClicktags(clicktag);
        
        res.status(200).json('done');
    }

    private unzipUploadedFiles = (file): Promise<{}> => {
        return new Promise((resolve, reject) => {
            let path = `src/uploads/${this.currentData}/${file.originalname}`;
            this.uploadedFiles.push(path);

            fs.createReadStream(file.path).pipe(unzip.Extract({ path })).on('close', () => {
                resolve(this.uploadedFiles);
            });
        });
    }

    private findIndexFiles = (): Promise<{}> => {
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

    private getClicktag = async (name: string) => {
        return await this.clicktagService.getClicktagByName(name);
    }

    private replaceClicktags = (data): Promise<boolean> => {
        const options = {
            files: this.indexFilesPaths[0],
            from: [data[0].hook1, data[0].hook2],
            to: [data[0].clicktag1, data[0].clicktag2]
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