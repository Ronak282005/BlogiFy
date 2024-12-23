const express = require("express")
const app = express()
const path = require("path")
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const blog = require("./models/blog")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthenticateCookie } = require("./middlewares/authentication")

mongoose.connect("mongodb+srv://ronakcoder340:2005@cluster0.jy89n.mongodb.net/blogify").then((e)=>{
    console.log("mongodb connected succesfully");
})

app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))
app.use(express.static(path.resolve("./public")))
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(checkForAuthenticateCookie("token"))



app.get("/",async (req,res)=>{
    const allBlogs =  await blog.find({})
    res.render("home",{user : req.user,blogs : allBlogs})
})

app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(8080,()=>{
    console.log("server listening on port 8080");
})