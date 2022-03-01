const udp = require("dgram");
const server = udp.createSocket("udp4");
const stdin = process.openStdin();

const DISCONNECT = "disconnect";

let connectedPort;
const chatHistory = {};

const displayChatHistory = () => {
  console.clear();
  chatHistory[connectedPort].forEach((message) =>
    console.log(
      Object.keys(message)[0] + ": " + message[Object.keys(message)[0]]
    )
  );
};

stdin.once("data", (d) => {
  server.bind(d.toString().trim());

  server.on("listening", () => {
    const address = server.address();
    const port = address.port;
    const family = address.family;
    const ipaddr = address.address;
    console.log("Server is listening at port" + port);
    console.log("Server ip :" + ipaddr);
    console.log("Server is IP4/IP6 : " + family);
  });

  stdin.addListener("data", (d) => {
    const inputLine = d.toString().trim();
    if (inputLine.includes("/disconnect")) {
      if (connectedPort) server.send(DISCONNECT, connectedPort, "localhost");

      connectedPort = null;
      console.clear();
    }
    if (inputLine.includes("/connect") && inputLine.split(" ").length === 2) {
      connectedPort = inputLine.split(" ")[1];
    } else {
      if (connectedPort) {
        server.send(inputLine, connectedPort, "localhost");
        chatHistory[connectedPort] = [
          ...(chatHistory[connectedPort] || []),
          {
            [`me`]: inputLine,
          },
        ];
        displayChatHistory();
      } else {
        console.log("No connections");
      }
    }
  });

  server.on("message", (msg, info) => {
    const data = msg.toString();

    if (data === DISCONNECT) {
      connectedPort = null;
      console.clear();
      console.log("Disconnected from that side");
    } else {
      connectedPort = info.port;

      chatHistory[connectedPort] = [
        ...(chatHistory[connectedPort] || []),
        {
          [`${info.address}:${info.port}`]: msg.toString(),
        },
      ];
      displayChatHistory();
    }
  });
});
