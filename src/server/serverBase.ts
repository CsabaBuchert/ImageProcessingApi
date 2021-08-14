import express, { response } from "express";

export default class ServerBase {
    private _app;
    private _port: number;
    private _api_name: string;

    constructor(port: number, api_name: string) {
        this._app = express();
        this._port = port;
        this._api_name = api_name;

        //set endpoint
        this._app.get("/" + this._api_name, (request, response) => {
            if (this.messageReceived) {
                this.messageReceived(request, response);
            } else {
                throw new Error(
                    "Api can't receive message due to unimplemented messageReceived function!"
                );
            }
        });
    }

    public get app() {
        return this._app;
    }

    public startListening(): void {
        this._app.listen(this._port, () => this.listeningStarted());
    }

    protected listeningStarted(): void {
        console.log(
            "Api (" + this._api_name + ") listening on port " + this._port + "!"
        );
    }

    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void;
}
