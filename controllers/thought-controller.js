const {User, Thought, Reaction} = require('../models');

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
            const thought = await Thought.findOne({_id:req.params.thoughtId})

            if(!thought){
                return res.status(404).json({message:'No thought found'})
            }
            res.json(thought);
        }catch (err){
            res.status(500).json(err);
        }
    },

    // CREATE a thought
    async createThought(req, res){
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },

    // UPDATE a thought 
    async updateThought(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$set:req.body},
                {runValidators:true, new: true}
            );
            if(!thought){
                res.status(404).json({message:'No thuoght found with this id!'});
            }
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },

    // DELETE a thought 
    async deleteThought(req, res){
        try{
            const thought = await Thought.findOneAndDelete({_id:req.params.thoughtId});
           
            if(!thought){
                return res.status(404).json({message:'No thought found with this ID!'})
            }
            res.json({message:'Thought deleted successfully'});
        }catch(err){
            res.status(500).json(err);
        }
    },

    // CREATE a reaction 
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

        if (!thought) {
            return res
            .status(404)
            .json({ message: 'No thought found with this ID :(' });
        }

        res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // DELETE a reaction
    async deleteReaction(req, res) {
        try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }

        res.json({message:'Reaction deleted successfully'});
        } catch (err) {
        res.status(500).json(err);
        }
    },
};

    