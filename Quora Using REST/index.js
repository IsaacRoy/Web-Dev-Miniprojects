    const express = require("express");
    const app = express();
    const path = require("path");
    const { v4: uuidv4} = require('uuid');
    const methodOverride = require("method-override");

    app.use(express.urlencoded({extended:true}));//For parsing user submitted form.

    app.set("view engine","ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(methodOverride("_method"));

    const port = 8080;

    app.listen(port,()=>{
        console.log("Listening Port : 8080");
    });
    //__________________________________________________________________

    let posts = [
        {
            id : uuidv4(),
            username : "Isaac",
            content : "I love coding"
        },
        {
            id : uuidv4(),
            username : "Niranjan V",
            content : "Ok go and sleep"
        },
        {
            id : uuidv4(),
            username : "Sam Joe",
            content : "I am the God!"
        }
    ];

    app.get("/posts/new", (req, res) => {
        res.render("new.ejs");
    }); 

    app.get("/posts",(req,res)=>{
        res.render("index.ejs",{posts});
    });

    app.get("/posts/:id", (req, res) => {
        let { id } = req.params;
        console.log("Requested ID:", id); // Debugging
        let post = posts.find((p) => id === p.id);
        if (!post) {
            console.log("Post not found for ID:", id); // Additional Debugging
            return res.status(404).send("Post not found");
        }
        res.render("show.ejs", { post });
    });

    app.get("/posts/:id/edit",(req,res)=>{
        let {id} = req.params;
        let post = posts.find((p)=>id === p.id);
        res.render("edit.ejs",{post});
    });
    
    app.post("/posts",(req,res)=>{
        let {username,content} = req.body;
        let id = uuidv4();
        posts.push({id,username,content});
        console.log(req.body);
        res.redirect("/posts");
    });

    app.patch("/posts/:id", (req, res) => {
        let { id } = req.params;
        console.log("PATCH Request ID:", id);
    
        let post = posts.find((p) => p.id === id);
        if (!post) {
            console.log("Post not found for ID:", id);
            return res.status(404).send("Post not found");
        }
    
        let newContent = req.body.content;
        console.log("New Content:", newContent);
    
        if (!newContent) {
            console.log("No content provided in body");
            return res.status(400).send("Content is required");
        }
    
        post.content = newContent;
        console.log("Updated Post:", post);
        res.redirect("/posts");
    });

    app.delete("/posts/:id",(req,res)=>{
        let {id} = req.params;
        posts = posts.filter((p)=>id !== p.id);
        res.redirect("/posts");
    });

    
    
    