import React, { useState, useEffect, createContext } from 'react';
import { ethers} from 'ethers'; // Import ethers methods
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

// Connecting to the Ethereum contract
const getEthereumContract =async () => {
  if (typeof ethereum === 'undefined') {
    // Handle the case where MetaMask is not installed or not available
    console.error('MetaMask is not installed or not available.');
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer =await provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [transactions,setTransactions] = useState([])
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount') || 0
  );
  const [connectedAccount, setConnectedAccount] = useState('');
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    Keyword: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
const getAllTransactions = async ()=>{
  try {
    if (!ethereum) return alert('Please install MetaMask');
    const transactionContract = await getEthereumContract();
    const availableTransactions = await transactionContract.getAllTransactions()
    const structuredTranasctions = availableTransactions.map((transaction)=>(
      {
        addressTo:transaction.receiver,
        addressFrom:transaction.sender,
        timestamp : new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
        message:transaction.message,
        keyword:transaction.keyword,
        amount:parseInt(transaction.amount._hex)/(10**18)
      }
    ))
    setTransactions(structuredTranasctions)

  } catch (error) {
    console.log(error)
  }
}
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask');
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        getAllTransactions()
        
      } else {
        console.log('No accounts found');
        
      }
    } catch (error) {
      console.error(error);
      throw new Error('No Ethereum object');
    }
  };

  const checkIfTransactionExist = async ()=>{
    try {
      const transactionContract = await getEthereumContract();
      const newTransactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem('transactionCount',transactionCount)
    } catch (error) {
      console.error(error);
      throw new Error('No Ethereum object');  
    }
  } 

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask');
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('No Ethereum object');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask');

      // Get the data from the form from the user...
      const { addressTo, amount, Keyword, message } = formData;

      // Ensure the amount is a valid number
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        alert('Please enter a valid amount');
        return;
      }

      // Convert the amount to wei using parseUnits (assuming it's in ether)
      const parsedAmountWei = ethers.utils.parseEther(parsedAmount.toFixed(18));

      const transactionContract = await getEthereumContract();

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x5208', // 21000 gwei
            value: parsedAmountWei.toString(),
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmountWei,
        message,
        Keyword
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const newTransactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(newTransactionCount.toNumber());
       window.location.reload()
    } catch (error) {
      console.error(error);
      throw new Error('Error sending transaction');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactionCount,
        transactions,
        isLoading
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
