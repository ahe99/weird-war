function loginWallet() {
  popAlert('歡迎回來(預覽)');
  loadChess();
  dropBedforeLoginPage();
}

const mockChess = [
  { 
    description: "HELLO!",
    name: "Gene: 0361",
    background_color: "#FFFFDF",
    image: "https://raw.githubusercontent.com/ahe99/weirdwar-server/master/Gene/wa5c.png",
    attributes: [ { trait_type: "Type", value: "Water" },
                  { trait_type: "Head", value: "Nothing" },
                  { trait_type: "Eye", value: "Glasses" },
                  { trait_type: "Pattern", value: "Nothing" }] 
  },
  { 
    description: "HELLO!",
    name: "Gene: 6309",
    background_color: "#FFFFDF",
    image: "https://raw.githubusercontent.com/ahe99/weirdwar-server/master/Gene/s3b9.png",
    attributes: [ { trait_type: "Type", value: "Light" },
                  { trait_type: "Head", value: "Nothing" },
                  { trait_type: "Eye", value: "Nothing" },
                  { trait_type: "Pattern", value: "Stripe" }] 
  },
  { 
    description: "HELLO!",
    name: "Gene: 8664",
    background_color: "#FFFFDF",
    image: "https://raw.githubusercontent.com/ahe99/weirdwar-server/master/Gene/d257.png",
    attributes: [ { trait_type: "Type", value: "Dark" },
                  { trait_type: "Head", value: "Bean Sprout" },
                  { trait_type: "Eye", value: "Glasses" },
                  { trait_type: "Pattern", value: "Circle" }] 
  },
  { 
    description: "HELLO!",
    name: "Gene: 2a00",
    background_color: "#FFFFDF",
    image: "https://raw.githubusercontent.com/ahe99/weirdwar-server/master/Gene/fabc.png",
    attributes: [ { trait_type: "Type", value: "Fire" },
                  { trait_type: "Head", value: "Nothing" },
                  { trait_type: "Eye", value: "Nothing" },
                  { trait_type: "Pattern", value: "Nothing" }] 
  },
  { 
    description: "HELLO!",
    name: "Gene: 5896",
    background_color: "#FFFFDF",
    image: "https://raw.githubusercontent.com/ahe99/weirdwar-server/master/Gene/g368.png",
    attributes: [ { trait_type: "Type", value: "Grass" },
                  { trait_type: "Head", value: "Wig" },
                  { trait_type: "Eye", value: "Eyelash" },
                  { trait_type: "Pattern", value: "Jag" }] 
  },
]

function loadChess() {
  mockChess.map((item,index)=>{
    refreshMyChess(item, index)
    rederMyChess(index)
  });
}