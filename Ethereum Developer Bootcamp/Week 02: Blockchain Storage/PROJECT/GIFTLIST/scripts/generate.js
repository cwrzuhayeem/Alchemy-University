// import necessary files
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree.js");

// generate merkle root for the niceList
// MerkleTree(...).getRoot() - returns string (hex representation)
const hexMerkleRoot = new MerkleTree(niceList).getRoot();

// log the result
console.log("Hex Merkle Root:", hexMerkleRoot);