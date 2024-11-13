const contractAddress = "0x1bD1CdE481e7e8Ac2695c45641CA4B6CA84c8Bbf"; 
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "have",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "want",
        "type": "address"
      }
    ],
    "name": "OnlyVRFWrapperCanFulfill",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Received",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "randomWords",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "payment",
        "type": "uint256"
      }
    ],
    "name": "RequestFulfilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "numWords",
        "type": "uint32"
      }
    ],
    "name": "RequestSent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "callbackGasLimit",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collectedFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLinkToken",
    "outputs": [
      {
        "internalType": "contract LinkTokenInterface",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "i_vrfV2PlusWrapper",
    "outputs": [
      {
        "internalType": "contract IVRFV2PlusWrapper",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastRequestId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "linkAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "manager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numWords",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "players",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "poolPrize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_requestId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "_randomWords",
        "type": "uint256[]"
      }
    ],
    "name": "rawFulfillRandomWords",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "requestConfirmations",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "requestIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_requests",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "paid",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "fulfilled",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "serviceFeePercent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "winners",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "wrapperAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "ticketCount",
        "type": "uint256"
      }
    ],
    "name": "enter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "requestRandomWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "randomResult",
        "type": "uint256"
      }
    ],
    "name": "pickWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPlayers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWinners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRewards",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPrizePool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCollectedFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_requestId",
        "type": "uint256"
      }
    ],
    "name": "getRequestStatus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "paid",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "fulfilled",
        "type": "bool"
      },
      {
        "internalType": "uint256[]",
        "name": "randomWords",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawLink",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawNative",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let web3;
let lottery;
const ticketPrice = 0.001;

// Ellenőrizzük, hogy a felhasználó manager-e
console.log("App.js inicializálás indítása");
// Ellenőrizzük, hogy a felhasználó manager-e
async function checkManager() {
    console.log("Manager ellenőrzés fut...");
    const accounts = await web3.eth.getAccounts();
    const manager = await lottery.methods.manager().call();
    console.log("Bejelentkezett fiók:", accounts[0]);
    console.log("Manager fiók:", manager);

    if (accounts[0] !== manager) {
        console.log("Felhasználó nem manager, átirányítás index oldalra.");
        window.location.href = "index.html";
    }
}

window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log("MetaMask engedélyezve");

      lottery = new web3.eth.Contract(contractABI, contractAddress);
      console.log('Lottery contract initialized.');

      const accounts = await web3.eth.getAccounts();
      const manager = await lottery.methods.manager().call();

      if (accounts.length > 0) {
          if (accounts[0].toLowerCase() === manager.toLowerCase()) {
              // Ha a manager fiók van kiválasztva, ellenőrizzük az oldalt
              if (!window.location.pathname.includes("manager.html")) {
                  console.log("Manager fiók bejelentkezve, átirányítás manager.html-re.");
                  window.location.href = "manager.html";
                  return;
              }
          } else {
            // Ha nem a manager fiók van kiválasztva, ellenőrizzük az oldalt
            if (
                !window.location.pathname.includes("index.html") &&
                !window.location.pathname.includes("pool.html") &&
                !window.location.pathname.includes("winners.html")
            ) {
                console.log("Nem manager fiók, átirányítás index.html-re.");
                window.location.href = "index.html";
                return;
            }
        }
      } else {
          console.error("MetaMask fiók nincs kiválasztva.");
          alert("Nincs elérhető MetaMask fiók. Győződj meg róla, hogy van kiválasztott fiók a MetaMaskban.");
          return;
      }

      // További funkciók
      if (window.location.pathname.includes("index.html")) {
          await updatePrizePool();
      }

      if (window.location.pathname.includes("manager.html")) {
          await checkManager();
          await updateCollectedFees();
      }

      if (window.location.pathname.includes("winners.html") || window.location.pathname.includes("manager.html")) {
          await loadWinnersAndRewards();
      }

      if (window.location.pathname.includes("pool.html") || window.location.pathname.includes("manager.html")) {
          await loadEnteredPool();
      }

      // MetaMask fiókok dropdown betöltése
      if (document.getElementById("accounts")) {
          const accountsDropdown = document.getElementById("accounts");
          accounts.forEach(account => {
              const option = document.createElement("option");
              option.value = account;
              option.text = account;
              accountsDropdown.add(option);
          });
      }
  } else {
      alert('MetaMask szükséges az alkalmazás használatához.');
  }
});

