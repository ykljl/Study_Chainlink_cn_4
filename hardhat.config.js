require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config(); //导入加密环境变量文件
require("@nomicfoundation/hardhat-verify");
require("./tasks");

//设置代理
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://192.168.1.187:7897");
setGlobalDispatcher(proxyAgent);

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_SEPOLIA_RPC_URL = process.env.SEPOLIA_SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
module.exports = {
  solidity: "0.8.26",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_SEPOLIA_RPC_URL, // 使用环境变量中SEPOLIA_SEPOLIA_RPC_URL,测试网的url
      accounts: [PRIVATE_KEY, PRIVATE_KEY_1], // 使用环境变量中的PRIVATE_KEY,钱包的私钥
      chainId: 11155111, // Sepolia 测试网的链 ID
      //blockConfirmations: 6, // 等待 6 个区块确认
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY, // sepolia网络的 API 密钥
    },
  },
  sourcify: {
    enabled: true, // 启用 Sourcify 验证
  },
};
