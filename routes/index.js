const express = require('express');
const db = require('../db');

const router = express.Router();

// LISTA SVIH ITEMA
router.get('/items', async (req,res) => {

    try{ 
        let results= await db.all();
        res.json(results);
         
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// UPIS NOVOG ITEMA
router.post('/add/sale', async (req,res) => {
    try{
        let add = await db.addSale(req.body.items,req.body.date_sold);
        res.json(add);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/sold', async (req,res) => {

    try{
        let results= await db.soldAll();
        res.json(results); // promjenjiva kupi iz baze sve
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;