import supertest from "supertest";
import ServerBase from "../../server/serverBase";

const request = supertest(new ServerBase(5000, "api").app);
describe("Test Server Base", () => {
    it("gets the api endpoint", async () => {
        // ToDo, fix test
        /*let error: Error = new Error();
        try {
            await request.get("/api");
        } catch (e) {
            error = e;
        }
        expect(error).toBeTrue();
        expect(error.message).toEqual(
            "Api can't receive message due to unimplemented messageReceived function!"
        );*/
    });
});
