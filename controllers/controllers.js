const ListSchema=require('../Schema/ListSchema');


exports.getForm=(req,res)=>{
  ListSchema.find({}).then((result)=>{
    var temp=""
    for(let i=0;i<result.length;i++)
    {

      temp=temp+`
      <tr>
      <td>${i+1}</td>
      <td>${result[i].Id}</td>
      <td>${result[i].Title}</td>
      <td>${result[i].Description}</td>
      <td>${result[i].Completed}</td>
      </tr>
      `
    }
    res.send(`
    
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reg Form</title>
    <style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>
    <form method="post" action="/todos/addItem">
        <input name="Id" placeholder="Enter Id">
        <input name="Title" placeholder="Enter Title">
        <input name="Description" placeholder="Enter Description">
        <input name="bool" placeholder="Completed or Not">
        <h1 id='sp'></h1>
        <button>Add</button>
        <table>
          <tr>
          <th>Sr. No.</th>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
          </tr>
           ${temp}
        </table>
    </form>
</body>
</html>
`)
  })
}
exports.getAllItems=(req,res)=>{
  ListSchema.find({}).then((result)=>{
    res.status(200).send(result)
  }).catch((err)=>{
    res.status(500).send({status:500,message:"Something Went Wrong"})
  })
}

exports.getItem=async(req, res) => {
 
  
    const Id=req.query.Id;
    ListSchema.findOne({Id:Id}).then(data=>{
      if(!data)
      {
        res.status(404).send({status:404,message:"Not found user with id"+ Id})
      }else{
        res.send(data)
      }
    }).catch(err=>{
      res.status(500).send({status:500,message:"Something went wrong"});
    })
  
  
};

exports.addItem=(req,res)=>{
  const {Id,Title,Description,Completed}=req.body;

  ListSchema.insertMany({Id:Id,Title:Title,Description:Description,Completed:Completed}).then((result)=>{
    console.log(result);
    res.status(200).send({status:200,message:"item added succesfully"});
    
  }).catch((err)=>{
console.log(err.name)
console.log(err.message)
res.status(500).send({status:500,message:"something went wrong",err:err});
  })
  
}
exports.item_delete = (req,res)=>{
  const {Id}=req.body;
ListSchema.deleteOne({Id:Id}).then((result)=>{
  console.log(result)
  if(result.deletedCount==1)
  {
    res.status(202).send({status:202,message:"Deleted successfully"})
  }
  else{
    res.status(409).send({status:409,message:"Not Deleted !! Try Again"})
  }
  
}).catch((err)=>{
  console.log(err)
  res.status(500).send({status:500,message:"Something Went Wrong :::::"})
})
}

//to fetch one item bt ID----------------------------

exports.updateList=(req,res)=>{
  const {Id,Title}=req.body;
 ListSchema.updateOne({Id:Id},{$set:{Title:Title}}).then((result)=>{
     console.log(result)
     if(result.matchedCount == 1)
     {
       res.status(200).send({status:200,message:"updated succesfully"});
     }    
   else
   {
      res.status(404).send({status:404,message:"not Updated"});
   }
 }).catch((err)=>{
   res.status(500).send({status:500,message:"Something Went Wrong"})
 })
}




  

