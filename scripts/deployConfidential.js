require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const Confidential = await hre.ethers.getContractFactory("Confidential");
  const confidential = await Confidential.deploy();

  await confidential.deployed();

  console.log("Confidential deployed at: ", confidential.address);
  // 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
