// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Transfer{
    uint public bagBalance;   
    uint id = 0;

    struct Person{
        string  name;
        address addr;
        string mail;
        uint bal;
        string keyword;

    } mapping  (uint=>Person)  People;

    function  Donation(string memory _name,string memory _mail,uint _bal, string memory _keyword) public  payable 
        {
            
            require(_bal==msg.value,"Balance must match");
            People[id] = Person(_name,msg.sender,_mail,_bal,_keyword);
            bagBalance += msg.value;
            id++;
        
        }

        function getInfo(uint _id) public  view returns(string memory,address,string memory,uint,string memory)
        {
            Person memory p = People[_id];
            return (p.name,p.addr,p.mail,p.bal,p.keyword);
        }
}