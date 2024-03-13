const express = require("express");
const router = express.Router();


//posts
router.get("/", (req,res) => {
    res.send("GET for posts");
});

//show-posts
router.get("/:id", (req,res) => {
  res.send("GET for show posts")
});

//post-new post add
router.post("/", (req,res) => {
    res.send("post for posts")
  });

  //Delete-posts
  router.delete("/:id", (req,res) => {
    res.send("delete user")
  }); 

  module.exports = router;