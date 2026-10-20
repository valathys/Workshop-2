
const { sign, verify } = require("../crypto");

// ==========================================
// Task 8.2: Key revocation
// ==========================================
const revokedValidators = new Set();

const validatorSecrets = new Map([
    ["A", "secret-A"],
    ["B", "secret-B"],
    ["C", "secret-C"],
    ["D", "secret-D"]
]);

function revokeKey(nodeId) {
    revokedValidators.add(nodeId);
    console.log(`KEY REVOKED: ${nodeId}`);
}

function acceptVote(vote) {
    if (revokedValidators.has(vote.nodeId)) {
        console.log(`REJECTED: Key for ${vote.nodeId} has been revoked`);
        return false;
    }

    const secret = validatorSecrets.get(vote.nodeId);

    if (!secret ||
        !verify(vote.nodeId, vote.value, secret, vote.signature)) {
        console.log(`REJECTED: Invalid signature from ${vote.nodeId}`);
        return false;
    }

    console.log(`ACCEPTED: Valid vote from ${vote.nodeId}`);
    return true;
}

console.log("\n=== Task 8.2: Key Revocation ===");

const voteA = {
    nodeId: "A",
    value: 100,
    signature: sign("A", 100, validatorSecrets.get("A"))
};

acceptVote(voteA);
revokeKey("A");
acceptVote(voteA);

// ==========================================
// Task 8.5: Commit certificate
// ==========================================
function buildCommitCertificate(value, votes, totalNodes = 4) {
    const quorum = Math.floor((2 * totalNodes) / 3) + 1;
    const validSigners = new Set();
    const signatures = [];

    for (const vote of votes) {
        const secret = validatorSecrets.get(vote.nodeId);

        if (!secret || revokedValidators.has(vote.nodeId)) {
            continue;
        }

        if (vote.value !== value) {
            continue;
        }

        if (!verify(vote.nodeId, vote.value, secret, vote.signature)) {
            continue;
        }

        // Count each validator only once.
        if (validSigners.has(vote.nodeId)) {
            continue;
        }

        validSigners.add(vote.nodeId);
        signatures.push({
            nodeId: vote.nodeId,
            signature: vote.signature
        });
    }

    if (validSigners.size < quorum) {
        console.log(
            `CERTIFICATE REJECTED: ${validSigners.size} valid signatures; ` +
            `${quorum} required`
        );
        return null;
    }

    const certificate = { value, signatures };

    console.log("\nCOMMIT CERTIFICATE");
    console.log(`Value = ${certificate.value}`);
    console.log("Signed by:");

    for (const item of certificate.signatures) {
        console.log(item.nodeId);
    }

    return certificate;
}

console.log("\n=== Task 8.5: Commit Certificate ===");

const votesFor100 = ["B", "C", "D"].map(nodeId => ({
    nodeId,
    value: 100,
    signature: sign(
        nodeId,
        100,
        validatorSecrets.get(nodeId)
    )
}));

buildCommitCertificate(100, votesFor100);
