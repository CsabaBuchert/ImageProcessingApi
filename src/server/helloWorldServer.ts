import express from "express";
import ServerBase from "./serverBase";

export default class HelloWorldServer extends ServerBase {
    constructor(port: number) {
        super(port, "hello_world");
    }
    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void {
        response.send("Hello world!");
    }
}
