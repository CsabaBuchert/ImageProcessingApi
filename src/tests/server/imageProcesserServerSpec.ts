import express, { response } from "express";
import supertest from "supertest";
import ImageProcesserServer from "../../server/imageProcesserServer";

class MockImageProcesserServer extends ImageProcesserServer {
    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void {
        console.log("request >>>> " + request);
        response.send({
            Image: request.query.filename,
            width: request.query.width,
            height: request.query.height,
        });
    }
}

const request = supertest(new ImageProcesserServer(3000).app);
const requestMock = supertest(new MockImageProcesserServer(3001).app);

describe("Test Image Processer Server", () => {
    it("gets the api endpoint", async () => {
        const response = await request.get("/image_processer");
        expect(response.status).toBe(200);
    });
    /*
    ToDo: fix this test
    it("gets the right parameters from requestMock", async () => {
        await requestMock
            .get("/image_processer")
            .field("filename", "test_img")
            .field("width", 100)
            .field("height", 100)
            .expect((response) => {
                console.log("response >>>> " + response);
                expect(response.status).toBe(200);
                expect(response.body).toEqual({
                    Image: "test_img",
                    width: 100,
                    height: 100,
                });
            });
    });*/
});
