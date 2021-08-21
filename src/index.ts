import HelloWorldServer from "./server/helloWorldServer";
import ImageProcesserServer from "./server/imageProcesserServer";

const HelloWorldApi = new HelloWorldServer(5000);
HelloWorldApi.startListening();

const ImageProcesserApi = new ImageProcesserServer(5001);
ImageProcesserApi.startListening();
