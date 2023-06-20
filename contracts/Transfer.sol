// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Transfer{
    uint public bagBalance;   
    uint public myBalance;
    uint id = 0;
    mapping(address=>uint)private addressId;
    mapping(address=>uint) private balDep;

    struct Person{
        string  name;
        address addr;
        string mail;
        uint bal;
        string keyword;

    } mapping  (uint=>Person)  People;

    function  Donation(string memory _name,string memory _mail,uint _bal, string memory _keyword) public 
        {
                        
            People[id] = Person(_name,msg.sender,_mail,_bal,_keyword);                        
        
        }
        function deposit()external payable{
            require(msg.value >0,"Deposit more than ZERO ");
            bagBalance += msg.value;  
            myBalance+=msg.value;          
            addressId[msg.sender] =id;

        }

        // function getInfo(uint _id) public  view returns(string memory,address,string memory,uint,string memory)
        // {
        //     Person memory p = People[_id];
        //     return (p.name,p.addr,p.mail,p.bal,p.keyword);
        // }
        function getInfo(address _sender) public view returns(uint)
            {
                _sender = msg.sender;
                return balDep[_sender];
            }
        function BagBal() public view returns(uint)
            {
                return bagBalance;
            }
}