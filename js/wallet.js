let userAddress = '';
const pigmyContractAddress = '0xd53f4f9aba706dc1a254d1fc0f022a335b7d16d0';
let web3 = new Web3(window.ethereum);
if (web3 == undefined) {
  popAlert('請先安裝metamask');
}
let pigmyContract = new web3.eth.Contract(
  [{
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": false,
          "internalType": "uint256",
          "name": "pigmyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "element",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dna",
          "type": "uint256"
        }
      ],
      "name": "NewPigmy",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_dna",
        "type": "uint256"
      }],
      "name": "_createPigmy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "createRandomPigmy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }],
      "name": "balanceOf",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "dnaModulus",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }],
      "name": "getApproved",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }],
      "name": "getPigmysByOwner",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }],
      "name": "ownerOf",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "name": "pigmys",
      "outputs": [{
          "internalType": "string",
          "name": "element",
          "type": "string"
        },
        {
          "internalType": "uint16",
          "name": "dna",
          "type": "uint16"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }],
      "name": "supportsInterface",
      "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }],
      "name": "tokenURI",
      "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      }],
      "stateMutability": "view",
      "type": "function"
    }
  ], pigmyContractAddress);


function loginWallet() {
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((response) => {
      console.log('metamask connected...');
      console.log('-----------------');
      popAlert('歡迎回來');
      dropBedforeLoginPage();
      handleAccountsChanged(response);

      //popAlert('登入成功');
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        popAlert('登入失敗');
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    });
}
ethereum.on('accountsChanged', (accounts) => {
  handleAccountsChanged(accounts);
})
async function handleAccountsChanged(accounts) {
  console.log('account changed...');
  console.log('user:');
  console.log(accounts);
  console.log('-----------------');
  web3.eth.getAccounts(function(err, addresses) {
    userAddress = String(addresses[0]);
    pigmyContract.defaultAccount = userAddress;
    loadChess();
  });
}

function loadChess() {
  pigmyContract.methods.getPigmysByOwner(userAddress).call(function(err, result) { //step1
    let tokens = new Array();
    tokens = result;
    let count = 0;
    myChess = []; //flush
    for (let token of tokens) {
      let pigmyURL = '';
      pigmyContract.methods.tokenURI(token).call(function(err, result) { //step2
        pigmyURL = result;
        //console.log(pigmyURL);
        axios.get(pigmyURL).then(response => { //step3
          //console.log(response.data);
          refreshMyChess(response.data, count);
          rederMyChess(count);
          count += 1;
        });
      });
    }
    console.log('chess loaded:');
    console.log(myChess);
    console.log('-----------------');
    //myTeam.js
  })
}