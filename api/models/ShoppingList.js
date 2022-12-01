import mongoose from "mongoose";

const ShoppingListSchema = new mongoose.Schema({
  text:{type:String,required:true},
  done:{type:mongoose.SchemaTypes.Boolean,required:true},
  user:{type:mongoose.SchemaTypes.ObjectId},
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

export default ShoppingList;