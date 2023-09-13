// IMporting Express
require('dotenv').config();
const express = require('express')
//Creatinng our server by calling express
const cors = require('cors')
const app = express()
//above 1024
const port = process.env.PORT;
let count = 0;
const fruits = require('./fruits.json')
//middleware - code that is exexuted between code and ....
//authentification -middleware
//next() make it move on to the next middleware
app.use(cors())
app.use(express.json())
 function getid(){
  fruits.forEach(fruits=> {if(fruits.id>count){ count = fruits.id
  }})
 //alternatate way of above
  const ids = fruits.map(fruit=> fruit.id);
let maxID = Math.max(...ids);
 }
 getid()
// crete route - GET route 
// [server].[method]('<path>', callback)
// req(request)/ res (response)
app.get('/', (req, res) => {
  res.send('hello, Fruity')
})
//Route to return all fruits
app.get('/fruits', (req, res)=> {
  res.send(fruits)
})

//Route to return a specifiic fruit and its info
//: <property> -> dynamic parameter
app.get('/fruits/:name', (req, res) => {
  
  const name = req.params.name.toLowerCase()
 const fruit=fruits.find(fruits => fruits.name.toLowerCase() == name);
  

   fruit == undefined ?  res.status(404).send(`Are you sure you entered a fruit because I can not  find a ${name}`) : res.send(fruit)

})


//add a new poece of fruit to the date
app.post('/fruits', (req, res)=>{
  const nfruit = req.body

  const matching = fruits.find((fruit) =>  fruit.name.toLowerCase( )== nfruit.name.toLowerCase())
 console.log(`matching ${matching}`)
  if(matching==undefined){
   count++
   nfruit.id = count
   fruits.push(nfruit)
   //
    res.status(201).send(`new fruit ceated ${nfruit.name}`)
  }else{
    res.status(409).send(`fruit already exits `)
  }
  
  

})




//bind the server to a port 
//app.listen(<port>, () => {})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//localhost 