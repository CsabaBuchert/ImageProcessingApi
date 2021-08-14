import supertest from "supertest";
import HelloWorldServer from "../../server/helloWorldServer";

const request = supertest(new HelloWorldServer(5000).app);
describe("Test Hello World Server", () => {
    it("gets the api endpoint", async () => {
        const response = await request.get("/hello_world");
        expect(response.status).toBe(200);
    });
});
