import { debug } from "console";
import express, { json, response } from "express";
import supertest from "supertest";
import ImageProcesserServer from "../../server/imageProcesserServer";

class MockImageProcesserServer extends ImageProcesserServer {
    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void {
        console.log("request >>>> " + request);
        response.send(
            JSON.stringify({
                image: request.query.filename,
                width: request.query.width,
                height: request.query.height,
            })
        );
    }
}

const request = supertest(new ImageProcesserServer(3000).app);
const requestMock = supertest(new MockImageProcesserServer(3001).app);

describe("Test Image Processer Server", () => {
    it("gets the api endpoint", async () => {
        const response = await request.get("/image_processer");
        expect(response.status).toBe(200);
    });
    it("gets the right parameters from requestMock", async () => {
        await requestMock
            .get("/image_processer?filename=test_img&width=100&height=200")
            .expect((response) => {
                expect(response.status).toBe(200);
                const answer = JSON.parse(response.text);
                expect(answer).toEqual({
                    image: "test_img",
                    width: "100",
                    height: "200",
                });
            });
    });
});
