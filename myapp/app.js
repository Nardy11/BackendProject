var express = require('express');
const { Db, ObjectId } = require('mongodb');
var path = require('path');
var sessions = require('express-session');
const cookieParser=require("cookie-parser");
const console = require('console');
var app = express();
const name=[];//contain the names of the currentusers
let actios=[];//contains all the places the user wanna visit
const searches=[];//stores the words that user use to search for specific place
var appear1=[];//contains boolean array for places that have similar letters
let fromreg=false;//shows if the user just registered and if yes a congratulation will appear
const MongoClient = require('mongodb').MongoClient;
// view engine setup
oneDay=1000*60*60*24
app.use(sessions({resave:false,saveUninitialized:true,secret:'anyrandomstring',cookie:{maxAge:oneDay}}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
//const myusername="admin";
//const mypassword="admin";

var session

app.get('/', function(req,res){
  if (fromreg){
    res.render('login',{login_message:"Congratulations you have registered successfully..."})
  }else{
res.render('login',{login_message:""})}
});
app.get('/bali' , function(req,res){
if(!req.session.userid  && name.at(name.length-1)!="admin"){
    res.redirect('/');
  return;
  }
  if(name.length>0){
 res.render('bali',{message:" "});
}else{
  res.redirect('/');
}
});
app.get('/cities' , function(req,res){
  if(!req.session.userid  && name.at(name.length-1)!="admin"){
    res.redirect('/');
  return;
  }
  if(name.length>0){
    res.render('cities')
  }else{
    res.redirect('/')
  }
});
app.get('/hiking' , function(req,res){
  if(!req.session.userid  && name.at(name.length-1)!="admin"){
    res.redirect('/');
  return;
  }
  if(name.length>0){
    res.render('hiking')
  }else{
    res.redirect('/')
  }
});
app.get('/annapurna' , function(req,res){
  if(!req.session.userid  && name.at(name.length-1)!="admin"){
    res.redirect('/');
  return;
  }
  if(name.length>0){
 res.render('annapurna',{message:" "});
  }else{
    res.redirect('/')
  }
});
app.get('/inca' , function(req,res){
  if(!req.session.userid  && name.at(name.length-1)!="admin"){
    res.redirect('/');
  return;
  }
  if(name.length>0){
 res.render('inca',{message:" "});
  }else{
    res.redirect('/')
  }});
app.get('/islands' , function(req,res){
  if(!req.session.userid && name.at(name.length-1)!="admin"){
    res.redirect('/');
  return;
  }
  if(name.length>0){
    res.render('islands')
  }else{
    res.redirect('/')
  }});
  app.get('/home' , function(req,res){
    if(!(req.session.userid) && name.at(name.length-1)!="admin"){
      res.redirect('/');
    return;
    }
    if(name.length>0 && name.at(name.length-1)!="admin"){
      session.actios = [];
      MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
        if(err)throw err;
        var db = client.db('myDB');
        if(await (db.collection("myCollection").count({username:session.userid,"Actions":"paris"}))===1){
          if (!(session.actios.includes("paris")))
          session.actios.push("paris");
        }
        if(await (db.collection("myCollection").count({username:session.userid,"Actions":"bali"}))===1){
          if (!(session.actios.includes("bali")))
          session.actios.push("bali");
        }
        if(await (db.collection("myCollection").count({username:session.userid,"Actions":"inca"}))===1){
          if (!(session.actios.includes("inca")))
          session.actios.push("inca");
        }
        if(await (db.collection("myCollection").count({username:session.userid,"Actions":"annapurna"}))===1){
          if (!(session.actios.includes("annapurna")))
          session.actios.push("annapurna");
        }
        if(await (db.collection("myCollection").count({username:session.userid,"Actions":"rome"}))===1){
      if (!(session.actios.includes("rome")))
      session.actios.push("rome");
    }
    if(await (db.collection("myCollection").count({username:session.userid,"Actions":"santorini"}))===1){
      if (!(session.actios.includes("santorini")))
      session.actios.push("santorini");
    }
    //req.session.actios=actios;
   // session.actios = actios;
    //actios=[];
   // console.log(session.actios);
   // console.log(actios);

  });
  res.render('home',{home:""})
}else{
  if(name.at(name.length-1)=="admin"){
    res.render('home',{home:""})
  }else{
  res.redirect('/')
}}});
app.get('/paris' , function(req,res){
  if(name.at(name.length-1)=="admin"){
    res.render('paris',{message:" "})
  }else{
  if(!req.session.userid){
    res.redirect('/');
  return;
  }
  if(name.length>0){
 res.render('paris',{message:" "});
  }else{
    res.redirect('/')
  }}});
