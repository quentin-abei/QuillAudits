require("dotenv").config();
const { utils } = require("ethers");
const { keccak256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // define an rpc
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  // define a new wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // this is the contract address
  const contractAddress = "0xf8E9327E38Ceb39B1Ec3D26F5Fad09E426888E66";

  // alice private key is in slot 4 in storage
  const slot = 4;
  // use ethers to get the state variable is storage
  const alicePk = await ethers.provider.getStorageAt(contractAddress, slot);
  console.log("alicePk :", alicePk);

  // same for bob at slot 9
  const slot2 = 9;
  const bobPk = await ethers.provider.getStorageAt(contractAddress, slot2);
  console.log("bobPk :", bobPk);

  // define a new contract instance with my wallet
  // connected to it
  const contract = await ethers.getContractAt(
    "Confidential",
    contractAddress,
    wallet
  );

  // get the _hash
  const _hash = await contract.hash(alicePk, bobPk);
  console.log(_hash);
  // 0x9ef416df0fda1100f986a774a4b5e98862857d91600d4f615de7187c70d2b7bf

  // chech the hash
  const checkHash = await contract.checkthehash(_hash);
  console.log(checkHash);
  // log true !
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
