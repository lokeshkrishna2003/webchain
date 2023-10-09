import React ,{useContext} from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { TransactionContext } from '../context/TransactionContext';
import Typed from 'react-typed';
import {SiEthereum} from 'react-icons/si'
import {BsInfoCircle} from 'react-icons/bs'
import Loader from '../components/Loader'
import { ShortenAddress } from '../utils/ShortenAddress';
const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'
const Input=({placeholder,name,type,value,handleChange})=>(
    <input type={type} step='0.0001' value={value} placeholder={placeholder} onChange={(e)=>handleChange(e,name)}  className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism '/>
)

function Welcome() {
    const {connectWallet,connectedAccount,formData,handleChange,sendTransaction,isLoading} = useContext(TransactionContext)
    const handleSubmit = (e)=>{
const {addressTo,amount,Keyword,message} = formData
e.preventDefault()
if(!addressTo || !amount || !Keyword || !message) return
sendTransaction()
    }
  return (
<div className='flex w-full justify-center items-center'>
    <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
            <h1 className='text-3xl sm:text-5xl text-white text-gradient h-[100px] py-1'>
                {
                <Typed
                strings={[`Send Crypto <br /> across the World`]}
                typeSpeed={100}
                backSpeed={50}
                loop
            />
                }
            </h1>
            <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                
               Explore the Crypto world. Send the Cryptocurrencies easily on Krypt.
            </p>
            {!connectedAccount &&(
            <button type="button" onClick={connectWallet} className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'>
            <p className='text-white text-base font-semibold'>Connect Your Wallet</p>
        </button>
            ) }

            <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
                <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
                <div className={commonStyles}>Security</div>
                <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
                <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
                <div className={commonStyles}>Low fees</div>
                <div className={`rounded-br-2xl ${commonStyles}`}>Block chain
                </div>
            </div>
        </div>
        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 '>
<div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
    <div className="flex justify-between flex-col w-full h-full ">
        <div className="flex justify-between items-start">
            <div className="w-10 h-10 border-2 border-white flex justify-center items-center ">
                <SiEthereum fontSize={21} color='#fff'/>
            </div>
            <BsInfoCircle fontSize={17} color='#fff'/>
        </div>
        <div>
            <p className="text-white font-light text-sm">
               Address: {ShortenAddress(connectedAccount)}
            </p>
            <p className="text-white font-semibold text-lg">
               Ethereum
            </p>
        </div>
    </div>
</div>
<div className='p-5 sm:w-96 justify-start items-center blue-glassmorphism'>
<Input placeholder="Address To" name="addressTo" type="test" handleChange={handleChange}/>
<Input placeholder="Amount(ETH)" name="amount" type="number" handleChange={handleChange}/>
<Input placeholder="Keyword (Gif)" name="Keyword" type="test" handleChange={handleChange}/>
<Input placeholder="Enter Message" name="message" type="test" handleChange={handleChange}/>
<div className='h-[1px] w-full bg-gray-400 my-2'/>
{isLoading?(
    <Loader/>
):(
<button type="button" onClick={handleSubmit} className='text-white w-full rounded-xl mt-2 border-[1px] p-2 border-[#3d4f7c] cursor-pointer'> Send Now</button>
)}
</div>
        </div>
    </div>
</div>
  )
}

export default Welcome
