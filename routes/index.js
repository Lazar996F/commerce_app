const express = require('express');
const db = require('../db');

const router = express.Router();

// LISTA SVIH ITEMA
router.get('/items', async (req,res) => {

    try{ 
        let results= await db.allItems();
        res.json(results);
         
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.post('/add/sale', async (req,res) => {
    
    try{
        let add = await db.addSale(req.body.items,req.body.date_sold);
        res.json(add);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/sold', async (req,res,next) => {

    try{
        let results= await db.soldAll();
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/sold/bs', async (req,res) => {
    try{
        let results= await db.bestSeller();
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});



router.get('/sold/3x', async (req,res) => {
    try{
        let results= await db.mostExpensive();
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.get('/sold/:month', async (req,res) => {
    try{
        let results= await db.dateSold(req.params.month);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/types', async (req,res) => {
    try{
        let results= await db.types();
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/types/:typeX', async (req,res) => {
    try{
        let results= await db.oneType(req.params.typeX);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.post('/new/item', async (req,res) => {
    try{

            let add = await db.addItem(req.body.name,req.body.item_type_id, req.body.price);
            res.json(add);   
    
       
            
    }catch(e) {
        res.sendStatus(500);
    }
});



router.delete('/delete', async (req,res) => {
    try{
        let del = await db.deleteItem(req.body.id);
        res.json(del);
    }catch(e) {
        console.log('greska',e);
        res.sendStatus(500);
    }
});



router.put('/edit', async (req,res) => {
    try{
        let edd = await db.editItem(req.body.name,req.body.item_type_id,req.body.price,req.body.id);
        res.json(edd);
    }catch(e){
        res.sendStatus(500);
    }
});


router.post('/upload', async(req,res)=> {
    try{
        let upld= await db.(req.body.image, req.body.id)

    }catch(e){
        res.sendStatus(404);
    }
})




module.exports = router;