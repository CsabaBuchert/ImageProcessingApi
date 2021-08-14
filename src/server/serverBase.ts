import express, { response } from "express";

export default class ServerBase {
    private app;
    private port: number;
    private api_name: string;

    constructor(port: number, api_name: string) {
        this.app = express();
        this.port = port;
        this.api_name = api_name;

        //set endpoint
        this.app.get("/" + this.api_name, (request, response) => {
            if (this.messageReceived) this.messageReceived(request, response);
            else
                console.error(
                    "Api can't receive message due to unimplemented messageReceived function!"
                );
        });
    }

    public startListening(): void {
        this.app.listen(this.port, () => this.listeningStarted());
    }

    protected listeningStarted(): void {
        console.log(
            "Api (" + this.api_name + ") listening on port " + this.port + "!"
        );
    }

    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void;
}