// Figyeli a fiókváltást a MetaMaskban
window.ethereum.on('accountsChanged', async (accounts) => {
  if (accounts.length > 0) {
      const manager = await lottery.methods.manager().call();
      const currentPage = window.location.pathname;

      if (accounts[0].toLowerCase() === manager.toLowerCase() && !currentPage.includes("manager.html")) {
          // Csak akkor navigálj, ha még nem vagy a manager oldalon
          window.location.href = "manager.html";
      } else if (accounts[0].toLowerCase() !== manager.toLowerCase() && !currentPage.includes("index.html")) {
          // Csak akkor navigálj, ha nem vagy az index oldalon
          window.location.href = "index.html";
      }
  }
});
async function updatePrizePool() {
  try {
      const prizePool = await lottery.methods.getPrizePool().call(); // Nyereményalap lekérdezése
      const prizePoolInEth = web3.utils.fromWei(prizePool, "ether"); // Wei átalakítása ETH-ra
      document.getElementById("prizePool").innerText = `${prizePoolInEth} ETH`; // Megjelenítés
  } catch (error) {
      console.error("Error fetching prize pool:", error);
      document.getElementById("prizePool").innerText = "Error loading prize pool.";
  }
}


function updatePrice() {
  const ticketCount = document.getElementById("ticketCount").value;
  const totalPrice = (ticketCount * ticketPrice).toFixed(4); // Négy tizedesjegyig állítjuk be
  document.getElementById("ticketPrice").innerText = `${totalPrice} ETH`;
}


async function buyTickets() {
  const ticketCount = document.getElementById("ticketCount").value; // Jegyek száma
  const totalPrice = web3.utils.toWei((ticketCount * ticketPrice).toString(), "ether"); // Összeg ETH-ban Wei-re konvertálva

  const accountsDropdown = document.getElementById("accounts"); // Dropdown referencia
  const selectedAccount = accountsDropdown.value; // A kiválasztott cím a dropdownból

  try {
      // Hívjuk meg a szerződés `enter` függvényét
      await lottery.methods.enter(ticketCount).send({
          from: selectedAccount, // A dropdownból kiválasztott címet használjuk
          value: totalPrice,
          gas: 300000
      });

      alert(`${ticketCount} tickets purchased successfully from ${selectedAccount}!`);
  } catch (error) {
      console.error("Error purchasing tickets:", error);
      alert('Transaction failed. Make sure you have enough ETH.');
  }
}

async function requestRandomNumbers() {
  const message = document.getElementById("message");


  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const primaryAccount = accounts[0]; // account[0] használata

  try {
      await lottery.methods.requestRandomWinner().send({
          from: primaryAccount, // Itt account[0]-t használunk
          gas: 3000000
      });
      message.innerText = "Random szám sikeresen lekérve!";
  } catch (error) {
      console.error("Hiba történt a random szám kérésénél:", error);
      message.innerText = "Hiba történt a random szám kérésénél.";
  }
}

async function logolas(){
  const lastRequestId = await lottery.methods.lastRequestId().call();
  const randomResult = await lottery.methods.getRequestStatus(lastRequestId).call();
  
console.log(randomResult.randomWords[0]);
}


// Nyertes kiválasztása a szerződésből
async function pickWinner() {
  const message = document.getElementById("message");
  const accountsDropdown = document.getElementById("accounts");
  const selectedAccount = accountsDropdown.value;

  try {
      // Ellenőrizzük, hogy van-e játékos a poolban
      const players = await lottery.methods.getPlayers().call();
      if (players.length === 0) {
          throw new Error("Nincs játékos a játékban. Legalább egy játékos szükséges a nyertes kiválasztásához.");
      }

      const lastRequestId = await lottery.methods.lastRequestId().call();
      const requestStatus = await lottery.methods.getRequestStatus(lastRequestId).call();

      // Ellenőrizzük, hogy van-e random szám
      if (!requestStatus.fulfilled || requestStatus.randomWords.length === 0) {
          throw new Error("Nincs érvényes random szám. Kérj először egy random számot.");
      }

      const randomResult = requestStatus.randomWords[0];
      await lottery.methods.pickWinner(randomResult).send({
          from: selectedAccount,
          gas: 3000000,
      });

      message.innerText = "A nyertest sikeresen kiválasztottuk!";
      console.log("Winner picked successfully.");
      await loadWinnersAndRewards(); // Frissítjük a nyertesek listáját
  } catch (error) {
      console.error("Hiba a nyertes kiválasztása közben:", error);

      
      if (error.message.includes("Nincs játékos")) {
          message.innerText = "Nincs játékos a játékban. Nem lehet nyertest választani.";
      } else if (error.message.includes("Nincs érvényes random szám")) {
          message.innerText = "Kérj egy új random számot, mielőtt nyertest választanál.";
      } else if (error.message.includes("value at")) {
          message.innerText = "Hiba történt: Ellenőrizd, hogy a kiválasztott fiók megfelelő-e, és próbáld újra.";
      } else {
          message.innerText = `Hiba történt: ${error.message}`;
      }
  }
}



