require("dotenv").config();
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const contractAddress = "0xB6dDAf3348914D6E317bC3BC40AdC299A7F9b6b8";
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const Vip = await hre.ethers.getContractAt(
    "VIP_Bank",
    contractAddress,
    wallet
  );
  const addVip = await Vip.addVIP("0x052f899e4e3fe467FDF76155548ac9ef8A1d5caf");

  console.log(addVip.hash);
  // 0x05ac5801540ef33528c7239cc56864c73ff48ee0e705b37b3314762065f79328
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
