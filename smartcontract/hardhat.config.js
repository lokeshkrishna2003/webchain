
require('@nomiclabs/hardhat-waffle')
module.exports = {
  solidity:'0.8.9',
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/Ygn4_J9M8LbfL5Txxa-B0MJAZkiFOfie',
      accounts:['ecb4f32c9bc71e0b6e42a61898af03ce327c65fca3c59489d4067af0a9dcca73']
    }
  }

}
