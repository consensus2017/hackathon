# Blockchain-based Management System for Autonomous and Manual Traffic

## Overview

We present a simple system for managing road traffic using a peer-to-peer  blockchain solution. The system models vehicles as peers and roads as resources to be claimed and shared. We also include a set of trusted nodes (government-owned) which serve to validate certain types of transaction on the network.

This system is intended to help manage the movement of a set of vehicles within close proximity on a public road network. The system caters for both autonomous and human drivers, anticipating the potential difficulties occurring between autonomous-to-autonomous and automonous-to-manual vehicle interaction as the global fleet of autonomous vehicles increases.  A particular difficulty may arise for example with a significant proportion (> 50%) of courteous autonomous cars on a public road, shared with discourteous human drivers.

For fully autonomous traffic, the system will manage the peer-to-peer negotiation with other cars to move along the road network. For a partially manual fleet of vehicles, a blockchain records where consensus was not reached for a proposed state transition (communicated via a proposed transaction), and a manually-driven car makes the transition anyway. This provides us a measure of driving reputation which would be negatively impacted for a node for poor or dangerous driving, and bad manners, as agreed by all neighbouring cars.

A blockchain-based implementation makes sense for the following reasons:

- adversarial peer-to-peer context
- localised operation
- disintermediated time-stamping of events that would be a useful data source for insurance or crash investigation (blockchains are time-series state transition systems)
- traffic management has clear state-machine-like abstraction

A demonstration of a blockchain implementation for such a system would also prove the ability of the technology to manage high throughput situations, as the block time for such a system would have to occur many multiple times per second (e.g. 10-100 milliseconds) in order for the system to operate in real-time.

Our system develops micro-market-driven efficiency for traffic movement. It would allow nodes (or their passengers/owners) to set a 'hurried' parameter that could be used to automate either the spending of roadCredits if they wish to arrive at a destination as soon as possible, or to accumulate them for later use if they elect to take their time and concede positions along the way. Pay-to-use system / IOT / micropayments.

## Definitions and Segmentations

### Proximities and Peer Connection

We define two types of 'proximity' for each node:

#### 1. Physical Proximity

This is the physical distance as measured by each node to any other vehicle on the road. A map of all proximal vehicles is maintained for each node. We assume that this is managed by reliable computer vision techniques.

#### 2. Network Proximity

When the node continues to approach a nearby vehicle, if a minimum threshold is reached in terms of physical proximity, a peer connection process is initiated to attempt to connect to the vehicle on our peer-to-peer network.

For the purposes of this paper we assume that all vehicles are also nodes (so that they are able to become peers) and that this connection process is reliable.

### Formations

In high traffic situations, we define a **formation** as a linear string of connected peers on a single, finite resource. A formation ends if the resource ends - see "Resources and Assets" below.

Formations are defined due to the need to balance:

- maintaining a minimum safe distance from all other nodes (based on speed; higher speeds neccessitate larger distances), and,
- the need to minimise the physical distance between nodes to allow more traffic to flow through the given resource.

Thus, in a heavy traffic context, nodes will fall into a **formation** based on an equilibrium between these two requirements. Formations allow us to define **formation changes** as proposed by peers who wish to maneuver through traffic, discussed below (non-zero outcomes).

### Default Transition

We assume that each node on the network has a static destination with a pre-defined route along a connected set of resources (see Resources below). Re-routing is not considered in this paper, as isn't changes to the road configuration (e.g. if there's an accident or roadworks that commence part-way through a journey).

Given that each node has a static destination, we assume that each vehicle also has at any point in time a default transition it will attempt to make in the future. That is, by default, an autonomous vehicle has an internal queue of state transitions. 

### Resources and Assets

A node's next state transition is defined by the substrate of the traffic system - the existence and configuration of the roads, traffic lights, signs, etc. The reason we assign a default state transition to each vehicle is because of the purpose of the road system - it's designed to facilitate the travel of a set of vehicles, each having a high probability of differing origins and destinations. I.e. it's not appropriate behaviour for a vehicle to not participate in making state transitions (i.e. just remaining stationary on the road). This is an invalid state if the vehicle was in that state in the previous time period.

Hence, we define a **resource** as a single lane on a road.  

We then define an **asset** as the resource space currently occupied by a node, including the minimum safe distance to the front and the rear of the node, based on the node's velocity. In practice, when a node is in formation, the asset is that position in the formation.**

*NEED: to think through this a little more. Perhaps it's easier to just define the asset as that position in the formation on that resource.*

We ignore minimum safe distances to the side for simplicity.

### Peer Connection

