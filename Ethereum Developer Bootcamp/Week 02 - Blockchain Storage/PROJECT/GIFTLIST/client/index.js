const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // the name we want to verify is in the niceList or not
  const name = "CWRZ ZUHAYEEM";

  // the index of our desired name in the niceList
  // if the name is not present, the index will be -1
  const index = niceList.indexOf(name);

  // generate the merkle proof for the name at the index in the niceList
  const indexProof = new MerkleTree(niceList).getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // pass the required parameters to the back-end (server) for verification
    proof: indexProof,
    name,
  });

  console.log(gift);
}

main();
