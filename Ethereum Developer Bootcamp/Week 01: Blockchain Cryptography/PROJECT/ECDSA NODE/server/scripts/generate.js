// necessary libraries
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

// generate random private key
// utils.randomPrivateKey(...) - returns Uint8Array
const privateKey = secp.utils.randomPrivateKey();

// private key to public key
// getPublicKey(...) - returns Uint8Array
const publicKey = secp.getPublicKey(privateKey);

// hash the public key for ETH address
// keccak256(...) - returns Uint8Array
const hashedPublicKey = keccak256(publicKey.slice(1)).slice(-20);

// generate ETH Address
// toHex(...) - returns string (hex representation)
const ethAddress = "0x" + toHex(hashedPublicKey);

// log the results
// toHex(...) - returns string (hex representation)
console.log("Private Key:", toHex(privateKey));
console.log("Public Key:", toHex(publicKey));
console.log("ETH Address:", ethAddress);