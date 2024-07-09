const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

// Middleware
app.use(bodyParser.json());
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("status_changed", async (data) => {
    const { delivery_id, status } = data;
    const delivery = await Delivery.findOne({ delivery_id });
    if (delivery) {
      delivery.status = status;
      if (status === "picked-up") delivery.pickup_time = new Date();
      if (status === "in-transit") delivery.start_time = new Date();
      if (["delivered", "failed"].includes(status))
        delivery.end_time = new Date();
      await delivery.save();
      io.emit("delivery_updated", delivery); // Broadcast updated delivery
    }
  });

  socket.on("location_changed", async (data) => {
    const { delivery_id, location } = data;
    const delivery = await Delivery.findOne({ delivery_id });
    if (delivery) {
      delivery.location = location;
      await delivery.save();
      io.emit("delivery_updated", delivery); // Broadcast updated delivery
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// serve the frontend
// app.use(express.static(path.join(__dirname, 'dist/web-tracker')));
// app.use(express.static(path.join(__dirname, 'dist/web-driver')));
// app.use(express.static(path.join(__dirname, 'dist/web-admin')));

// app.get('package-tracker', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/web-tracker/index.html'));
// });

// app.get('web-driver', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/web-driver/index.html'));
// });

// app.get('admin', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/web-admin/index.html'));
// });

const PackageRoutes = require("./routes/package.route");
const DeliveryRoutes = require("./routes/delivery.route");
const Delivery = require("./models/delivery.model");

app.use("/api/v1/package", PackageRoutes);
app.use("/api/v1/delivery", DeliveryRoutes);

module.exports = server;
