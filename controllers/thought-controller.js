const {User, Thought} = require('../models');

module.exports = {
    // GET all thoughts 
    async getAllThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },

    // GET a single thought
    async getSingleThought(req, res){
        try{
            const thought = await Thought.findOne({_id:req.params.UserId})
            .select('-__v');

            if(!thought){
                return res.status(404).json({message:'No thought found'})
            }
            res.json(thought);
        }catch (err){
            res.status(500).json(err);
        }
    },
}