const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// merkle root for the niceList (generated previously)
const MERKLE_ROOT =
  "79bd94df7c36aa2ce51e27c1d68e772723baa77232d80bcc935a703b636a3279";

// replaced UI texts
app.post("/gift", (req, res) => {
  // extract the parameters passed from the front-end (client)
  const { proof, name } = req.body;

  // pass the required parameters to verify the proof
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("YOU'VE GOT A TINY TOY ROBOT!");
  } else {
    res.send("YOU'RE NOT IN THE LIST! :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
