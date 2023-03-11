const mongoose = require('mongoose');
const Schemas = require("../models/schemas");
const Document = Schemas.Document;
const socketIO = require("socket.io");

function initSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("get-document", async (documentId) => {
      const document = await findOrCreateDocument(documentId);
      socket.join(documentId);
      socket.emit("load-document", document.data);
      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });

      socket.on("save-document", async (data) => {
        await Document.findByIdAndUpdate(documentId, data);
      });
    });
  });
  return io;
}

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;

  
  const template = await Document.findById('1d95c4b1-7381-44e1-9fbd-39138db53f2a');
  return await Document.create({_id : id, data: template.data})

}

module.exports = initSocket;