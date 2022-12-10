const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { query } = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/* --- MongoDB ---- */







// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a0w0llq.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a72gu6q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });














async function run() {
  try {
    const BlogsCollection = client.db("tech_blogs").collection("blogs");



    //payment intent


    //     app.get("/products", async (req, res) => {
    //     const query = {};
    //     const cursor = productsCollection.find(query)
    //     const products = await cursor.toArray();
    //     res.send(products);
    //   });




    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = BlogsCollection.find(query)
      const products = await cursor.toArray();
      res.send(products);
    });

    app.get('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await BlogsCollection.findOne(query);
      res.send(result);
    })



    app.post("/blogs", async (req, res) => {
      const newItems = req.body;
      console.log('adding new items', newItems);
      const result = await BlogsCollection.insertOne(newItems)
      res.send(result);
    })

    app.delete('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await BlogsCollection.deleteOne(query)
      res.send(result)
    })






    
        app.put('/blogs/:id', async(req, res) =>{
            const id = req.params.id;
            const updateBlog =req.body;
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true };
            const updatedDoc = {
                $set: {
                  title: updateBlog.title,
                  tag: updateBlog.tag,
                  description: updateBlog.description,
                  image: updateBlog.image,
                  author: updateBlog.author,
                  rating: updateBlog.rating
                    
                }
            };
            const result = await BlogsCollection.updateOne(filter, updatedDoc, options)
            res.send(result);
        })
    



















  } finally {
  }
}

run().catch(console.log);

//Basic server start
app.get("/", async (req, res) => {
  res.send("Blog  server is running");
});

app.listen(port, () => console.log(`Blog server running on ${port}`));