Peer connection sequence:

- Vehicle detection (CV)
- Compute intercept.
- If intercept, initiate formation network connection

### Peer Negotiation and Concessions

Under the assumption of a working traffic formation, we define changes to the formation in terms of winners and losers; given that the resources of the road network ultimately needs to be shared amongst all partipants, there invariably arises situations of where one partipant concedes their position on the resource to another participant.

This binary concession model is appropriate in today's context as we assume that long-term road use results in a balance between giving and recieving concessions. In a context of a partially autonomous fleet however, where autonomous cars operate with a high degree of politeness and vehicular safety, this may be open to abuse from human drivers and result in a non-zero-sum outcome.

We define **transactions** to be state transitions of formation amongst a group of connected peers. Normal transactions are initally **proposed** by a peer wishing to make a state change to the formation based on the node's next default transition (that is, the need to move into the appropriate resource to continue on the node's pre-defined journey). Proposed transactions are propogated throughout the local formation to a given network proximity (e.g. 2), and consensus is reached for a given proposal before the transaction is accepted and the transition is made.

Where a proposal is rejected and a state transition is made anyway (such as when a human driver pushes into a lane) this is immutably recorded in the shared data structure. See the Example Walkthrough for a more detailed explanation.

Where there are no proximal vehicles to form consensus with regarding a proposed state transition, then the proposed state changed is just voted on by the proposer (in this case a single vehicle.)

### Network Validators

Trusted peers are embedded into the road infrastructure and participate in the network to ensure each vehicle's internal state is accurate. While there is a need for high throughput communication in a formation of nodes, for a singular node not connected to any peers, a slow connection to a trusted road network node is all that is required (all nodes must be connected to at least 1 peer).

Every formation must also be connected to at least 1 validating peer. This is to ensure nodes internal balances cannot be arbitrarily modified (trusted nodes maintain a the state of all nodes) - wait - why wouldn't you then just have everyone connected to a trusted node with high throughput? Why peer to peer if it cannot hold a global state (each peer only holds a shard.. their own state and the state of their connected peers to a network depth of 2). => need to think more on this.

## Node Structure

Internal fields:

- `enum state = {invalid, static, transitioning, emergency}`
- `Peer front`
- `Peer back`
- `Peers[] peers`
- `TrustedPeers[] tPeers` 
- `Resource currentResource`
- `Resource nextResource`
- `float roadCredits`
- `float roadRep`

## Resource Structure

This probably doesn't need to be implemented for the demo:

- `endpoints`
- `speed limit`
- `road quality`
- `modifiers` (e.g. clearway)

## Data Structure

How is the data stored? Because state changes are agreed only by a local set of participants, there is no global state to be kept and updated by all nodes. In this system, nodes only keep the data that is relevant to them, including changes to their state, and the state of other nodes participating in local changes.

For the purposes of the demonstration, we model a simple global state for all nodes in the formation.

Future work: sharding or a 'tangle' data structure to be explored.

### Majority Consensus and State Replication

For each proposed transaction, we need to collect a group of nodes to perform a consensus operation. A consensus of peers is superior to simple bilateral transactions given the assymetric outcomes of traffic reformations.

Peers will need to replicate the state of all connected peers up to 2 hops in the formation in order to be able to participate in consensus voting (see example section for an example of why this is needed).

## Example Overview

Consider an example with 3 nodes on a road with two lanes. Recall that lanes are defined as resources. The following interplay occurs:

- Two cars, nodes (A and B) are initially connected in a formation, travelling within the one resource.
- A third node, C, drives up beside them in a seperate lane.
- As the 3rd car approaches, it comes within minimum proximal range and initiates a peer connection with firstly B, and then with A (it encounters B before A, proximally). Note that even though C is now connected to A and B in a network of 3 peers, only A and B are in formation as formations are only made on a resource. 
- Car C generates a transaction proposal to move into the asset/position owned by car B, that is, to remake the linear formation of 2 into a formation of 3 by moving car B back one position. Car C would effectively be taking this asset away from car B.
  - Does the propsoal include a price to take that position? And is this what is used to help gain consensus?
- The proposal is broadcast across the **network** (not the formation).
- All nodes connected in the network (to the pre-defined network depth) gain consensus about the validity of the transaction, accounting for priority, reputation and roadCredits balance coefficients.
- State transition occurs.
- Parties have roadCredits balance adjusted.



## ToDo / Future Work:

We can consider a priority-token system that can be used by specialist vehicles (such as ambulance), or by regular vehicles who need to make

If consensus is reached and B still makes the transition manually => reputaiton impact.