app.get('/registration' , function(req,res){
 res.render('registration',{register_message:""})
});
app.get('/rome' , function(req,res){
  if(name.at(name.length-1)=="admin"){
    res.render('rome',{message:" "})
  }else{
  if(!req.session.userid){
    res.redirect('/');
  return;
  }
  if(name.length>0){
 res.render('rome',{message:" "});
  }else{
    res.redirect('/')
  }}});
app.get('/santorini' , function(req,res){
  if(name.at(name.length-1)=="admin"){
    res.render('santorini',{message:" "})
  }else{
  if(!req.session.userid){
    res.redirect('/');
  return;
  }
  if(name.length>0){
 res.render('santorini',{message:" "});
  }else{
    res.redirect('/')
  }}});
app.get('/search' , function(req,res){
  if(!req.session.userid &&name.at(name.at(name.length-1))!="admin"){
    res.redirect('/');
  return;
  }
  if(name.length>0){
    if('paris'.includes(searches[searches.length-1])){
      appear1.push("true");
    }
    else{
      appear1.push("false");
    }
    if('rome'.includes(searches[searches.length-1])){
      appear1.push("true");
    
       }
       else{
        appear1.push("false");
      }
    if('inca'.includes(searches[searches.length-1])){
      appear1.push("true");
       }else{
        appear1.push("false");
      }
    if('santorini'.includes(searches[searches.length-1])){
      appear1.push("true");
    
       }else{
        appear1.push("false");
      }
    if('annapurna'.includes(searches[searches.length-1])){
      appear1.push("true");
       }else{
        appear1.push("false");
      }
    if('bali'.includes(searches[searches.length-1])){
      appear1.push("true");
       }else{
        appear1.push("false");
      }
    res.render('searchresults',{appear:appear1})
    appear1=[];
  }else{
    res.redirect('/')
  }});
app.post('/search', function(req,res){
var searched=req.body.Search.toLowerCase();
searches.push(searched);
res.redirect("/search");
});

app.get('/wanttogo' ,async function(req,res){
  if(!req.session.userid  &&name.at(name.at(name.length-1))!="admin"){
    res.redirect('/');
  return;
  }
  if(name.length>0){
    if(name.at(0)==="admin"){
      var list =actios;
      res.render('wanttogo',{list})
    }else{
  MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
    if(err)throw err;
    var db = client.db('myDB');
     db.collection("myCollection").findOne({username:req.session.userid},(err,result)=>
     {
      
      
      if(name.length>0){
        var list = session.actios;
        list=result.Actions;
        console.log("log in "+session. userid)
        console.log("log in "+list);

        res.render('wanttogo',{list})
  }else{
        res.redirect('/')
    }
     });
 
 }); 
    }}





   
  });

