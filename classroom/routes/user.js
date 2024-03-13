const express = require("express");
const router = express.Router();


//index-users
router.get("/", (req,res) => {
    res.send("GET for users");
});

//show
router.get("/:id", (req,res) => {
  res.send("GET for show id")
})

//post-user
router.post("/", (req,res) => {
    res.send("post for users")
  });

  //Delete-user
  router.delete("/:id", (req,res) => {
    res.send("delete user")
  }); 

  module.exports = router;