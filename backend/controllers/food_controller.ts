const Food = require('../models/food_model')
import mongoose from 'mongoose'

//get all foods
export const getFoods = async (req: any, res: any) => {
    const foods = await Food.find({})
    res.status(200).json(foods)
}

//get a single food
export const getFood = async (req: any, res: any) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Food not found'})
    }

    const food = await Food.findById(id)
    
    if(!food) {
        return res.status(404).json({error: 'Food not found'})
    }

    res.status(200).json(food)
} 
let emptyFields: string[]
//create a new food 
export const createFood = async (req, res) => {
    const {name, calories} = req.body

    //Show empty fields
    
    if(!name){
        emptyFields.push('name')
    }
    if(!calories){
        emptyFields.push('calories')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const food = await Food.create({name, calories})
        res.status(200).json(food)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a food
export const deleteFood = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Food not found'})
    }

    const food = await Food.findByIdAndDelete({_id: id})
    
    if(!food) {
        return res.status(404).json({error: 'Food not found'})
    }

    res.status(200).json(food)
}

//update a food
export const updateFood = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Food not found'})
    }

    const food = await Food.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    
    if(!food) {
        return res.status(404).json({error: 'Food not found'})
    }

    res.status(200).json(food)
}

module.exports = {
    createFood,
    getFood,
    getFoods,
    deleteFood,
    updateFood
}