app.post('/' , function(req,res){
  const username= req.body.username;
  var password=  req.body.password;
  MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
   if(err)throw err;
   var db = client.db('myDB');
   if(username==='admin'&&password==='admin'){
    name.push(username);
    res.redirect("/home");
   }
   else{
   if(await(db.collection("myCollection").count({username: `${username}`,Password: `${password}`}))===1){
    //session.userid=(await(db.collection("myCollection").find({username: `${username}`,Password: `${password}`},{projection:{_id: 1,username:0,Password:0,Actions:0}}).toArray()));
    //session.userid=session.userid[0]._id.toString();
    //console.log(req.session.actios);
    session = req.session
    session.userid = req.body.username
    //req.session.username=req.body.username;
    //req.session.password=req.body.password;
    name.push(username);

    res.redirect("/home");
  }
    else{
        if(username == '' || password =='')
        {
          res.render('login',{login_message:"Please Enter the Username & the Password"})
        }
    else{
    res.render('login',{login_message:"Please Try Again Password or username might be wrong"})
  }
}
   }
}); 
});
app.post('/registration' , function(req,res){
  var usernameregistered= req.body.username;
  var passwordregistered= req.body.password;
  if(usernameregistered == '' || passwordregistered =='')
    {
      res.render('registration',{register_message:"Please Enter the Username & the Password"})
    }
    else{ 
    MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
     if(err)throw err;
     var db = client.db('myDB');
    if( await(db.collection("myCollection").count({username: `${usernameregistered}`}))===1){
      res.render('registration',{register_message:"Already Exist , Try Again"})
    }
    else{
      db.collection("myCollection").insertOne({username: `${usernameregistered}`,Password:`${passwordregistered}`,Actions:[]});
      fromreg=true;
      res.redirect("/")
    }
  });  
}
});
app.post('/bali' , function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  if(name.at(name.length-1)=="admin"){
    if (!(actios.includes("bali"))){
         actios.push("bali");
        res.render('bali',{message:" Added to the list"});
    }
      else{
      res.render('bali',{message:" Already on the list !"});
      }
  }
  else{
  MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
    if(err)throw err;
    var db = client.db('myDB');
    if (!(session.actios.includes("bali"))){
  db.collection("myCollection").updateOne({username:session.userid},{$addToSet :{"Actions":`bali`}});
  session.actios.push("bali");
    res.render('bali',{message:" Added to the list"});
}
  else{
  res.render('bali',{message:" Already on the list !"});
  }
})}
});
app.post('/paris' , function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  if(name.at(name.length-1)=="admin"){
    if (!(actios.includes("paris"))){
      actios.push("paris");
      res.render('paris',{message:" Added to the list"});}
      else{
      res.render('paris',{message:" Already on the list !"});
      }
  }else{
  MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
    if(err)throw err;
    var db = client.db('myDB');
    if (!(session.actios.includes("paris"))){
  db.collection("myCollection").updateOne({username:session.userid},{$addToSet :{"Actions":`paris`}});
  session.actios.push("paris");
  res.render('paris',{message:" Added to the list"});}
  else{
  res.render('paris',{message:" Already on the list !"});
  }});}
});
app.post('/rome' , function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  if(name.at(name.length-1)=="admin"){
    if (!(actios.includes("rome"))){
       actios.push("rome");
      res.render('rome',{message:" Added to the list"});}
      else{
      res.render('rome',{message:" Already on the list !"});
      }
   
}else{
  MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
    if(err)throw err;
    var db = client.db('myDB');
    if (!(session.actios.includes("rome"))){
  db.collection("myCollection").updateOne({username:session.userid},{$addToSet :{"Actions":`rome`}});
  session.actios.push("rome");
  res.render('rome',{message:" Added to the list"});}
  else{
  res.render('rome',{message:" Already on the list !"});
  }});}
});
app.post('/santorini' , function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  if(name.at(name.length-1)=="admin"){
    if (!(actios.includes("santorini"))){
       actios.push("santorini");
      res.render('santorini',{message:" Added to the list"});}
      else{
      res.render('santorini',{message:" Already on the list !"});
      }
  }else{
  MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
    if(err)throw err;
    var db = client.db('myDB');
    if (!(session.actios.includes("santorini"))){
  db.collection("myCollection").updateOne({username:session.userid},{$addToSet :{"Actions":`santorini`}});
  session.actios.push("santorini");
  res.render('santorini',{message:" Added to the list"});}
  else{
  res.render('santorini',{message:" Already on the list !"});
  }});}
});
app.post('/inca' , function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  if(name.at(name.length-1)=="admin"){
    if (!(actios.includes("inca"))){
      actios.push("inca");
      res.render('inca',{message:" Added to the list"});
    }
      else{
      res.render('inca',{message:" Already on the list !"});
      }
  }else{
  MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
    if(err)throw err;
    var db = client.db('myDB');
    if (!(session.actios.includes("inca"))){
  db.collection("myCollection").updateOne({username:session.userid},{$addToSet :{"Actions":`inca`}});
  session.actios.push("inca");
  res.render('inca',{message:" Added to the list"});
}
  else{
  res.render('inca',{message:" Already on the list !"});
  }});}
});
app.post('/annapurna' , function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  if(name.at(name.length-1)=="admin"){
    if (!(actios.includes("annapurna"))){
       actios.push("annapurna");
      res.render('annapurna',{message:" Added to the list"});}
      else{
      res.render('annapurna',{message:" Already on the list !"});
      }  

  }else{
  MongoClient.connect("mongodb://0.0.0.0:27017",async function(err,client) {
    if(err)throw err;
    var db = client.db('myDB');
    if (!(session.actios.includes("annapurna"))){
  db.collection("myCollection").updateOne({username:session.userid},{$addToSet :{"Actions":`annapurna`}});
  session.actios.push("annapurna");
  res.render('annapurna',{message:" Added to the list"});}
  else{
  res.render('annapurna',{message:" Already on the list !"});
  }  
});}
});
function addtowanttogo(dist){
   
}
app.listen(3000);
