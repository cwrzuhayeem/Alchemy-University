const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const threshold = ethers.BigNumber.from(
      "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf"
    );
    let winnerWallet;

    while (true) {
      const tempWallet = ethers.Wallet.createRandom();
      const addrBN = ethers.BigNumber.from(tempWallet.address);

      if (addrBN.lt(threshold)) {
        winnerWallet = tempWallet.connect(ethers.provider);
        break;
      }
    }

    const [deployer] = await ethers.getSigners();
    await deployer.sendTransaction({
      to: winnerWallet.address,
      value: ethers.utils.parseEther("1"),
    });

    await game.connect(winnerWallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
