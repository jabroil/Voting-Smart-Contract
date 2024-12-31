import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployVoting: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Starting deployment of Voting contract...");

  const voting = await deploy("Voting", {
    from: deployer,
    args: [], 
    log: true,
  });

  log(`Voting contract deployed at address: ${voting.address}`);
};

export default deployVoting;
deployVoting.tags = ["Voting"];
