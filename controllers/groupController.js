const { where } = require('sequelize');
const { Group, User } = require('../models');
const group = require('../models/group');

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { groupName, groupImage } = req.body;
    const userId = req.user.id;

    // 1. Create the group
    const group = await Group.create({
      groupName,
      groupImage,
      createdBy: userId
    });
console.log(Object.keys(group.__proto__));

    // 2. Add the creator as a participant
    const user = await User.findByPk(userId);
    if (user) {
      await group.addUser(user);
    }

    return res.status(201).json({
      message: 'Group created successfully',
      group
    });
  } catch (error) {
    console.error('Error creating group:', error);
    return res.status(500).json({ error: 'Failed to create group' });
  }
};

// Get all groups for a user

exports.getUserGroups  =async(req,res)=>{

  try{


const userId = req.user.id;

const user = await  User.findByPk(userId,{
  include:{

    model: Group,
    through:{attributes:[]}
    
  }
});
if(!user){
  return res.status(400).json({error:"User not found"});
}

return res.status(200).json({group:user.Groups})
  }catch(error){
    console.log(error)
res.status(500).json({error:"Failed to fetch user groups"});
  }

} 


 exports.getGroupUsers = async (req,res)=>{

  const {groupId } =req.body;

  try{

    const group = await Group.findByPk(groupId,  {
      include: [
    {
      model: User,
      attributes: { include: ['id','name','email'] },
      through: { attributes: [] }
    }
  ]});

  if(!group){

    return res.status(400).json({error:"Group not found"});

  }
    return res.status(200).json({group: group.Users});

  }catch(e){
    console.log(e);
    return res.status(400).json({error:"failed to fetch Group Users!!"});

  }
}



// Add user to a group
exports.addUserToGroup = async (req, res) => {
  try {
    const { groupId} = req.body;
const userId = req.user.id
    const group = await Group.findByPk(groupId);
    const user = await User.findByPk(userId);

    if (!group || !user) {
      return res.status(404).json({ error: 'User or Group not found' });
    }

    await group.addUser(user);

    return res.status(200).json({ message: 'User added to group successfully' });
  } catch (error) {
    console.error('Error adding user to group:', error);
    return res.status(500).json({ error: 'Failed to add user to group' });
  }
};
