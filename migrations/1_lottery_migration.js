const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {
    await deployer.deploy(Lottery); 
    const lottery = await Lottery.deployed();
    console.log("Lottery contract deployed at:", lottery.address);
};
