const Blog = require("../models/blog")
const {Router} = require("express")
const router = Router()
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
  res.render("addblogs",{user : req.user})
})

router.post("/add-new", upload.single("coverImage"), async (req, res) => {
  const {title,body} = req.body
  const blog = await Blog.create({
    title : title,
    body : body,
    createdBy : req.user,
    coverImage : `/uploads/${req.file.filename}`,

  })
  console.log(blog);
  return res.redirect(`/blog/${Blog._id}`)
})

router.get("/:id",async(req,res)=>{
  const blog = await  Blog.findById(req.params.id).populate("createdBy")
  res.render("readblogs",{user : req.user , blogs : blog})
})

module.exports = router