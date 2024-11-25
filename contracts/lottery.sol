// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Szükséges Chainlink könyvtárak importálása
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {VRFV2PlusWrapperConsumerBase} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFV2PlusWrapperConsumerBase.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

// A Lottery szerződés definiálása
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

    // Random számkérés státusza
    struct RequestStatus {
        uint256 paid;  
        bool fulfilled;
        uint256[] randomWords;
    }
    // Random számkérések tárolása
    mapping(uint256 => RequestStatus) public s_requests;
    
    address public linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789; // Sepolia LINK
    address public wrapperAddress = 0x195f15F2d49d693cE265b4fB0fdDbE15b1850Cc1; // Sepolia VRF Wrapper

    // Konstruktor: inicializálja a szerződést
    constructor() VRFV2PlusWrapperConsumerBase(wrapperAddress) {
        manager = msg.sender; // A manager a szerződést deployoló cím lesz
    }


    // Játékosok csatlakozása a lottóhoz
    function enter(uint256 ticketCount) public payable {
    
        uint256 totalCost = ticketPrice * ticketCount;
        require(msg.value >= totalCost, "Insufficient ETH for tickets");

        uint256 serviceFee = (totalCost * serviceFeePercent) / 100; // Üzemeltetési díj kiszámítása
        collectedFees += serviceFee; 

        uint256 prizeContribution = totalCost - serviceFee; //Ez a nyereményalapba kerülő összeg

        // Játékosok hozzáadása
        for (uint256 i = 0; i < ticketCount; i++) {
            players.push(msg.sender);
        }

        // Biztosítjuk, hogy a szerződés egyenlege elegendő a nyereményalap hozzájárulásához
        require(address(this).balance >= prizeContribution, "Prize contribution failed");
}
    // Randomszám kérése Chainlink VRF-en keresztül
    function requestRandomWinner() public restricted {

        bytes memory extraArgs = VRFV2PlusClient._argsToBytes(
            VRFV2PlusClient.ExtraArgsV1({nativePayment: false})// LINK tokennel fizetünk, Ha true-akkor nativetokennel fizetünk
        );
        (uint256 requestId, uint256 reqPrice) = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords,
            extraArgs
        );
        // Randomszámkérés státuszának inicializálása
        s_requests[requestId] = RequestStatus({
            paid: reqPrice,
            randomWords: new uint256[](0) ,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
    }

    // Randomszám telejs
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override { // A Chainlink VRF által meghívott belső függvény

        // Ellenőrizzük, hogy a megadott requestId létezik, és van hozzá tartozó fizetés.
        require(s_requests[_requestId].paid > 0, "request not found");
        // Ha a kérés nem található vagy nincs fizetés, a tranzakció sikertelen lesz.

        // Frissítjük a kérés állapotát: jelöljük, hogy teljesült.
        s_requests[_requestId].fulfilled = true;

        // Tároljuk a random számokat a kéréshez tartozó státuszban.
        s_requests[_requestId].randomWords = _randomWords;
        // Kibocsátunk egy eseményt, hogy jelezzük, a random számkérés teljesült.
        emit RequestFulfilled(
            _requestId,
            _randomWords,
            s_requests[_requestId].paid
        );
    }

    // Nyertes kiválasztása a generált random szám alapján
    function pickWinner(uint256 randomResult) public {
        require(players.length > 0, "No players in the lottery");
        uint256 prizePool = address(this).balance - collectedFees; 
        require(prizePool > 0, "No funds in the prize pool");

        uint index = randomResult % players.length;
        address payable winner = payable(players[index]);

        winners.push(winner); // Nyertes hozzáadása
        rewards.push(prizePool); // Nyeremény hozzáadása

        players = new address payable[](0) ; // Játékosok listájának törlése

        winner.transfer(prizePool);  // Nyeremény átutalása
         
        delete s_requests[lastRequestId].randomWords; // Randomszám törlése
        s_requests[lastRequestId].fulfilled = false;  // Státusz visszaállítása
    }

    // Csak a manager által hívható funkciókhoz
    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

     // Játékosok listájának lekérdezése
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
     // Nyertesek listájának lekérdezése
    function getWinners() public view returns (address[] memory) {
        return winners;
    }
      // Nyeremények lekérdezése
    function getRewards() public view returns (uint[] memory) {
        return rewards;
    }
    // Nyereményalap lekérdezése
    function getPrizePool() public view returns (uint256) {
    return address(this).balance - collectedFees; 
}
    // Összegyűjtött díjak lekérdezése
    function getCollectedFees() public view returns (uint256) {
        return collectedFees; 
    }
    // Randomszámkérés státuszának lekérdezése
    function getRequestStatus(
        uint256 _requestId
    ) external view returns (uint256 paid, bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].paid > 0, "request not found"); // Ellenőrzi, hogy létezik e request
        RequestStatus memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords); // Státusz visszaadása
    }
    //események naplolása
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords, uint256 payment);

    // LINK token visszautalása
    function withdrawLink() public restricted {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }
    // Natív token (ETH) visszautalás
    function withdrawNative(uint256 amount) external restricted {
        (bool success, ) = payable(manager).call{value: amount}("");
        require(success, "withdrawNative failed");
    }
    // Fizetések fogadása
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    event Received(address, uint256);
}
