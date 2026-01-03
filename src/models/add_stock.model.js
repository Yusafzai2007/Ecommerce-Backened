import mongoose from "mongoose";






const stockschema=new mongoose.Schema(
    {
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product_model",
        required:true,
    },
    stock_quantity:{
        type:String,
        required:true,
    },
    add_newstock:{
        type:String,
        required:true,
        default:"0",
    },
    old_stock:{
        type:String,
        required:true,
    },
    added_at:{
        type:Date,
        default:Date.now(),
    },


   






















    },{ timestamps: true })


















































