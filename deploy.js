require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { evm, abi } = require("./compile");

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  "https://rinkeby.infura.io/v3/64cd910b79644e3484784303cde328d8"
);
const web3 = new Web3(provider);
console.log("abi", JSON.stringify(abi));

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
