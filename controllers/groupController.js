const { Group} = require('../models');


const createGroup = async(req,res,)=>{

const {groupName,groupImage}= req.body;

if(!groupName){

    return res.status(400).json({message:"Group Name cannot be empty"});
}
try{
   const userId = req.user.id;
const group = await  Group.create({
    

    groupName:groupName,
    createdBy: userId,
      participants: [userId], 
      totalAmountSpend: 0,
      groupImage, 

});
return res.status(200).json({message: "Group created!!"});

}catch(e){
    console.log(e);
return res.status(500).json({message:"Something went wrong ! "});

}

}
module.exports={createGroup};