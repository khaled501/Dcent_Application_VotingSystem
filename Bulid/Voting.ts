
import { expect } from "chai";
import hre from "hardhat";

describe("Voting", function () {
  it("Should mint and vote", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);

    await voting.connect(owner).submitProp("Proposal 1");
    await voting.connect(Aziz).submitProp("Proposal 2");

    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);

    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);
    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);
  });
});

describe("Voting", function () {
  it("Has Voted!", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Khalid] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Khalid.address, 100);

    await voting.connect(owner).submitProp("Proposal 1");
    await voting.connect(Khalid).submitProp("Proposal 2");
    await voting.connect(Khalid).submitProp("Proposal 3");

    await voting.connect(owner).vote(0, true);
    await voting.connect(Khalid).vote(1, false);
    await voting.connect(Khalid).vote(2, true);

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);
    const proposal3 = await voting.proposals(3);

    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);
    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);
    expect(proposal3.yesVotes).to.equal(0);
    expect(proposal3.noVotes).to.equal(0);
  });
});

describe("Voting", function () {
  it("Maximum number of Votes reached!", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Khalid, CLK, Omar, Ammar, Amjad, Abdulaziz, Faris] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Khalid.address, 100);
    await voting.mint(CLK.address, 100);
    await voting.mint(Omar.address, 100);
    await voting.mint(Ammar.address, 100);
    await voting.mint(Amjad.address, 100);
    await voting.mint(Abdulaziz.address, 100);
    await voting.mint(Faris.address, 100);

    await voting.connect(owner).submitProp("Proposal 1");
    await voting.connect(Khalid).submitProp("Proposal 2");
    await voting.connect(CLK).submitProp("Proposal 3");
    await voting.connect(Omar).submitProp("Proposal 4");
    await voting.connect(Ammar).submitProp("Proposal 5");
    await voting.connect(Amjad).submitProp("Proposal 6");
    await voting.connect(Abdulaziz).submitProp("Proposal 7");
    await voting.connect(Faris).submitProp("Proposal 8");

    await voting.connect(owner).vote(0, true);
    await voting.connect(Khalid).vote(1, false);
    await voting.connect(CLK).vote(2, true);
    await voting.connect(Omar).vote(3, false);
    await voting.connect(Ammar).vote(4, true);
    await voting.connect(Amjad).vote(5, false);
    await voting.connect(Abdulaziz).vote(6, true);
    await voting.connect(Faris).vote(7, false);
       
    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);
    const proposal3 = await voting.proposals(2);
    const proposal4 = await voting.proposals(3);
    const proposal5 = await voting.proposals(4);
    const proposal6 = await voting.proposals(5);
    const proposal7 = await voting.proposals(6);
    const proposal8 = await voting.proposals(7);

    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal2.noVotes).to.equal(1);
    expect(proposal3.yesVotes).to.equal(1);
    expect(proposal4.noVotes).to.equal(1);
    expect(proposal5.yesVotes).to.equal(1);
    expect(proposal6.noVotes).to.equal(1);
    expect(proposal7.yesVotes).to.equal(1);
    expect(proposal8.noVotes).to.equal(1);
  });
});

describe("Voting", function () {
  it("Three No Votes!", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Khalid, CLK] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Khalid.address, 100);
    await voting.mint(CLK.address, 100);

    await voting.connect(owner).submitProp("Proposal 1");
    await voting.connect(Khalid).submitProp("Proposal 2");
    await voting.connect(CLK).submitProp("Proposal 3");

    await voting.connect(owner).vote(0, false);
    await voting.connect(Khalid).vote(1, false);
    await voting.connect(CLK).vote(2, false);

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);
    const proposal3 = await voting.proposals(2);

    expect(proposal1.yesVotes).to.equal(0);
    expect(proposal1.noVotes).to.equal(1);
    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);
    expect(proposal3.yesVotes).to.equal(0);
    expect(proposal3.noVotes).to.equal(1);

  });
});


