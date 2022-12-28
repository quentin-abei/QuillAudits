require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const Vip = await hre.ethers.getContractFactory("VIP_Bank");
  const vip = await Vip.deploy();

  await vip.deployed();

  console.log("VIP_Bank deployed at: ", vip.address);
  // 0xB6dDAf3348914D6E317bC3BC40AdC299A7F9b6b8
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
