import express from "express";
import ServerBase from "./serverBase";

export default class ImageProcesserServer extends ServerBase {
    constructor(port: number) {
        super(port, "image_processer");
    }
    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void {
        response.send("");
    }
}
