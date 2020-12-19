const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
let schema = mongoose.Schema;


let store = new schema ({
    
    _id : Number,
    TshirtName : String,
    TshirtCategoryID : Number,
    TshirtPrice : String,
    NumberOfAvailabelItems : Number,
    categorys : [{type:objectId,ref:'Category'}] ,
    orders : [{type:objectId,ref:'Order'}]

    
})


module.exports =  mongoose.model('Store',store);