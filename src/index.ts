//import ServerBase from "./server/serverBase";
import HelloWorldServer from "./server/helloWorldServer";

const HelloWorldApi = new HelloWorldServer(5000);
HelloWorldApi.startListening();
//const ImageProcesserServer = new ServerBase(5000, "image_processer_api");
