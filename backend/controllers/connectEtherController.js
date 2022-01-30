import { ethers } from 'ethers';

const connectEther = async (req, res) => {
    try {
        // If you don't specify a //url//, Ethers connects to the default 
        // (i.e. ``http:/\/localhost:8545``)
        console.log('address from connectEther: ', req.query.text.length)
        let address = req.query.text;
        if (address.length !== 42) {
            res.status(404)
            throw new Error('address is not valid');
        }

        const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/93096f9011904eea8cc39f4f1c209869');
        // let address = "0x9b692BfF0d40a535E5917Bc1E47E80a75C3d1c82"
        const resolver = await provider.getResolver(address);
        let gasPrice = await provider.getGasPrice();
        const abi = [
            // Read-Only Functions
            "function balanceOf(address owner) view returns (uint256)",
            "function decimals() view returns (uint8)",
            "function symbol() view returns (string)",

            // Authenticated Functions
            "function transfer(address to, uint amount) returns (bool)",

            // Events
            "event Transfer(address indexed from, address indexed to, uint amount)"
        ];
        console.log(await provider.getTransactionCount(address))
        const contract = new ethers.Contract(address, abi, provider)
        // const feeData = await provider.getFeeData()
        // console.log(feeData.maxFeePerGas)
        // console.log(contract)
        console.log(`Gas Price: ${gasPrice} `);
        // console.log(resolver);
        // //null
        // Look up the current block number
        let blocknum = await provider.getBlockNumber()
        // blocknum = parseInt("11860826")
        console.log('blocknum: ', blocknum);

        // console.log('transaction: ', transaction.cyan.bold);
        // 13722573
        // console.log('blocknum:', blocknum)
        // console.log(await provider.getBlock(blocknum))
        const block = await provider.getBlock(blocknum);
        const filter = {
            address: address,
            topics: [
                ethers.utils.id("Transfer(address,address,uint256)")
            ]
        }
        console.log(filter)
        console.log(block.transactions.length);
        // console.log(block.hash)
        // const blockWithTx = await provider.getBlockWithTransactions(blocknum)
        // console.log(blockWithTx.transactions[0].hash)
        // let hash = blockWithTx.transactions[0].hash;

        // console.log(await provider.getTransactionReceipt("0x1fd5818811010442d3bdef81b42fb7e7ead72f6adc35d40d7bb75ee5d1d13e8c"))
        // Get the balance of an account (by address or ENS name, if supported by network)
        let balance = await provider.getBalance(address)
        balance = ethers.utils.formatEther(balance);
        let tx = JSON.stringify(block.transactions)
        // let code = await provider.getCode(address)
        console.log(`Balance: ${balance} Ether`.green.underline.bold)
        // console.log(ethers.utils.TransactionDescription(address))
        let etherDetails = {
            gasPrice: gasPrice,
            balance: balance,
            blocknum: blocknum.toString(),
            tx: tx,
            filter: filter,
        }
        res.json(etherDetails)
        // console.log(code)
        // { BigNumber: "2337132817842795605" }
        // console.log(balance)
        // Often you need to format the output to something more user-friendly,
        // such as in ether (instead of wei)
        // '2.337132817842795605'

        // If a user enters a string in an input field, you may need
        // to convert it from ether (as a string) to wei (as a BigNumber)

        // { BigNumber: "1000000000000000000" }

        // You can also use an ENS name for the contract address
        // const daiAddress = "0xad6d458402f60fd3bd25163575031acdce07538d";

        // let storage = await provider.getStorageAt(daiAddress, 0);
        // console.log(`Transaction Count: ${await provider.getTransactionCount(daiAddress)} `);
        // // console.log(`Blocks Method: ${ await provider.getBlockWithTransactions(blocknum) } `);
        // console.log(`storage: ${storage} `);
        // The ERC-20 Contract ABI, which is a common contract interface
        // for tokens (this is the Human-Readable ABI format)
        // const daiAbi = [
        //     // Some details about the token
        //     "function name() view returns (string)",
        //     "function symbol() view returns (string)",

        //     // Get the account balance
        //     "function balanceOf(address) view returns (uint)",

        //     // Send some of your tokens to someone else
        //     "function transfer(address to, uint amount)",

        //     // An event triggered whenever anyone transfers to someone else
        //     "event Transfer(address indexed from, address indexed to, uint amount)"
        // ];

        // // The Contract object
        // const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);
        // // Get the ERC-20 token name
        // console.log(`DaiContract name: ${await daiContract.name()} `)
        // // 'Dai Stablecoin'

        // // Get the ERC-20 token symbol (for tickers and UIs)
        // console.log(`DaiContract symbol: ${await daiContract.symbol()} `)
        // // 'DAI'

        // // Get the balance of an address
        // let daiBalance = await daiContract.balanceOf("0xad6d458402f60fd3bd25163575031acdce07538d")
        // // { BigNumber: "18190624174838529547383" }


        // // Format the DAI for displaying to the user

        // console.log(`Dai Balance: ${ethers.utils.formatUnits(daiBalance, 18)} `.green.underline.bold);
        // // '18190.624174838529547383'
    } catch (error) {
        console.log(`error: ${error} `.red.underline.bold);
        console.log(res)
        // throw new Error('error!')
        res.send(error)
        // res.Error(error)
        // throw new Error(error);
    }

}

