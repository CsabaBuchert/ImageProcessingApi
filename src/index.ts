import HelloWorldServer from "./server/helloWorldServer";
import ImageProcesserServer from "./server/imageProcesserServer";

// usage:
// http://localhost:5000/hello_world
const HelloWorldApi = new HelloWorldServer(5000);
HelloWorldApi.startListening();

// usage:
// http://localhost:5001/image_processer?filename=encenadaport.jpg&width=400&height=400
const ImageProcesserApi = new ImageProcesserServer(5001);
ImageProcesserApi.startListening();
