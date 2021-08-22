import ImageProvider from "../../image/imageProvider";

describe("Test Image Provider", () => {
    it("provide invalid width", async () => {
        const provider = new ImageProvider();
        provider.getImage("dummy", -1, 100).catch((err) => {
            expect(err.message).toEqual("got invalid image size parameters");
        });
    });
    it("provide invalid height", async () => {
        const provider = new ImageProvider();
        provider.getImage("dummy", 100, 0).catch((err) => {
            expect(err.message).toEqual("got invalid image size parameters");
        });
    });
    it("try open invalid image", async () => {
        const provider = new ImageProvider();
        provider.getImage("dummy", 100, 100).catch((err) => {
            expect(err.message).toContain("ENOENT");
        });
    });
    it("open an image", async () => {
        const provider = new ImageProvider();
        provider.getImage("fjord.jpg", 100, 100).then((data) => {
            expect(data.length > 0).toBeTrue();
        });
    });
});
