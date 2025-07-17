// necessary libraries
const { keccak256 } = require("ethereum-cryptography/keccak");
const {
  utf8ToBytes,
  hexToBytes,
  toHex,
} = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xde65d1e0b914764bad8808138d0b6ad2e0886869": 100,
  "0x820fcbcdfa386240a5face5a9feea917a9d0b494": 75,
  "0xb8f338fac90ade9921794d9db2f81581eaf907ee": 50,
};

// replacement (address -> ethAddress)
app.get("/balance/:ethAddress", (req, res) => {
  const { ethAddress } = req.params;
  const balance = balances[ethAddress] || 0;
  res.send({ balance });
});

// replacenent (UI texts)
app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;

  // JSON.stringify(...) - returns JSON string (transaction data)
  const message = JSON.stringify({
    sender: sender,
    amount: amount.toString(),
    recipient: recipient,
  });

  // hash the message
  // keccak256(...) - returns Uint8Array
  // utf8ToBytes(...) - returns Uint8Array
  const messageHash = keccak256(utf8ToBytes(message));

  // hexToBytes(...) - returns Uint8Array
  const signatureHash = hexToBytes(signature);

  // recover the public key
  // recoverPublicKey(...) - returns Uint8Array
  const recoveredPublicKey = secp.recoverPublicKey(
    messageHash,
    signatureHash,
    recoveryBit
  );

  // hash the recovered public key for ETH address
  // keccak256(...) - returns Uint8Array
  const hashedRecoveredPublicKey = keccak256(recoveredPublicKey.slice(1)).slice(
    -20
  );

  // generate recovered ETH address
  // toHex(...) - returns string (hex representation)
  const recoveredEthAddress = "0x" + toHex(hashedRecoveredPublicKey);

  // comparison between the recoveredEthAddress and the sender (ethAddress)
  // must be same to complete the transaction
  if (recoveredEthAddress != sender) {
    return res
      .status(400)
      .send({ message: "BACK OFF...YOU'RE NOT THE OWNER OF THE ADDRESS!" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "NOT ENOUGH FUNDS!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(ethAddress) {
  if (!balances[ethAddress]) {
    balances[ethAddress] = 0;
  }
}