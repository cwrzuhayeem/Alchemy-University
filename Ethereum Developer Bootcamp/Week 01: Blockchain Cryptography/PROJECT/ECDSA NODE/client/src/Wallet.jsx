import server from "./server";

// replacement (address -> ethAddress)
// replacement (setAddress -> setEthAddress)
// replacenent (UI texts)
function Wallet({ ethAddress, setEthAddress, balance, setBalance }) {
  async function onChange(evt) {
    const ethAddress = evt.target.value;
    setEthAddress(ethAddress);
    if (ethAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${ethAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>YOUR ETH WALLET</h1>

      <label>
        ETH ADDRESS
        <input
          placeholder="Type Your ETH ADDRESS (0x...)"
          value={ethAddress}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;