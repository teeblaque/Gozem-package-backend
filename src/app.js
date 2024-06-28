const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./database/db");
const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(bodyParser.json());
app.use(cors());

//serve the frontend
app.use(express.static(path.join(__dirname, 'dist/web-tracker')));
app.use(express.static(path.join(__dirname, 'dist/web-driver')));
app.use(express.static(path.join(__dirname, 'dist/web-admin')));

const PackageRoutes = require("./routes/package.route");
const DeliveryRoutes = require("./routes/delivery.route");
const Delivery = require("./models/delivery.model");

app.use("/api/v1/package", PackageRoutes);
app.use("/api/v1/delivery", DeliveryRoutes);

app.get('package-tracker', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/web-tracker/index.html'));
});

app.get('web-driver', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/web-driver/index.html'));
});

app.get('admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/web-admin/index.html'));
});

//websocket setup
wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    switch (data.event) {
      case "location_changed":
        //TODO: rewrite this to a service to update location in the database
        const delivery = await Delivery.findById(data.delivery_id);
        delivery.location = data.location;
        await delivery.save();
        ws.emit("delivery_updated", delivery);
        break;
      case "status_changed":
        //TODO: rewrite this to a service to update location in the database
        const deliveryPackage = await Delivery.findById(data.delivery_id);
        deliveryPackage.status = data.status;
        if (data.status === "picked-up") deliveryPackage.pickup_time = new Date();
        if (data.status === "in-transit") delivery.start_time = new Date();
        if (["delivered", "failed"].includes(data.status))
          deliveryPackage.end_time = new Date();
        await deliveryPackage.save();
        ws.emit("delivery_updated", deliveryPackage);
        break;
    }

    //Broadcast updated delivery
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
  ws.on("close", () => console.log("Client disconnected"));
});

module.exports = app;
