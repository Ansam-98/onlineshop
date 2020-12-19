const mongoose = require('mongoose');
let schema = mongoose.Schema;


let order = new schema ({
    
    _ID : Number,
    OrderName : String,
    TshirtID : Number,
    OrderDateTime : Date,
    CustomerPhoneNumber : Number 
    
})

module.exports =  mongoose.model('Order',order);