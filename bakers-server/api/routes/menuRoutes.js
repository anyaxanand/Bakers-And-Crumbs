// const express = require("express");
// const Menu=require("../models/Menu")

// const router =express.Router();
// const menuController=require('../controllers/menuController')
// //get all menu items
// router.get('/',menuController.getAllMenuItems)
// //post a menu item
// router.post('/',menuController.postMenuItem)
// //delete a menu item
// router.delete('/:id',menuController.deleteMenuItem)

// module.exports=router;

const express = require("express");
const menuController = require('../controllers/menuController');

const router = express.Router();

// Get all menu items
router.get('/', menuController.getAllMenuItems);

// Post a menu item
router.post('/', menuController.postMenuItem);

// Delete a menu item
router.delete('/:id', menuController.deleteMenuItem);

//get single menu item

router.get('/:id',menuController.singleMenuItem)

//update menu item
router.patch('/:id',menuController.updateMenuItem)

module.exports = router;
