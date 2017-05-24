# Team Block Box - Consensus 2017 Hackathon

## Inspiration
We wanted to create something that would push the limits of blockchain technology. So we came up with a traffic system that would require a high throughput solution with near realtime functionality.

A blockchain-based implementation makes sense for the following reasons:
* Adversarial peer-to-peer context
* Localised operation
* Disintermediated time-stamping of events that would be a useful data source for insurance or crash investigation (blockchains are time-series state transition systems)
* Traffic management has clear state-machine-like abstraction

## What it does
We are using the blockchain to make our roads and skies safer.

Self driving cars and robot drones are coming, and will introduce a systemic risk to safety.

Each Smart Vehicle will track and measure various telemetry data.

These would include:
* Proximity
* Speeding
* Indication
* RedLight

Each vehicle will record safety events on the blockchain by interacting with a single global smart contract.

These events are sent to the Azure IoT hub, and can be connected to custom event handlers. In our demo we send an contract call that displays the location of the incident which can dispatch emergency services.

## Architecture
![./ArchitectureDiagram.png]

## Smart Contract
The smart contracts are under the contracts folder.
* [Blackbox.sol](./contracts/blackbox.sol) used for the drone demo
* [blockbox.sol](./contracts/blockbox.sol) used for the car demo 

Truffle generates the ABI

## Node.js programs
* [index.js](./mambo/index.js) controls the drone and talks to Azure IoT Hub
* [ReadDeviceToCloudMessages.js](./iot/readdevicetocloudmessages/ReadDeviceToCloudMessages.js) bridges Azure IoT Hub and Ethereum
* [SimulatedDevice.js](./iot/simulateddevice/SimulatedDevice.js) simulates devices by sending saftey events to the Azure IoT Hub
* [CreateDeviceIdentity](./iot/createdeviceidentity/CreateDeviceIdentity.js) creates device identities on the Azure IoT Hub

## Links
* [Devpost](https://devpost.com/software/blockbox) for team
* Original [Whiterpaper](./whitepaper.md) in preparation for the hackathon