async function loadWinnersAndRewards() {
    const winnersElement = document.getElementById("winners");
    if (!winnersElement) {
        console.warn("Winners elem nem található.");
        return;
    }

    winnersElement.innerHTML = "";

    try {
        const winners = await lottery.methods.getWinners().call();
        const rewards = await lottery.methods.getRewards().call();

        winners.forEach((winner, index) => {
            const reward = web3.utils.fromWei(rewards[index], 'ether');
            const listItem = document.createElement("li");
            listItem.innerText = `Winner: ${winner}, Reward: ${reward} ETH`;
            winnersElement.appendChild(listItem);
        });
    } catch (error) {
        console.error('Hiba a nyertes és nyeremény betöltése közben:', error);
    }
}

async function loadEnteredPool() {
  const poolElement = document.getElementById("players");
  if (!poolElement) {
      console.warn("Pool elem nem található");
      return;
  }
  poolElement.innerHTML = "";

  try {
      const players = await lottery.methods.getPlayers().call();

      players.forEach((player, index) => {
          const listItem = document.createElement("li");
          listItem.innerText = `Játékos: ${player}`;
          poolElement.appendChild(listItem);
      });
  } catch (error) {
      console.error("Hiba a játékosok betöltésekor:", error);
  }
}

async function updateCollectedFees() {
  const collectedFeesElement = document.getElementById("collectedFees");

  if (!collectedFeesElement) {
      console.warn("Collected fees element not found.");
      return;
  }

  try {
      const collectedFees = await lottery.methods.getCollectedFees().call(); 
      const collectedFeesInEth = web3.utils.fromWei(collectedFees, "ether"); 
      collectedFeesElement.innerText = `${collectedFeesInEth} ETH`; 
  } catch (error) {
      console.error("Error fetching collected fees:", error);
      collectedFeesElement.innerText = "Error loading collected fees.";
  }
}


//egyéb funkciók

function openTutorial() {
  const tutorialModal = document.getElementById("tutorialModal");
  tutorialModal.style.display = "block";
}


function closeTutorial() {
  const tutorialModal = document.getElementById("tutorialModal");
  tutorialModal.style.display = "none";
}

function openBlockchainInfo() {
  const blockchainModal = document.getElementById("blockchainModal");
  blockchainModal.style.display = "block";
}

function closeBlockchainInfo() {
  const blockchainModal = document.getElementById("blockchainModal");
  blockchainModal.style.display = "none";
}


function viewOnEtherscan() {
  const address = document.getElementById("contractAddress").innerText;
  const etherscanUrl = `https://sepolia.etherscan.io/address/${address}`;
  window.open(etherscanUrl, '_blank'); 
}

function copyContractAddress(button) {
  const address = document.getElementById("contractAddress").innerText;
  navigator.clipboard.writeText(address)
      .then(() => {
          const originalText = button.innerText; 
          button.innerText = "Copied!"; 
          button.disabled = true; 
          setTimeout(() => {
              button.innerText = originalText; 
          }, 2000);
      })
      .catch(err => {
          console.error("Failed to copy contract address: ", err);
      });
}
//esc re bezárás
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
      closeTutorial();
      closeBlockchainInfo();
  }
});

// Modal bezárása háttérre kattintással
document.addEventListener("click", (event) => {
  const tutorialModal = document.getElementById("tutorialModal");
  const blockchainModal = document.getElementById("blockchainModal");
  if (event.target === tutorialModal) closeTutorial();
  if (event.target === blockchainModal) closeBlockchainInfo();
});