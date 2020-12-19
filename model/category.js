const mongoose = require('mongoose');
let schema = mongoose.Schema;



let category = new schema ({
    
    _id : Number,
    CategoryName : String
    
})

module.exports =  mongoose.model('Category',category);