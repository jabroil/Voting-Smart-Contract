import { deployments, ethers } from "hardhat";
import { expect } from "chai";

describe("Voting Contract", function () {
    let voting: any;
    let owner: any;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        await deployments.fixture(["Voting"]);
        const VotingDeployment = await deployments.get("Voting");
        voting = await ethers.getContractAt("Voting", VotingDeployment.address);
    });

    it("Should deploy with correct proposals", async function () {
        const expectedProposals = ["donk", "m0NESY", "ZywOo", "degster", "rain"];
        
        for (let i = 0; i < expectedProposals.length; i++) {
            const proposal = await voting.proposals(i);
            expect(proposal.name).to.equal(expectedProposals[i]);
            expect(proposal.voteCount).to.equal(0);
        }
    });

    it("Should allow voting and update vote count", async function () {
        await voting.vote(0); // Голосуем за первого кандидата
        const proposal = await voting.proposals(0);
        expect(proposal.voteCount).to.equal(1);
    });

    it("Should return the correct winner", async function () {
        await voting.vote(1); // Голосуем за второго кандидата
        await voting.vote(1); // Еще один голос за второго кандидата
        await voting.vote(0); // Голосуем за первого кандидата

        const winner = await voting.getWinner();
        expect(winner).to.equal("m0NESY");
    });
});
