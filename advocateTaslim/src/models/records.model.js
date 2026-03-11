import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  CustomerId: String,
  FirstName: String,
  LastName: String,
  Company: String,
  City: String,
  Country: String,
  Phone1 : String ,
  Phone2 : String,
  Email : String,
  SubscriptionDate : Date,
  Website : String





});

export const Record = mongoose.model("Record", RecordSchema);
