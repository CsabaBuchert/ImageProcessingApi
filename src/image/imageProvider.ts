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
            if (width <= 0 || height <= 0) {
                reject(new Error("got invalid image size parameters"));
                return;
            }

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
            const filePath = path.join(
                this.thumbnailsImagePath,
                width + "_" + height,
                name
            );
            this.readFile(filePath)
                .then(async (data) => {
                    resolve(data);
                })
                .catch((err) => reject(err));
        });
    }

    private readFile(path: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            fs.open(path, "r", (err, fd) => {
                if (err) {
                    reject(new Error(err.message));
                    return;
                }

                fs.readFile(fd, async (err, data) => {
                    if (err) {
                        reject(new Error(err?.message));
                    } else {
                        resolve(data);
                    }

                    fs.closeSync(fd);
                });
            });
        });
    }

    private async createImage(
        name: string,
        width: number,
        height: number
    ): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.origImagePath, name);
            this.readFile(filePath)
                .then(async (data) => {
                    const resized_data = await this.resizeImage(
                        data,
                        width,
                        height
                    );
                    this.saveImage(resized_data, name, width, height);
                    resolve(resized_data);
                })
                .catch((err) => {
                    console.error("file open error: " + err.message);
                    reject(err);
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
