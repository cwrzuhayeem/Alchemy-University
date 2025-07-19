// import necessary files
const MerkleTree = require("./MerkleTree");
const niceList = require("./niceList");
const verifyProof = require("./verifyProof");

// replacement (existing comments & UI texts)

// generate the merkle root for the niceList
const MERKLE_ROOT = new MerkleTree(niceList).getRoot();

// the name we want to verify is in the niceList or not
const name = "CWRZ ZHAYEEM";

// the index of our desired name in the niceList
// if the name is not present, the index will be -1
const index = niceList.indexOf(name);

// generate the merkle proof for the name at the index in the niceList
const indexProof = new MerkleTree(niceList).getProof(index);

// pass the required parameters to verify the proof
const result = verifyProof(indexProof, name, MERKLE_ROOT);

// log the result (true/false) -> true, CWRZ ZUHAYEEM is in the list!
console.log("Present?:", result);

// try it out: what happens if you try a name not in the list, or a fake proof?