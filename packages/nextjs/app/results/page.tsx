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

const ResultsPage = () => {
  const router = useRouter();
  const [winner, setWinner] = useState<string | null>(null);
  const [proposals, setProposals] = useState<{ name: string; voteCount: number }[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Подключаем Metamask
        const provider = new ethers.BrowserProvider(window.ethereum);
        const votingContract = new ethers.Contract(
          votingContractData.address,
          votingContractData.abi,
          provider
        );

        console.log("Подключено к контракту по адресу:", votingContract.address);

        // Получаем данные о кандидатах и их голосах
        const proposalCount = await votingContract.getProposalsCount();
        console.log("Количество кандидатов:", proposalCount.toString());

        const proposalsArray = [];
        for (let i = 0; i < proposalCount; i++) {
          const proposal = await votingContract.proposals(i);
          proposalsArray.push({ name: proposal.name, voteCount: Number(proposal.voteCount) });
        }
        setProposals(proposalsArray);

        // Получаем имя победителя
        const winnerName = await votingContract.getWinner();
        setWinner(winnerName);
      } catch (error) {
        console.error("Ошибка получения результатов:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/results_bg.jpg')" }}
    >
      <div className="relative bg-white bg-opacity-80 p-8 rounded-md shadow-md text-center max-w-md">
        {/* Кнопка закрытия */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-2 right-2 text-red-500 bg-white border-2 border-red-500 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          ×
        </button>

        {/* Заголовок */}
        <h1 className="text-3xl font-bold mb-6 pt-2">Результаты голосования</h1>
        
        {/* Блок с результатами */}
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Кандидаты и голоса:</h2>
          <ul className="text-left">
            {proposals.map((proposal, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{proposal.name}</span>: {proposal.voteCount} голосов
              </li>
            ))}
          </ul>
          {winner ? (
            <>
              <h2 className="text-xl font-semibold mt-6">Лучшим игроком 2024 года по игре CS2 становится:</h2>
              <p className="text-2xl font-bold text-green-500">{winner}</p>
            </>
          ) : (
            <p className="text-lg text-gray-500 mt-6">Голосование еще не завершено.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
