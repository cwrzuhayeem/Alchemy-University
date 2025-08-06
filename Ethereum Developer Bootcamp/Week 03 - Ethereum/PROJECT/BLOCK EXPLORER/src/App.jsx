import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function formatTimestamp(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  let timeAgo;
  if (diff < 60) timeAgo = `${diff} sec ago`;
  else if (diff < 3600) timeAgo = `${Math.floor(diff / 60)} min ago`;
  else if (diff < 86400) timeAgo = `${Math.floor(diff / 3600)} hr ago`;
  else timeAgo = `${Math.floor(diff / 86400)} days ago`;
  const date = new Date(timestamp * 1000);
  const formatted = date
    .toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    })
    .replace(/,/g, "");
  return `${timeAgo} (${formatted})`;
}

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [txBlock, setTxBlock] = useState([]);
  const [showTxs, setShowTxs] = useState(false);
  const [showTxReceipt, setShowTxReceipt] = useState({});
  const [txReceipt, setTxReceipt] = useState({});
  const [hashSearch, setHashSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [displayHash, setDisplayHash] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  }, []);

  useEffect(() => {
    if (!blockNumber) return;
    async function getBlockWithTransactions() {
      setTxBlock(await alchemy.core.getBlockWithTransactions(blockNumber));
    }
    getBlockWithTransactions();
  }, [blockNumber]);

  async function handleToggleButton(txHash) {
    setShowTxReceipt((prev) => ({
      ...prev,
      [txHash]: !prev[txHash],
    }));
    if (!txReceipt[txHash]) {
      const receipt = await alchemy.core.getTransactionReceipt(txHash);
      const block = await alchemy.core.getBlock(receipt.blockNumber);
      setTxReceipt((prev) => ({
        ...prev,
        [txHash]: { ...receipt, timestamp: block.timestamp },
      }));
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    if (!hashSearch) return;
    try {
      const receipt = await alchemy.core.getTransactionReceipt(hashSearch);
      if (!receipt) {
        setSearchResult("Invalid Transaction Hash!");
        setHashSearch("");
        return;
      }
      const block = await alchemy.core.getBlock(receipt.blockNumber);
      setSearchResult({ ...receipt, timestamp: block.timestamp });
      setDisplayHash(hashSearch);
      setHashSearch("");
    } catch {
      setSearchResult("Error Fetching Transaction!");
      setHashSearch("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Simple Block Explorer</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Enter Transaction Hash"
          value={hashSearch || ""}
          onChange={(event) => setHashSearch(event.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {searchResult &&
        (typeof searchResult === "string" ? (
          <div className="search-message">{searchResult}</div>
        ) : (
          <div className="tx-details-card">
            <div className="tx-hash-label">
              <strong>Transaction hash:</strong>
              <span className="tx-hash-value">{displayHash}</span>
            </div>
            <ul className="tx-details-list">
              <li className="tx-detail">
                <strong>Status:</strong>{" "}
                <span>{searchResult.status ? "Success" : "Failure"}</span>
              </li>
              <li className="tx-detail">
                <strong>Block:</strong> <span>{searchResult.blockNumber}</span>
              </li>
              <li className="tx-detail">
                <strong>Timestamp:</strong>{" "}
                <span>{formatTimestamp(searchResult.timestamp)}</span>
              </li>
              <li className="tx-detail">
                <strong>From:</strong> <span>{searchResult.from}</span>
              </li>
              <li className="tx-detail">
                <strong>To:</strong> <span>{searchResult.to}</span>
              </li>
              <li className="tx-detail">
                <strong>Gas Used:</strong>{" "}
                <span>{searchResult.gasUsed.toString()}</span>
              </li>
              <li className="tx-detail">
                <strong>Transaction Fee:</strong>{" "}
                <span>
                  {searchResult.gasUsed && searchResult.effectiveGasPrice
                    ? `${(
                        (Number(searchResult.gasUsed) *
                          Number(searchResult.effectiveGasPrice)) /
                        1e18
                      ).toFixed(6)} ETH`
                    : "N/A"}
                </span>
              </li>
              <li className="tx-detail">
                <strong>Confirmations:</strong>{" "}
                <span>
                  {searchResult.confirmations !== undefined
                    ? searchResult.confirmations
                    : "N/A"}
                </span>
              </li>
            </ul>
          </div>
        ))}
      <div className="block-info-card">
        <div className="block-info">
          <strong>Latest Block:</strong>{" "}
          <span className="block-number">{blockNumber}</span>
        </div>
        <button
          className="toggle-txs-button"
          onClick={() => setShowTxs(!showTxs)}
        >
          {showTxs ? "Hide Transactions" : "Show Transactions"}
        </button>
        {showTxs && (
          <ol className="tx-list">
            {txBlock?.transactions?.map((tx) => (
              <li className="tx-list-item" key={tx.hash}>
                <span className="tx-list-hash">{tx.hash}</span>
                <button
                  className="toggle-receipt-button"
                  onClick={() => handleToggleButton(tx.hash)}
                >
                  {showTxReceipt[tx.hash]
                    ? "Hide Transaction Receipt"
                    : "Show Transaction Receipt"}
                </button>
                {showTxReceipt[tx.hash] && txReceipt[tx.hash] && (
                  <ul className="tx-receipt-list">
                    <li className="tx-receipt-detail">
                      <strong>Status:</strong>{" "}
                      <span>
                        {txReceipt[tx.hash].status ? "Success" : "Failure"}
                      </span>
                    </li>
                    <li className="tx-receipt-detail">
                      <strong>Block:</strong>{" "}
                      <span>{txReceipt[tx.hash].blockNumber}</span>
                    </li>
                    <li className="tx-receipt-detail">
                      <strong>Timestamp:</strong>{" "}
                      <span>
                        {formatTimestamp(txReceipt[tx.hash].timestamp)}
                      </span>
                    </li>
                    <li className="tx-receipt-detail">
                      <strong>From:</strong>{" "}
                      <span>{txReceipt[tx.hash].from}</span>
                    </li>
                    <li className="tx-receipt-detail">
                      <strong>To:</strong> <span>{txReceipt[tx.hash].to}</span>
                    </li>
                    <li className="tx-receipt-detail">
                      <strong>Gas Used:</strong>{" "}
                      <span>{txReceipt[tx.hash].gasUsed.toString()}</span>
                    </li>
                    <li className="tx-receipt-detail">
                      <strong>Transaction Fee:</strong>{" "}
                      <span>
                        {txReceipt[tx.hash].gasUsed &&
                        txReceipt[tx.hash].effectiveGasPrice
                          ? `${(
                              (Number(txReceipt[tx.hash].gasUsed) *
                                Number(txReceipt[tx.hash].effectiveGasPrice)) /
                              1e18
                            ).toFixed(6)} ETH`
                          : "N/A"}
                      </span>
                    </li>
                    <li className="tx-receipt-detail">
                      <strong>Confirmations:</strong>{" "}
                      <span>
                        {txReceipt[tx.hash].confirmations !== undefined
                          ? txReceipt[tx.hash].confirmations
                          : "N/A"}
                      </span>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default App;
