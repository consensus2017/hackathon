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
![ArchitectureDiagram](ArchitectureDiagram.png)

## Smart Contract
The smart contracts are under the contracts folder.
* [Blackbox.sol](./contracts/blackbox.sol) used for the drone demo
* [blockbox.sol](./contracts/blockbox.sol) used for the car demo 

## testRPC
testRPC can be installed using npm which comes with Node.js
```
npm install -g ethereumjs-testrpc
```

To run testRPC simply run `testrpc` at the command line

## Truffle
Truffle can be installed using npm which comes wirth Node.js
```
npm install -g truffle
```

Use `truffle compile` to compile all the contracts in the `contracts` folder

Use `truffle deploy` to deploy the compiled contracts. If the contracts are not compiled deploy will compile them for you.

Truffle generates the ABI under [build/contracts](./build/contracts)

## Web demo of cars changing lanes
* [index.html](index.html) html and css
* [app.js](app.js) JavaScript file that contains the web3 code to connect to Ethereum

![Screenshot of web demo](WebDemoScreenshot.png)

## Node.js programs
* [index.js](./mambo/index.js) controls the drone and talks to Azure IoT Hub
* [ReadDeviceToCloudMessages.js](./iot/readdevicetocloudmessages/ReadDeviceToCloudMessages.js) bridges Azure IoT Hub and Ethereum
* [SimulatedDevice.js](./iot/simulateddevice/SimulatedDevice.js) simulates devices by sending saftey events to the Azure IoT Hub
* [CreateDeviceIdentity](./iot/createdeviceidentity/CreateDeviceIdentity.js) creates device identities on the Azure IoT Hub


## Links
* [Devpost](https://devpost.com/software/blockbox) for team
* Original [Whiterpaper](./whitepaper.md) in preparation for the hackathon
* [Pitch deck](./Virtual_Blackbox_Pitch_Deck_v2.pptx)
* [Dependency diagrams](dependencyDiagram.graffle) done using [Graffle](https://www.omnigroup.com/omnigraffle/)
* [Azure IoT Hub tutorial](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-getstarted)
* [Azure Portal](https://portal.azure.com/)
* [Microsoft Power BI](https://powerbi.microsoft.com/en-us/)
