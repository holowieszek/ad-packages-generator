import * as fs from 'fs';
import * as unzip from 'unzip';
import * as glob from 'glob';
import * as replaceInFile from 'replace-in-file';
import * as zipFolder from 'zip-a-folder';
import * as rimraf from 'rimraf';
import { Response, Request } from 'express';
import { clicktagService } from '../services/clicktag.service';

export default class appController {
    private currentData: number;
    private clicktagService: clicktagService = new clicktagService();

    private uploadedFiles: Array<string> = [];
    private indexFilesPaths: Array<string>;
    private downloadPath: string;


    public uploadPackages = async (req: Request, res: Response) => {
        this.uploadedFiles = [];
        this.indexFilesPaths = [];

        await this.unzipUploadedFiles(req.file);
        await this.findIndexFiles();

        const clicktag = await this.getClicktag(req.body.clicktagId);
        
        await this.replaceClicktags(clicktag);
        
        await this.zipFolders(this.indexFilesPaths);

        // await this.deleteDir(this.downloadPath);

        this.createDownloadPackage(this.downloadPath);

        
        res.status(200).json({
            path: this.downloadPath + '.zip'
        });

    }

    private unzipUploadedFiles = (file): Promise<object> => {
        this.currentData = Date.now();
        console.log(this.currentData);

        return new Promise((resolve, reject) => {
            let path = `src/uploads/${this.currentData}/${file.originalname}`;
            this.uploadedFiles.push(path);

            fs.createReadStream(file.path).pipe(unzip.Extract({ path })).on('close', () => {
                console.log(`unzipped ${path}`);
                resolve(this.uploadedFiles);
            });
        });
    }

    private findIndexFiles = (): Promise<object> => {
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

    private getClicktag = async (id: string) => {
        return await this.clicktagService.getClicktagById(id);
    }

    private replaceClicktags = (data: object): Promise<boolean> => {
        const { hook1, clicktag1, hook2, clicktag2 } = data[0];
        
        const options = {
            files: this.indexFilesPaths[0],
            from: [hook1, hook2],
            to: [clicktag1, clicktag2]
        }

        return new Promise((resolve, reject) => {
            replaceInFile(options, (error, changes) => {
                error ? reject(): true;

                resolve(true);
            });
        });
    }

    private zipFolders = (folders: object): Promise<boolean> => {
        return new Promise((resolve, reject) => {

            folders[0].forEach(async folder => {
                const path = this.getPath(folder);
                console.log(path);
                await zipFolder.zip(path, path + '.zip');
                await this.deleteDir(path);
                resolve(true);
            });
        })
    }

    private getPath = (path: string) => {
        const downloadPath = path.substr(0, path.lastIndexOf('/'))
        this.downloadPath = downloadPath;
        return downloadPath;
    }

    private deleteDir = (path: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            rimraf(path, function() {
                console.log(`delete ${path}`);
                resolve(true);
            });
        })
    }

    private createDownloadPackage = async (path: string) => {
        const outputPath = this.getPath(path);
        await zipFolder.zip(outputPath, outputPath + '.zip');
        // await this.deleteDir(outputPath);
    }
}