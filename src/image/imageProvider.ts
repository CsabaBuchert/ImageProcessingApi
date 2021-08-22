import fs from "fs";
import path from "path";
import { resolveConfig } from "prettier";
import sharp from "sharp";

export default class ImageProvider {
    origImagePath = path.join("images", "full");
    thumbnailsImagePath = path.join("images", "thumbnails");

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
                        .then((data) => {
                            resolve(data);
                        })
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
            const filePath = path.join(this.origImagePath, name);
            fs.open(filePath, "r", (err, fd) => {
                if (err) {
                    console.error("file open error: " + err.message);
                    reject(new Error(err.message));
                    return;
                }

                fs.readFile(fd, async (err, data) => {
                    if (err) {
                        reject(new Error(err?.message));
                    } else {
                        const resized_data = await this.resizeImage(
                            data,
                            width,
                            height
                        );
                        this.saveImage(resized_data, name, width, height);
                        resolve(resized_data);
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

    private async saveImage(
        data: Buffer,
        name: string,
        width: number,
        height: number
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(
                this.thumbnailsImagePath,
                width + "_" + height
            );
            fs.mkdirSync(filePath, { recursive: true });
            fs.writeFile(path.join(filePath, name), data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}
