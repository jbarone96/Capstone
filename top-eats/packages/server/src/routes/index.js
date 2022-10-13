import { Router } from "express";
import axios from "axios";
import User from "../models/users.js";
import Review from "../models/review.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// All routes start with the API_URL (default '/api')

// Return restaurants that meet the search criteria for 'term' and 'location'
// term: user inputted string like 'deli', 'mexican', etc
// location: user inputted location 'buffalo NY', Texas, NYC
// categories: of businesses.  should be 'food'
// limit: should limit the number of returned restaurants. should be 10 for now.
router.post("/restaurants", async (req, res) => {
  // adding the bearer token to the request header
  const config = {
    headers: {
      Authorization:
        "Bearer s8qRiEmnaVDeNMG73UiLzcMCoWHR3nqYDo5O01L9laLrfFW6_c277fixPBhxEG8NheadeBPgdAPOFoxsPSJSyv8lVyGT7NiGnXZfjxPzpKL5p8HTrIQHh7IGjNEbY3Yx",
    },
  };

  try {
    const searchInput = req.body;
    // console.log(searchInput)
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search?term=${searchInput.term}&location=${searchInput.location}&categories=${searchInput.categories}&limit=${searchInput.limit}`,
      config
    );
    let apiRes = response.data.businesses;
    res.send(apiRes);
  } catch (error) {
    console.log(error);
  }
});

router.get("/restaurant/:id", async (req, res) => {
  const config = {
    headers: {
      Authorization:
        "Bearer s8qRiEmnaVDeNMG73UiLzcMCoWHR3nqYDo5O01L9laLrfFW6_c277fixPBhxEG8NheadeBPgdAPOFoxsPSJSyv8lVyGT7NiGnXZfjxPzpKL5p8HTrIQHh7IGjNEbY3Yx",
    },
  };

  const id = req.params.id;
  console.log("params:", req.params);
  try {
    // console.log(id)
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/${id}`,
      config
    );
    let apiRes = response.data;
    res.send(apiRes);
  } catch (error) {
    console.log(error);
  }
});

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    birthday,
    zip,
    email,
    password,
    confirmPassword,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: "User already exists" });

    // if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await User.create({
      firstName,
      lastName,
      birthday,
      zip,
      email,
      passwordHash,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    result.passwordHash = "";

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!isPasswordCorrect) return res.json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    existingUser.passwordHash = "";

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

router.get("/getUser/:id", async (req, res) => {
   try { 
    const result = await User.findOne({ _id: req.params.id });
    res.status(200).json({ result });
   } catch(error) {
    res.status(500).json({ message: `${error}` });
   }
});

router.get("/", async (req, res) => {
  res.status(200).send("api endpoint");
});


// Routes for reviews
// post - make a new rewiev

router.post('/newReview', async (req, res) => {

  //req.body shoudl contain userID, restaurantID, text, rating. 
  // SHoudl add the date on the backend
  // db should add the review id automatically as well
  const {
    userID,
    text,
    rating,
    restaurantID
  } = req.body

  try {
    const result = await Review.create({
      author: userID,
      reviewBody: text,
      rating: rating,
      restaurantID: restaurantID
    })
    res.status(200).json({result})
  } catch (error) {
    console.log(error)
  }
})

// post - get all reviews with the same restaurant ID

// this works just fine, because the restaurant id is within the reviews

router.get('/restaurantReviews/:restaurantID', async (req, res) =>{
  try {

    const reviews = await Review.find({restaurantID: req.params.restaurantID})
    res.send(reviews)
  } catch (error) {
    console.log(error)
  }


})
// get - get all reviews with same user ID
// I need to make sure that the userid is stored with the review

router.get('/userReviews/:userID', async (req, res) =>{
  try {
    const reviews = await Review.find({author: req.params.userID})
    res.send(reviews)
  } catch (error) {
    console.log(error)
  }
})


// put - modify a review. send the new text body in the req.body
router.post('/review/:id', async (req, res) =>{

  // get the review from the id
  let review = await Review.findOne({_id: req.params.id})
  let newBody = req.body

  try {
    
    // modify the review by changing out the reviewBody
    // then save it
    res.send(reviews)
  } catch (error) {
    console.log(error)
  }
})

// router.put('/comments', async (request, response, next) => {
//   const { text, userId, postId } = request.body
//   const comment = {
//     text: text,
//     author: userId,
//   }
//   const populateQuery = [
//     { path: 'comments.author', select: ['username', 'profile_image'] },
//   ]
//   Post.findByIdAndUpdate(
//     postId,
//     {
//       $push: { comments: comment },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate(populateQuery)
//     .exec((err, result) => {
//       if (err) {
//         next(err)
//       } else {
//         response.json(result)
//       }
//     })
// })



// delete - delete a review


export default router;
