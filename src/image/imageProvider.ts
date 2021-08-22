import fs from "fs";
import path from "path";
import { resolveConfig } from "prettier";
import sharp from "sharp";

export default class ImageProvider {
    public async getImage(
        name: string,
        width: number,
        height: number
    ): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            this.tryGetFromCache(name, width, height)
                .then((data) => resolve(data))
                .catch((_) => {
                    this.createImage(name, width, height)
                        .then((data) => resolve(data))
                        .catch((error) => reject(error));
                });
        });
    }

    private async tryGetFromCache(
        name: string,
        width: number,
        height: number
    ): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            reject(new Error("not implemented"));
        });
    }

    private async createImage(
        name: string,
        width: number,
        height: number
    ): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const filePath = path.join("images", "full", name);
            fs.open(filePath, "r", (err, fd) => {
                if (err) {
                    console.error("file open error: " + err.message);
                    reject(new Error(err.message));
                    return;
                }

                fs.readFile(fd, (err, data) => {
                    if (err) {
                        reject(new Error(err?.message));
                    } else {
                        resolve(this.resizeImage(data, width, height));
                    }

                    fs.closeSync(fd);
                });
            });
        });
    }

    private async resizeImage(
        data: Buffer,
        width: number,
        height: number
    ): Promise<Buffer> {
        return await sharp(data).resize(width, height).toBuffer();
    }
}
