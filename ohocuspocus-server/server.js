import { Server } from "@hocuspocus/server";

const server = new Server({
  port: 1234,

  onAuthenticate: async ({ token }) => {
    // optional auth
    // throw error if invalid
    return true;
  },

  onConnect: ({ documentName }) => {
    console.log(`Client connected to ${documentName}`);
  },
});

server.listen();
console.log("Hocuspocus running on ws://localhost:1234");
