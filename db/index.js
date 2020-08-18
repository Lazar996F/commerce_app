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

commerce.allItems = () => {

    return new Promise ((resolve,reject) => {

        pool.query(`SELECT i.id, i.name, i.item_price, it.type_name FROM items AS i INNER JOIN items_type AS it ON i.item_type_id = it.id WHERE is_deleted=0`, (error,results) => {
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

commerce.bestSeller = () => {
    return new Promise ((resolve,reject) => {
        pool.query(`SELECT item_id, items.name, items.item_price, COUNT(sold_items.id) bs FROM sold_items INNER JOIN items ON items.id=item_id GROUP BY item_id,items.name, items.item_price ORDER BY bs DESC`, (error,results) => {
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

commerce.mostExpensive = () => {
    return new Promise ((resolve,reject) => {
        pool.query(`SELECT item_id,name,item_price, COUNT (sold_items.id) number FROM sold_items INNER JOIN items ON items.id = item_id GROUP BY item_id,items.name HAVING COUNT(sold_items.id)>=3 ORDER BY item_price DESC`, (error,results) => {
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

commerce.dateSold = (month) => {
    return new Promise ((resolve,reject) => {

        pool.query(`SELECT item_id,date_sold,items.name FROM sold_items INNER JOIN items ON items.id=item_id WHERE MONTH(date_sold)!=? GROUP BY items.name`,[month], (error,results) => {
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

commerce.types = () => {
    return new Promise ((resolve,reject) => {
        pool.query(`SELECT id,type_name FROM items_type;`, (error,results) => {
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};


commerce.addItem = (name,typeID,price) => {
    return new Promise ((resolve,reject) => {

        pool.query(`INSERT INTO items (name,item_type_id,item_price,is_deleted) VALUES ('${name}',${typeID},${price},0);`, (error,results) => {

            if(error){
                return resolve({status: "faild",
                    error: error});
            }
                return resolve({ status: "success"});
        });
    });
};

commerce.deleteItem = (delID) => {

    return new Promise ((resolve,reject)=> {
        pool.query(`UPDATE items SET is_deleted=1 WHERE id=${delID}`, (error,results) => {

            if(error){
                return resolve({status: "faild", error:error});
            }
            return resolve({status:"success"});
        });
    });
};


module.exports= commerce;