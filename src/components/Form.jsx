import React, { useState } from 'react'
import { useGlobalState,} from '../store'
import { getInfoDetails, performDonate,getBagBal } from '../ConfigureBc'

import { PerformDeposit } from '../ConfigureBc'

const Form = () => {

    const [name,setName]= useState("")
    const [mail,setMail]=useState("ch@gmail.com")
    const[bal,setBal] = useState('')
    const[balance]= useGlobalState("balance")
    
    const[keyword,setKeyword] = useState("Donation")
    const [connectedAccount]=useGlobalState("connectedAccount");
    const [people,setPeople] = useState([])



    const handleSubmit=async(e)=>
        {
            e.preventDefault()
            const person = {id:new Date().getTime().toString(),
                            name,mail,bal,connectedAccount,keyword}
            const exportPerson = {name,mail,bal,keyword}
        

                console.log("Details",exportPerson);
                
                await performDonate(exportPerson);

                setPeople((people)=>{
                    return [...people,person]
                })
           


        }
  return (
    <>
        <div>Form</div>

        <div>

            <p>BagBal : {balance}</p>
            <p>GetBagBal : {getBagBal}</p>

        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='Name :'>Name : </label>
                <input placeholder='name' type='text' onChange={(e)=>{setName(e.target.value)}} value={name}/> <br/>
            </div>
            <div>
                <label htmlFor='Mail :'>Mail : </label>
                <input placeholder='mail' type='text' onChange={(e)=>{setMail(e.target.value)}} value={mail}/><br/>
            </div>
            <div>
                <label htmlFor='Amount :'>Amount : </label>
                <input placeholder='Amount'  onChange={(e)=>{setBal(e.target.value)}} value={bal}/><br/>
            </div>
          
            <div>
                <label htmlFor='Keyword :'>Keyword : </label>
                <input placeholder='keyword' type='text' onChange={(e)=>{setKeyword(e.target.value)}} value={keyword}/><br/>
            </div>
            
           <br/>
            

            <button type='submit'>Donate</button>
            
        </form>
        <button onClick={getInfoDetails}> getInfo </button><br/>

        <button onClick={PerformDeposit}>Perform Deposit</button>
       
            
            {
                people.map((person)=>{
                    const {id,name,mail,bal,connectedAccount,keyword} = person;
                    return (
                        <div key={id}>
                            <h1>Name : {name}</h1>
                            <h4>Mail :{mail}</h4>
                            <h2>Balance:{bal}</h2>
                            <h4>Address : {connectedAccount}</h4>
                            <h4>Keyword :{keyword}</h4>
                        </div>
                    )
                })
            }
    </>
  )
}

export default Form