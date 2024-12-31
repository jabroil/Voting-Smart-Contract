"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import deployedContracts from "../../contracts/deployedContracts";

const networkId = 31337; // Локальная сеть Hardhat
const votingContractData = deployedContracts[networkId]?.Voting;

if (!votingContractData) {
  throw new Error("Voting contract not found in deployedContracts.ts");
}

const VotePage = () => {
  const router = useRouter();
  const [proposals, setProposals] = useState<string[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        if (!window.ethereum) {
          alert("Metamask не установлен. Установите Metamask и обновите страницу.");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const votingContract = new ethers.Contract(
          votingContractData.address,
          votingContractData.abi,
          provider
        );

        console.log("Подключено к контракту по адресу:", votingContract.address);

        const proposalCount = await votingContract.getProposalsCount();
        console.log("Количество кандидатов:", proposalCount.toString());

        const proposalsArray = [];
        for (let i = 0; i < proposalCount; i++) {
          const proposal = await votingContract.proposals(i);
          console.log(`Кандидат ${i}: ${proposal.name}`);
          proposalsArray.push(proposal.name);
        }

        setProposals(proposalsArray);
      } catch (error) {
        console.error("Ошибка получения кандидатов:", error);
      }
    };

    fetchProposals();
  }, []);

  const handleVote = async () => {
    if (selectedProposal === null) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const votingContract = new ethers.Contract(
        votingContractData.address,
        votingContractData.abi,
        signer
      );

      const transaction = await votingContract.vote(selectedProposal);
      await transaction.wait();
      alert(`Вы проголосовали за: ${proposals[selectedProposal]}`);
    } catch (error) {
      console.error("Ошибка голосования:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/vote_bg.png')" }}
    >
      <div className="relative bg-white bg-opacity-80 p-8 rounded-md shadow-md text-center max-w-md">
        <button
          onClick={() => router.push("/")}
          className="absolute top-2 right-2 text-red-500 bg-white border-2 border-red-500 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          ×
        </button>
        <h1 className="text-3xl font-bold mb-4">Выбери лучшего игрока по Counter-Strike 2 за 2024 год:</h1>
        <ul className="w-full bg-white shadow-md rounded-lg p-4">
          {proposals.map((proposal, index) => (
            <li
              key={index}
              className={`p-4 mb-2 border rounded-lg cursor-pointer ${
                selectedProposal === index ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-300"
              }`}
              onClick={() => setSelectedProposal(index)}
            >
              {proposal}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-primary mt-4"
          onClick={handleVote}
          disabled={selectedProposal === null}
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
};

export default VotePage;