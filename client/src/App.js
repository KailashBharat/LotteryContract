import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";

function App() {
  const [players, setPlayers] = useState([]);
  const [manager, setManager] = useState("");
  const [balance, setBalance] = useState(0);
  const [userValue, setUserValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      if (manager) setManager(manager);
      if (players) setPlayers(players);
      if (balance) setBalance(web3.utils.fromWei(balance, "ether"));
    })();
  }, []);

  async function handleSumbit(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting for transaction success...");
    const transactionHash = await lottery.methods
      .enter()
      .send({ from: accounts[0], value: web3.utils.toWei(userValue, "ether") });
   
      transactionHash
      ? setMessage("Succesfully entered contract")
      : setMessage("Something went wrong. Please try again");
  }

  return (
    <div>
      <h1>Lottery Contract</h1>
      <h3>This contract is managed by {manager}</h3>
      <p>
        There are currently {players.length} people entered, competing to win{" "}
        {balance} ether
      </p>

      <hr />

      <form>
        <h4>Want to try your luck?</h4>
        <label>The amount of ether you want to enter:</label>
        <br />
        <input type="text" onChange={(e) => setUserValue(e.target.value)} />
      </form>
      <button onClick={(e) => handleSumbit(e)}>Enter contract</button>

      <hr />

      <h2>{message}</h2>
    </div>
  );
}

export default App;
