import express from 'express';
import {createFood, getFood, getFoods, deleteFood, updateFood} from '../controllers/food_controller'
const router = express.Router();

router.get('/', getFoods)

router.get('/:id', getFood)

router.post('/', createFood)

router.delete('/:id', deleteFood)

router.patch('/:id', updateFood)

module.exports = router