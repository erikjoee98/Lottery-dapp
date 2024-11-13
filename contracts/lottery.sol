// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {VRFV2PlusWrapperConsumerBase} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFV2PlusWrapperConsumerBase.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract Lottery is VRFV2PlusWrapperConsumerBase {
    address public manager;
    address[] public players;
    address[] public winners;
    uint[] public rewards;
    uint[] public poolPrize;
    uint256 public lastRequestId;
    uint256 public collectedFees;
    uint256 ticketPrice = 0.001 ether; 
    uint256[] public requestIds;
    uint256 public serviceFeePercent = 10;
    uint32 public callbackGasLimit = 100000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 2;

    struct RequestStatus {
        uint256 paid;
        bool fulfilled;
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus) public s_requests;
    
    address public linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789; // Sepolia LINK
    address public wrapperAddress = 0x195f15F2d49d693cE265b4fB0fdDbE15b1850Cc1; // Sepolia VRF Wrapper

    constructor() VRFV2PlusWrapperConsumerBase(wrapperAddress) {
        manager = msg.sender;
    }

    function enter(uint256 ticketCount) public payable {
    
        uint256 totalCost = ticketPrice * ticketCount;
        require(msg.value >= totalCost, "Insufficient ETH for tickets");

        uint256 serviceFee = (totalCost * serviceFeePercent) / 100; // Üzemeltetési díj kiszámítása
        collectedFees += serviceFee; 

        uint256 prizeContribution = totalCost - serviceFee; //Ez a nyereményalapba kerülő összeg

        for (uint256 i = 0; i < ticketCount; i++) {
            players.push(msg.sender);
        }

        // Biztosítjuk, hogy a szerződés egyenlege elegendő a nyereményalap hozzájárulásához
        require(address(this).balance >= prizeContribution, "Prize contribution failed");
}

    function requestRandomWinner() public restricted {

        bytes memory extraArgs = VRFV2PlusClient._argsToBytes(
            VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
        );
        (uint256 requestId, uint256 reqPrice) = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords,
            extraArgs
        );

        s_requests[requestId] = RequestStatus({
            paid: reqPrice,
            randomWords: new uint256[](0) ,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].paid > 0, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(
            _requestId,
            _randomWords,
            s_requests[_requestId].paid
        );
    }

    function pickWinner(uint256 randomResult) public {
        require(players.length > 0, "No players in the lottery");
        uint256 prizePool = address(this).balance - collectedFees; 
        require(prizePool > 0, "No funds in the prize pool");
        uint index = randomResult % players.length;
        address payable winner = payable(players[index]);

        winners.push(winner);
        rewards.push(prizePool);

        players = new address payable[](0) ;

        winner.transfer(prizePool);
         
        delete s_requests[lastRequestId].randomWords;
        s_requests[lastRequestId].fulfilled = false;
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getWinners() public view returns (address[] memory) {
        return winners;
    }

    function getRewards() public view returns (uint[] memory) {
        return rewards;
    }
    function getPrizePool() public view returns (uint256) {
    return address(this).balance - collectedFees; 
}
    function getCollectedFees() public view returns (uint256) {
        return collectedFees; 
    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (uint256 paid, bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].paid > 0, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords);
    }

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords, uint256 payment);

    
    function withdrawLink() public restricted {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }

    function withdrawNative(uint256 amount) external restricted {
        (bool success, ) = payable(manager).call{value: amount}("");
        require(success, "withdrawNative failed");
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    event Received(address, uint256);
}
