const express=require("express")
const app=express();
const mongoose=require("mongoose")
const cors=require("cors");
require("dotenv").config()
const modal=require("./modal/data")
app.use(cors())
app.use(express.json())

//mongoose for connect database anf server node js via mongo db compass
const API_KEY=process.env.MONGODB_KEY
mongoose.connect(API_KEY,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.once("open",()=>{
    console.log("mongoose conencted")
})

//for get the data in monogodb and and get routes  to see fronted

app.get("/",(req,res)=>{
    const fetchData=async ()=>{
        const datas=await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json').then((val)=>val.json()).then((res)=>{
            return res
        })
        res.json(datas)
    }
    fetchData()

})






//asyncgronous fnction codefor fetchimng the third party api data
    const Userdata=async ()=>{
        const  data=await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json").then((res)=>res.json()).then((val)=>{
            return val
        })
        const insertedDatas=await modal.insertMany(data)
       
       
    
       
    
    }

  

    Userdata()


// Bind to the port specified by Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});