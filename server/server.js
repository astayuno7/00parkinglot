const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { Vehicle, ParkingComplex } = require('./parking');

app.post('/search', async (req, res) => {

  const { vehicleSize, duration } = req.body;

  console.log(req.body);

  const entryPoints = 3;
  const parkingMap = [[1, 4, 5], [3, 2, 3], [6, 5, 6], [2,3,5], [1,2,3], [4,3,4]];
  const parkingSizes = [0, 2, 1, 0, 2, 1];

  const parkingSystem = new ParkingComplex(entryPoints, parkingMap, parkingSizes);
  const vehicle = new Vehicle(+vehicleSize);

  const parking = parkingSystem.parkVehicle(vehicle);

  const fee = parkingSystem.unParkVehicle(parking, vehicle, Math.round(+duration));

  console.log({ parking, fee } )

  return res.json({ status: 'hello world', data: { parking, fee } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));