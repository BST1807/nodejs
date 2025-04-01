const express= require("express")
const fs = require("fs");
const app= express();
const port=8000;
const users=require('./MOCK_DATA.json')
app.use(express.urlencoded({extended:false}));//this makes the url-encoded data availabe in req.body
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.get('/users',(req,res)=>{
  res.json(users);
})
app.get('/html/users', (req, res) => {
  const html = `
    <ul>
      ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html); // Use res.send instead of res.json for HTML response
});

app.get('/users/:id',(req,res)=>{
  console.log(req.params);
  console.log("Received Request: ", req.url);
  const id = parseInt(req.params.id);
  res.json(users.find(user=>user.id==id));
})
app.post('/users',(req,res)=>{
  const body=req.body;
  users.push({...body,id:users.length+1});
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    res.json({ message: "User data received", data: body })
  })
})
app.delete('/users/:id',(req,res)=>{
  const id=parseInt(req.params.id);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })