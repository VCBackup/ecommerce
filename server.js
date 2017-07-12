var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require('mongojs');

var app = express();
var db = mongo('ecommerce', ['products']);
var router = express.Router();

app.use(bodyParser.json());
app.use(router);

var proxyDB = ['Item0', 'Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8', 'Item9', 'Item10'];

app.listen(3000, function(){
    console.log('It is working my friend!');
});

app.post('/api/products', function(req, res, next){
    var newProduct = {name: '', make: 'Miada', year: 2001, owner: 'Daniel Moore', id: 352463}
    newProduct.name = req.body.name;
    res.status(200).json({message: 'This POSTS an update to a product', product: newProduct});
});

app.get('/api/products', function(req, res, next){
    res.status(200).json({message: 'This GETS the products array', database: proxyDB});
});

router.route('/api/products/:id')
    .get(function(req, res, next){
    proxyDB.findById(req.params.id, function(err, item){
        if (err){
            res.send(err);
        };
        res.status(200).json({message: 'This GETS an item from the products array', foundProduct: newProduct.id});        
    })
});

app.put('/api/products/:id', function(req, res, next){
    res.status(200).json({message: 'This PUTS a new item into the products array'});
});

app.delete('/api/products/:id', function(req, res, next){
    res.status(200).json({message: 'This DELETES an item from the products array'});
});
