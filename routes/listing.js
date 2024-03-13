const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index,create
router
 .route("/")
 .get(wrapAsync(listingController.index))
 .post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing));
// .post( (req,res) => {
//   res.send(req.file);
// });

  //new route
router.get("/new", isLoggedIn, listingController.renderNewForm); 

  //show,Update,delete
router
 .route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(
   isLoggedIn,
   isOwner,
  upload.single('listing[image]'),
   validateListing,
   wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

    
//edit route
router.get("/:id/edit",
 isLoggedIn,
 isOwner,
  wrapAsync(listingController.renderEditForm));

module.exports = router;

//index route
// router.get("/",
//  wrapAsync(listingController.index));

//create route
// router.post("/",
//  isLoggedIn,
//   validateListing,
//   wrapAsync(listingController.createListing));

//show route

// router.get("/:id",
//  wrapAsync(listingController.showListing));


//   //Update route
//   router.put("/:id",
//   isLoggedIn,
//   isOwner,
//    validateListing,
//     wrapAsync(listingController.updateListing));

 //DELETE route
//  router.delete("/:id",
//  isLoggedIn,
//  isOwner,
//   wrapAsync(listingController.destroyListing));