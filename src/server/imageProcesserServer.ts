import express from "express";
import ImageProvider from "../image/imageProvider";
import ServerBase from "./serverBase";

export default class ImageProcesserServer extends ServerBase {
    constructor(port: number) {
        super(port, "image_processer");

        process.on("unhandledRejection", (error) => {
            console.log("unhandledRejection", error);
        });
    }
    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void {
        const provider = new ImageProvider();
        try {
            const image = request.query.filename as unknown as string;
            const width = parseInt(request.query.width as unknown as string);
            const height = parseInt(request.query.height as unknown as string);

            if (
                typeof image != "string" ||
                typeof width != "number" ||
                typeof height != "number"
            ) {
                response.send("Invalid parameters");
                return;
            }

            provider
                .getImage(image, width, height)
                .then((data) => {
                    response.set("Content-Type", "image/jpeg");
                    response.send(data);
                })
                .catch((err) => {
                    console.log(err);
                    response.send(err);
                });
        } catch (err) {
            console.log(err);
            response.send(err);
        }
    }
}
