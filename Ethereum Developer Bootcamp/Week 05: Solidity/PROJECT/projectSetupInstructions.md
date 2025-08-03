# PROJECT SETUP INSTRUCTIONS:

<br>

### PREREQUISITES:

- Install [Node.js](https://nodejs.org/en) (Recommended: LTS).
- Install [Hardhat](https://hardhat.org).
- Clone this [Repository](https://github.com/cwrzuhayeem/Alchemy-University) to your local machine.
- Recommended IDE: **Visual Studio Code (VSCode)**.

<br>

## TITLE: CONTRACT PUZZLES MASTER

<br>

### OPEN THE PROJECT:

- Navigate to the `/CONTRACT PUZZLES MASTER` folder in your IDE.

<br>

### SETUP PROCESS:

- Open a terminal in the `/CONTRACT PUZZLES MASTER` folder.
- Install the dependencies:

   ```bash
   npm install
   ```

- Test all files:

   ```bash
   npx hardhat test
   ```

- Test specific file:

   ```bash
   npx hardhat test test/game<game no.>Test.js
   ```

**NOTE:** All tests will be passed!

<br>

---

<br>

## TITLE: LOCAL HARDHAT GAMES

<br>

### OPEN THE PROJECT:

- Navigate to the `/LOCAL HARDHAT GAMES` folder in your IDE.

<br>

### SETUP PROCESS:

- Open a terminal in the `/LOCAL HARDHAT GAMES` folder.
- Install the dependencies:

   ```bash
   npm install
   ```

- Run JSON-RPC server:

   ```bash
   npx hardhat node
   ```

- Keep the JSON-RPC server running. Open a new ternmal. Deploy the contracts:

   ```bash
   npx hardhat run scripts/deploy1.js
   ```

   ```bash
   npx hardhat run scripts/deploy2.js
   ```

   ```bash
   npx hardhat run scripts/deploy3.js
   ```

   ```bash
   npx hardhat run scripts/deploy4.js
   ```

   ```bash
   npx hardhat run scripts/deploy5.js
   ```

- Test specific file:

   ```bash
   npx hardhat run scripts/win<game no.>.js
   ```

**NOTE:** For all tests, you will see a transaction receipt with a `Winner` event inside of the `events` array!

<br>

### THAT'S IT!
