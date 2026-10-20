# Workshop-2

# COMSM0122 – Fundamentals of System Security
## Workshop 2: Breaking and Understanding Byzantine Fault Tolerance

### Overview
This repository contains my work for Workshop 2, which explores Byzantine Fault Tolerance (BFT), distributed consensus, Byzantine behaviour, security attacks, quorum safety, and defensive mechanisms.

The workshop uses a JavaScript simulator to demonstrate how distributed systems reach consensus and how incorrect assumptions or malicious behaviour can affect system security.

### Learning Objectives
- Understand distributed consensus and Byzantine faults.
- Explore Byzantine behaviour and equivocation.
- Understand cryptographic evidence and key compromise.
- Investigate Sybil attacks and validator membership.
- Examine quorum formation and consensus safety.
- Explore defensive mechanisms for improving BFT security.

### Project Structure
```text
Workshop-2/
├── README.md
├── package.json
├── package-lock.json
├── attacks.js
├── crypto.js
├── index.js
├── network.js
├── node.js
├── quorum.js
├── simulator.js
└── scenarios/
    ├── README.md
    ├── honest.js
    ├── byzantine.js
    ├── equivocation.js
    ├── key_theft.js
    ├── sybil.js
    ├── quorum_tampering.js
    └── hardening.js
```

*Note: The structure above describes the intended organisation. Check that the files are actually present in the repository and that the scenario paths match `package.json`.*

### Requirements
- Node.js
- npm

### Installation
Clone the repository and enter the project directory:

```bash
git clone https://github.com/valathys/Workshop-2.git
cd Workshop-2
npm install
```

### Running the Scenarios
Run the scenarios using the npm scripts configured in `package.json`:

```bash
npm run honest
npm run byzantine
npm run key-theft
npm run equivocation
npm run sybil
npm run quorum
```

Run the hardening demonstrations with:

```bash
node scenarios/hardening.js
```

### Workshop Activities

| Activity | Purpose |
|---|---|
| Honest consensus | Observe normal voting and commitment. |
| Byzantine behaviour | Examine a validator voting for a conflicting value. |
| Key theft | Explore validator impersonation using compromised credentials. |
| Equivocation | Observe a validator producing conflicting messages. |
| Sybil attack | Examine the addition of multiple validator identities. |
| Quorum tampering | Demonstrate how an unsafe quorum can allow conflicting values to reach the threshold. |
| BFT hardening | Explore equivocation detection, key revocation, validator admission control, quorum validation, and commit certificates. |

### Key Findings
The experiments demonstrate that BFT safety depends on appropriate quorum rules, trustworthy validator membership, cryptographic evidence, and correct protocol behaviour.

In the quorum-tampering experiment, reducing the quorum to two in a four-validator simulation allowed two conflicting values to reach the threshold, producing a safety violation.

The hardening demonstrations explore ways to detect conflicting votes, reject revoked keys, restrict validator admission, validate quorum settings, and record commit evidence.

### Limitations
This project is an educational simulator and is not intended for production use. The experiments demonstrate selected behaviours and defensive ideas; they do not prove protection against every attack or replace full protocol verification and integration testing.

### Author
**Student:** Valthi Siva Ram  
**Module:** COMSM0122 – Fundamentals of System Security  
**Workshop:** Workshop 2 – Breaking and Understanding Byzantine Fault Tolerance  
**Date:** 20 October 2026
