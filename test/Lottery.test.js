const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { abi, evm } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it("enters one account to enter the lottery", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.2", "ether"),
    });
    const player = await lottery.methods
      .getPlayers()
      .call({ from: accounts[0] });
    assert.equal(accounts[0], player[0]);
  });

  it("enters multiple accounts to enter the lottery", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.2", "ether"),
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.2", "ether"),
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.2", "ether"),
    });

    const players = await lottery.methods
      .getPlayers()
      .call({ from: accounts[0] });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it("requires a minimum amount of ether to enter", async () => {
    try {
      await lottery.methods.enter().send({ from: accounts[1], value: web3.utils.toWei("0.02", "ether") });
      assert.fail();
    } catch (error) {
      assert(error);
    }
  });

  //   it("picks a winner and resets contract", async () => {
  //     await lottery.methods.enter().send({
  //       from: accounts[0],
  //       value: web3.utils.toWei("0.2", "ether"),
  //     });

  //     await lottery.methods.enter().send({
  //       from: accounts[1],
  //       value: web3.utils.toWei("0.2", "ether"),
  //     });

  //     await lottery.methods.enter().send({
  //       from: accounts[2],
  //       value: web3.utils.toWei("0.2", "ether"),
  //     });

  //     let players = await lottery.methods
  //       .getPlayers()
  //       .call({ from: accounts[0] });

  //     assert.equal(3, players.length);

  //     await lottery.methods.pickWinner().call({ from: accounts[0] });
  //     players = await lottery.methods.getPlayers().call({ from: accounts[0] });

  //     assert.equal(0, players.length);
  //   });
});
