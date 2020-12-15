const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());
const posts=require('./initialData');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
let numberofApiCalls=0;
let initialMax=null;
app.get('/api/posts',(req,res)=>{

    if(numberofApiCalls>5){
        res.status(429).send({message:"Exceed Number of API Calls"})
       return ;
    }

    const parsedMax=Number(req.query.max||10)
    const max=parsedMax>20?10:parsedMax;
    let finalMax=max;
    if(initialMax==null){
        finalMax=Math.max(finalMax,initialMax)

    }
    const topMax=posts.filter((value,Idx)=>{
    Idx<max
    })
    res.send(topMax);
    if(initialmax==null){
        initialMax==max;
        numberofApiCalls++;
        setTimeout(()=>{
          initialMax=null;
          numberofApiCalls=0;
        },3*10000)
    }else{
        numberofApiCalls++;
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
