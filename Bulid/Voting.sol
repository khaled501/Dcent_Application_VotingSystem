// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingSystem is ERC20, Ownable {
    uint public proposalCount;
    mapping(uint256 => Proposal) public proposals;

    event ProposalApproved(
        uint256 proposalId,
        string description,
        uint256 yesVotes,
        uint256 noVotes
    );

    constructor() ERC20("VoteToken", "VTK") Ownable(msg.sender) {}

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) hasVoted;
    }

    function submitProp(string memory des) public {
        Proposal storage user = proposals[proposalCount];
        user.id = proposalCount;
        user.proposer = msg.sender;
        user.description = des;
        user.yesVotes = 0;
        user.noVotes = 0;
        proposalCount++;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function vote(uint256 proposalId, bool isYes) public {
        Proposal storage user = proposals[proposalId];
        uint256 maxVotes = 8;
        uint256 totalVotes = 0;
        require(totalVotes < maxVotes, "Vote limit reached");
        require(balanceOf(user.proposer) > 0, "You do not have tokens!");
        require(user.hasVoted[user.proposer] == false, "Already Voted!");
        user.hasVoted[msg.sender] = true;
        if (isYes) {
            user.yesVotes++;
        } else {
            user.noVotes++;
        }
        
        if (user.yesVotes >= 5) {
            emit ProposalApproved(
                user.id,
                user.description,
                user.yesVotes,
                user.noVotes
            );
        }

        totalVotes++;
    }

    function getProp(
        uint256 proposalId
    )
        public
        returns (
            uint256 id,
            address proposer,
            string memory des,
            uint256 YESs,
            uint256 Nos
        )
    {
        Proposal storage user = proposals[proposalId];
        return (
            user.id,
            user.proposer,
            user.description,
            user.yesVotes,
            user.noVotes
        );
    }
}
