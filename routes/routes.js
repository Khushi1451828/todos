const express=require('express');
const router=express.Router();
const listControllers=require('../controllers/controllers');
router.get('/',listControllers.getForm);


router.post('/addItem',listControllers.addItem);
router.get('/getAllItems',listControllers.getAllItems);
router.post('/delete',listControllers.item_delete);
router.get('/getItem',listControllers.getItem);
router.post('/updateList',listControllers.updateList);
module.exports=router;