import web3 from "./web3";

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "enter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [
      { internalType: "address payable[]", name: "", type: "address[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "players",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];
const address = "0x24879F85cFeeAb6c43c317A801d64c121e7fDd83";

export default new web3.eth.Contract(abi, address);
