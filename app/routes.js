
var Food = require('./models/food');

function getFood(res) {
    Food.find(function (err, food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(food); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    //get all food items

    app.get('/api/food', function(req,res) {
        getFood(res);
    });

    //get total
    app.get('/api/total', function (req, res) {
        Food.aggregate ({ 
            $group: { 
                _id: '', 
                subTotal: {$sum: '$price'}
                
                
            } 
        }, 
        {    
            $project: { 
                 
                taxTotal: {
                     
                    $sum: { 
                        $multiply: ["$subTotal",0.075]
                    }
                    
                },
                
                subTotal : "$subTotal"
            } 
        }, function(err, result){
        if(err)
            res.send(err);
        res.json(result);
    });
    });

    
    //create food
    app.post('/api/food', function (req, res) {
        Food.create({
            name: req.body.name,
            price: req.body.price,
            done: false
        }, function(err, todo) {
            if(err)
                res.send(err);
            getFood(res);
        });
    });
    
    //delete a food item

    app.delete('/api/food/:food_id', function(req,res) {
        Food.remove({
            _id: req.params.food_id
        }, function(err, food) {
            if(err)
                res.send(err);
            getFood(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};