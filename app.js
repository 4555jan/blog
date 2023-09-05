//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const ejs = require("ejs");



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();



app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/", function (req, res) {
 
    res.render("home", { adj: homeStartingContent, posh: posts });
    
  });





app.post("/create",function(req,res){
  res.render('compose');
    
  
})


app.get("/about",function(req,res){
  res.render("about",{adj:aboutContent });
});

app.get("/contact",function(req,res){
  res.render("contact",{adj:contactContent});
})
app.get("/compose",function(req,res){
  res.render("compose.ejs");
 
})


app.post("/compose", function (req, res) {
  const post =({
    tits: req.body.title,
    mads: req.body.text
  });                                                                                                       


  db.run("INSERT INTO posts (title, text) VALUES (?, ?)", [post.tits, post.mads], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // After successfully inserting into the database, push the post to your in-memory array
    posts.push(post);

    // Redirect to the homepage
    res.redirect("/");
  });
});

app.get("/pos/:postName",function(req,res){
  const reqtitle=req.params.postName;

  posts.forEach(function(post){
    const  stotit=post.tits;

    if (stotit==reqtitle) {
       res.render("pos" ,{
        title: post.tits,
        content: post.mads


       })

           } 
   
  });


});
app.get("/get", function (req, res) {
  // Query data from your SQLite database
  db.all("SELECT title, text FROM posts", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Pass the queried data to your EJS template
    res.render("get", { posts: rows });
  });
});

app.post("/userposts",function(req,res){
  db.all("SELECT title, text FROM posts", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Pass the queried data to your EJS template
    res.render("get", { posts: rows });
  });
 
    
  
})

app.listen(3057, function() {
  console.log("Server started on port 305");
});
