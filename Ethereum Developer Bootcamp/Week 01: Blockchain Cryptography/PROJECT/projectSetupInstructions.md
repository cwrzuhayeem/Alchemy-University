# PROJECT SETUP INSTRUCTIONS:

<br>

### PREREQUISITES:

- Install [Node.js](https://nodejs.org/en) (Recommended: LTS).
- Clone this [Repository](https://github.com/cwrzuhayeem/Alchemy-University) to your local machine.
- Recommended IDE: **Visual Studio Code (VSCode)**.

<br>

### OPEN THE PROJECT:

- Navigate to the `/ECDSA NODE` folder in your IDE.

<br>

### CLIENT SETUP:

- Open a terminal in the `/client` folder.
- Install the dependencies:

   ```bash
   npm install
   ```
- Start the development server:

   ```bash
   npm run dev
   ```
- Open your browser and go to:

   ```
   http://localhost:5173/
   ```

<br>

### SERVER SETUP:

- Open a terminal in the `/server` folder.
- Install dependencies:

   ```bash
   npm install
   ```
- Start the server:

   ```bash
   node index.js
   ```
**Better Option (Recommended):** Use `nodemon` for automatic restarts:

```bash
npm install -g nodemon
nodemon index.js
```

<br>

### GENERATE YOUR OWN KEYS:

- Open a terminal in the `/client/scripts` folder.
- Run the following command:

   ```bash
   node generate.js
   ```
**NOTE:** You can also use the keys from the `keys.txt` file...These keys were initially used to complete the project!

<br>

### YOU'RE ALL SET...NOW YOU'RE READY TO EXPLORE!
