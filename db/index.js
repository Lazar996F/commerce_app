const mysql = require('mysql');


const pool = mysql.createPool ({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'commerceshop',
    host:'localhost',
    port: '3306'
});



let commerce = {};

commerce.all = () => {

    return new Promise ((resolve,reject) => {

        pool.query(`SELECT i.id, i.name, i.item_price, it.type_name FROM items AS i INNER JOIN items_type AS it ON i.item_type_id = it.id`, (error,results) => {
            if(error){
                return reject(error);
            }

            return resolve(results);
        });
    });
};

//SVI PRODATI ITEMI
commerce.soldAll = () => {

    return new Promise ((resolve,reject) => {
        pool.query(`SELECT si.id, i.name, it.type_name, i.item_price, si.date_sold FROM sold_items AS si INNER JOIN items AS i ON si.item_id=i.id INNER JOIN items_type AS it ON i.item_type_id=it.id`, (error,results) => {
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};


commerce.addSale = (items,newDate) => {
    return new Promise ((resolve,reject) => {

        let queryString = `INSERT INTO sold_items (item_id,date_sold) VALUES `

        items.forEach((item, index) => {
            if(items.length-1 == index)
           {
               queryString += `(${item.item_id},'${newDate}');`

           } else
           {
            queryString += `(${item.item_id},'${newDate}'), `
           }


        });

        pool.query( queryString, (error,results) => {
            
            if(error){
                return resolve({status: "faild",
                    error: error});
            }
                return resolve({ status: "success", data: { items }});
        });
    });
};

module.exports= commerce;