const eventFilter = async (req, res) => {
    try {
        // If you don't specify a //url//, Ethers connects to the default 
        // (i.e. ``http:/\/localhost:8545``)
        const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/93096f9011904eea8cc39f4f1c209869');
        let filter = {
            address: "0x6b175474e89094c44da98b954eedeac495271d0f",
            topics: [
                ethers.utils.id("Transfer(0x503828976d22510aad0201ac7ec88293211d23da,0x6b175474e89094c44da98b954eedeac495271d0f,uint256)"),
                ethers.utils.hexZeroPad("0x6b175474e89094c44da98b954eedeac495271d0f", 32)
            ]
        };
        console.log(filter)
        console.log("========================================================")
        const abi = [
            "event Transfer(0x503828976d22510aad0201ac7ec88293211d23da indexed src, 0x6b175474e89094c44da98b954eedeac495271d0f indexed dst, uint val)"
        ];

        let contract = new ethers.Contract("0x6b175474e89094c44da98b954eedeac495271d0f", abi, provider);

        // List all token transfers *from* myAddress
        console.log(contract.filters.Transfer("0x6b175474e89094c44da98b954eedeac495271d0f"))
    } catch (error) {
        console.log(`${error} `.red.underline.bold);
    }

}

const sendTransactions = async (req, res) => {
    try {
        // If you don't specify a //url//, Ethers connects to the default
        // (i.e. ``http:/\/localhost:8545``)
        // const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
        const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/93096f9011904eea8cc39f4f1c209869');
        const mnemonic = process.env.METAMASK_SECRET_PHRASE;
        const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic)

        // ...or from a private key
        const walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey)

        walletMnemonic.address === walletPrivateKey.address
        // true

        // The address as a Promise per the Signer API
        await walletMnemonic.getAddress()
        // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

        // A Wallet address is also available synchronously
        walletMnemonic.address
        // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

        // The internal cryptographic components
        walletMnemonic.privateKey
        // '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
        walletMnemonic.publicKey
        // '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

        // The wallet mnemonic
        walletMnemonic.mnemonic
        // {
        //   locale: 'en',
        //   path: "m/44'/60'/0'/0/0",
        //   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
        // }

        // Note: A wallet created with a private key does not
        //       have a mnemonic (the derivation prevents it)
        walletPrivateKey.mnemonic
        // null

        // Signing a message
        await walletMnemonic.signMessage("Hello World")
        // '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c'
        // tx=0x8ba1f109551bD432803012645Ac136ddd64DBA72
        console.log("Sending Ethers Transaction...")
        const tx = {
            to: "0xD0895091D288B7D8dfEa1480c48a24196ac127E2",
            value: ethers.utils.parseEther("0.0001"),
        }

        // Signing a transaction
        await walletMnemonic.signTransaction(tx)
        // '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc'

        // The connect method returns a new instance of the
        // Wallet connected to a provider
        const wallet = walletMnemonic.connect(provider)

        // Querying the network
        console.log(await wallet.getBalance())
        // { BigNumber: "42" }
        console.log(await wallet.getTransactionCount())
        // 0

        // Sending ether
        console.log(await wallet.sendTransaction(tx))
    } catch (error) {
        console.log(`${error} `.red.underline.bold);
    }
}

export {
    connectEther,
    eventFilter,
    sendTransactions
};
