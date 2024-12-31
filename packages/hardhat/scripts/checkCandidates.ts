const hre = require("hardhat");

async function main() {
  const voting = await hre.ethers.getContractAt("Voting", "0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Адрес контракта

  const proposalCount = await voting.getProposalsCount();
  console.log("Количество кандидатов:", proposalCount.toString());

  for (let i = 0; i < proposalCount; i++) {
    const proposal = await voting.proposals(i);
    console.log(`Кандидат ${i}:`, proposal.name);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
