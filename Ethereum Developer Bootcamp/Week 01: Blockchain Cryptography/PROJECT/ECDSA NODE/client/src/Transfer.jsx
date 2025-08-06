// necessary libraries
import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";
import * as secp from "ethereum-cryptography/secp256k1";
import server from "./server";

// specific private key (generated previously)
const PRIVATE_KEY =
  "49d49e94998117033c73cb502799febc771d693eb9e2c8fca55f7f87b89e60af";

// replacement (address -> ethAddress)
// replacement (UI texts)
function Transfer({ ethAddress, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    // JSON.stringify(...) - returns JSON string (transaction data)
    const message = JSON.stringify({
      sender: ethAddress,
      amount: sendAmount.toString(),
      recipient: recipient,
    });

    // hash the message
    // keccak256(...) - returns Uint8Arary
    // utf8ToBytes(...) - returns Uint8Array
    const messageHash = keccak256(utf8ToBytes(message));

    // sign the transaction
    // sign(...) - returns [Uint8Array, number]
    const [signature, recoveryBit] = await secp.sign(messageHash, PRIVATE_KEY, {
      recovered: true,
    });

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: ethAddress,
        amount: parseInt(sendAmount),
        recipient,

        // pass the signed transaction data to the server
        // toHex(...) - returns string (hex representation)
        signature: toHex(signature),
        recoveryBit: recoveryBit,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>SEND TRANSACTION</h1>

      <label>
        SEND AMOUNT
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type Recepient's ETH ADDRESS (0x...)"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
