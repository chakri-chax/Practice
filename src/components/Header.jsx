import React from 'react'
import {connectWallet} from '../ConfigureBc'
import { useGlobalState,truncate } from '../store'

const Header = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <>
   <h1 className="text-3xl font-bold underline bg-indigo-500 ...">
      Wallet Info 
    </h1>
    
    
    <div>
    {connectedAccount ? (
                <button className='bg-blue-500 '>
                  {truncate(connectedAccount, 4, 4, 11)}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
              
    </div>
    </>

  )
}

export default Header