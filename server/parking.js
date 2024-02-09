const _ = require('lodash');

class Vehicle {
  constructor(size) {
    this.size = size;
  }

  calculateFee(duration, parkingSize) {
    const baseFee = 40;
    const exceedingFee = {
      0: 20,
      1: 60,
      2: 100,
    };

    let fee = baseFee;
    if(duration > 3) fee += (duration - 3) * exceedingFee[parkingSize];

    if(duration > 24) {
      const additionalDays = Math.ceil((duration - 24) / 24);
      fee += additionalDays * 5000;
    }

    return fee;
  }
}

class ParkingSlot {
  constructor(distance, size) {
    this.distance = distance;
    this.size = size;
    this.vehicle = undefined;
  }

  assignVehicle(vehicle) {
    this.vehicle = vehicle;
  }

  getSlot(nearestEntryPointIndex, slotNumber) {
    const nearestEntryPoint = String.fromCharCode(65 + nearestEntryPointIndex);
    const parkingSlot = `${nearestEntryPoint}${slotNumber}`;

    return parkingSlot;
  }
}

class ParkingComplex {
  constructor(entryPoints, parkingMap, parkingSizes) {
    this.entryPoints = entryPoints;
    this.parkingMap = parkingMap;
    this.parkingSizes = parkingSizes;
    this.parkingSlots = _.map((parkingMap), (entry, index) => new ParkingSlot(entry, this.parkingSizes[index]));
    this.occupiedSlots = [];
  }


  parkVehicle(vehicle) {
    const nearestEntryPoint = Math.floor(Math.random() * this.entryPoints);
    const filteredParkingSlots = _.filter(this.parkingSlots, ps => ps.size >= vehicle.size);
    let possibleSlots = _.map(filteredParkingSlots, entry => {
      const nearestSlot = entry.distance[nearestEntryPoint];
      const slotNumber = _.indexOf(this.parkingMap, entry.distance);
      const parkingSlot = entry.getSlot(nearestEntryPoint, slotNumber);
      return {
        parking: entry,
        nearestSlot,
        parkingSlot,
      }
    });
    possibleSlots = _.compact(possibleSlots);

    if (!possibleSlots.length) {
      return 'No available parking slot for this vehicle type';
    }

    const nearestSlot = _.minBy(possibleSlots, 'nearestSlot');
    if(nearestSlot) nearestSlot.parking.assignVehicle(vehicle);

    return nearestSlot;
  }

  unParkVehicle(parkingSlot, vehicle, duration) {
    const fee = vehicle.calculateFee(duration, parkingSlot.parking.size)
    return fee;
  }
}

module.exports = {
  Vehicle,
  ParkingSlot,
  ParkingComplex
}
