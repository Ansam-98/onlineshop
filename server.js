const app = require('express')();

const mongoose = require('mongoose');


const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false , useNewUrlParser: true }))
 
// parse application/json
app.use(bodyParser.json())


const db = mongoose.connect('mongodb://localhost/Store' , {useNewUrlParser: true,
  useUnifiedTopology: true })

let Store = require('./model/store')
let Category = require('./model/category')
let Order = require('./model/order')


app.post('/store',function(req,res){
    
    let NewStore = new Store()
    
    NewStore._id = req.body._id;
    NewStore.TshirtName = req.body.TshirtName;
    NewStore.TshirtCategoryID = req.body.TshirtCategoryID;
    NewStore.TshirtPrice = req.body.TshirtPrice;
    NewStore.NumberOfAvailabelItems = req.body.NumberOfAvailabelItems;
    NewStore.category = req.body.category;
    NewStore.order = req.body.order;
    
    NewStore.save(function(err,SavedStore){
        
        if(err){
            res.status(500).send({error:"Couldn't add store"})
        }
        
        else{
            res.send(SavedStore)
        }
    })
    
    
    
    
    
})


app.get('/store', function(req,res){
//    Store.find({},function(err,Store){
//        if(err){
//            res.status(500).send({Error:"Couldn't get Store"})
//        }
//       else{
//            res.send(Store)
//        }
//    })
//    
//})

    
    
    
    Store.find({}).populate({
    path:'orders',
    model:'Order',
    
}).exec(function(err,stores){
    if(err){
        res.status(500).send({error:"couldn't get order"})
    } else{
        res.send(stores);
    }
})
    
 

})




app.put('/store/order/add',function(req,res){
    
    let orderID = req.body.orderId
    let storeID = req.body.storeId
    
      
    Order.findOne({_id :orderID },function(err,order){
        if(err){
            res.status(500).send({error:"couldn't add order"})
        } else{ Store.updateOne({_id : storeID} ,{$inc: { NumberOfAvailabelItems: -1 } ,$addToSet : {orders : order._id }},function(err, status ){
            if(err){
               res.status(500).send({error:"couldn't add stores"}) 
            } else{
                res.send(status)
            }
        })
            
              }
    })
})
    
   
    
//    app.put('/store/category/add',function(req,res){
//    
//    let categoryID = req.body.categoryId
//   
//  let storeID = req.body.storeId
//   
//   
//    Category.findOne({_id :categoryID },function(err,category){
//        if(err){
//            res.status(500).send({error:"couldn't add category"})
//      } else{ Store.updateOne({_id : storeID} ,{$addToSet : {categorys : category._id}},function(err, status ){
//            if(err){
//               res.status(500).send({error:"couldn't add store"}) 
//           } else{
//                res.send(status)
//            }
//        })
//            
//        }
//    })
//})



app.post('/category', function(req,res){
    ;
    let NewCategoty = new Category()
   
    NewCategoty._id = req.body._id ;
    NewCategoty.CategoryName = req.body.CategoryName;
    
     NewCategoty.save(function(err,SavedCategory){
        
        if(err){
           res.status(500).send({error:"Couldn't add category"})
        }
       
        else{
            res.send(SavedCategory)
       }
    })
    
   
    
})


app.get('/category',function(req,res){
    
   Category.find({},function(err,categorys){
        if(err){
           res.status(500).send({Error:"Couldn't get category"})
        }
        else{
           res.send(categorys)
        }
    })
     
    
})



app.post('/order',function(req,res){
    
    let NewOrder = new Order()
    
    NewOrder._ID = req.body._ID;
    NewOrder.OrderName = req.body.OrderName;
    NewOrder.TshirtID = req.body.TshirtID;
    NewOrder.OrderDateTime = req.body.OrderDateTime;
    NewOrder.CustomerPhoneNumber = req.body.CustomerPhoneNumber;
    
      NewOrder.save(function(err,SavedOrder){
        
        if(err){
            res.status(500).send({error:"Couldn't add Order"})
        }
        
        else{
            res.send(SavedOrder)
        }
    })
    
})


app.get('/order',function(req,res){
    
    Order.find({},function(err,orders){
        if(err){
            res.status(500).send({Error:"Couldn't get order"})
        }
        else{
            res.send(orders)
        }
    })
    
})

















app.listen(3000,function(){
    
    console.log("server is running in port 3000")
})
 