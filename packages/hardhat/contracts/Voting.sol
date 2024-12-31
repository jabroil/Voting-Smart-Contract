// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string name; // Имя кандидата
        uint voteCount; // Количество голосов за кандидата
    }

    address public chairperson; // Адрес председателя голосования
    Proposal[] public proposals; // Список предложений (кандидатов)

    event ProposalAdded(string name); // Событие при добавлении кандидата
    event VoteCast(address voter, uint proposalIndex); // Событие при голосовании

    // Конструктор, инициализирующий кандидатов
    constructor() {
        chairperson = msg.sender;

        // Предварительно заданные кандидаты
        string[5] memory proposalNames = ["donk", "m0NESY", "ZywOo", "degster", "rain"];
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
            emit ProposalAdded(proposalNames[i]); // Генерация события для каждого добавленного кандидата
        }
    }

    // Метод для получения количества кандидатов
    function getProposalsCount() public view returns (uint) {
        return proposals.length;
    }

    // Голосование за кандидата
    function vote(uint proposalIndex) public {
        require(proposalIndex < proposals.length, "Invalid proposal index");
        proposals[proposalIndex].voteCount += 1;
        emit VoteCast(msg.sender, proposalIndex); // Генерация события при голосовании
    }

    // Получение победителя
    function getWinner() public view returns (string memory winnerName) {
        uint winningVoteCount = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winnerName = proposals[i].name;
            }
        }
    }
}
