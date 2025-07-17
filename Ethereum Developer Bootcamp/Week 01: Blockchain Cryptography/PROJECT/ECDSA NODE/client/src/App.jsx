import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

// replacement (address -> ethAddress)
// replacement (setAddress -> setEthAddress)
function App() {
  const [ethAddress, setEthAddress] = useState("");
  const [balance, setBalance] = useState(0);

  return (
    <div className="app">
      <Wallet
        ethAddress={ethAddress}
        setEthAddress={setEthAddress}
        balance={balance}
        setBalance={setBalance}
      />
      <Transfer setBalance={setBalance} ethAddress={ethAddress} />
    </div>
  );
}

export default App;