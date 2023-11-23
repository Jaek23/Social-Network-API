const {User, Thought} = require('../models');

module.exports = {
    // GET all users
    async getAllUsers(req, res){
        try{
            const users = await User.find();
            res.json(users);
        }catch(err) {
            res.status(500),json(err);
        }
    },

    // GET a single user 
    async getSingleUser(req, res){
        try {
          const user = await User.findOne({_id:req.params.UserId})
        //   .select('-__v');

          if(!user){
            return res.status(404).json({ message: 'No user with that ID' })
          }
          res.json(user);
        }catch (err) {
            res.status(500).json(err);
        }
    },

    // CREATE a user 
    async createUser(req, res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch (err){
            res.status(500).json(err);
        }
    },

    // UPDATE A USER
    async updateUser(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id:req.params.userId},
                {$set:req.body},
                {runValidators:true, new: true}
            );
            if(!user){
                res.status(404).json({message:'No user found with this id!'});
            }
            res.json(user); 
        }catch(err){
            res.status(500).json(err);
        }
    },

}