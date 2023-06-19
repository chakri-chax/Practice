import Web3 from 'web3'
import { setGlobalState, getGlobalState } from './store'
import abi from './store/Transfer.json'
const { ethereum } = window

window.web3 = new Web3(window.ethereum)

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0].toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
     const web3 = window.web3     
      const contract = new web3.eth.Contract(abi.abi,"0x5FbDB2315678afecb367f032d93F642f64180aa3")
      return contract
  } else {
    return getGlobalState('contract')
  }

}
const performDonate = async({_name,_mail,_bal,_keyword})=>{
    try {
         //_bal = window.web3.utils.toWei(_bal.toString(),'ether');
        const contract = await getEthereumContract();
        const account = getGlobalState ("connectedAccount")
        console.log("Donation started...");
        const _name = "mello"
        const _mail = "lsdkjff"
        const _bal = 1
        const _keyword = "Hello"
        await contract.methods.Donation((_name),(_mail),(_bal),(_keyword)).send({from:account, value:_bal})
        console.log("Success");
        window.location.reload();


    } catch (error) {
        reportError(error)
        
    }
}

export {
    connectWallet,
    isWallectConnected,
    getEthereumContract,
    performDonate,
}