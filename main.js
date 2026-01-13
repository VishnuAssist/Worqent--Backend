import express from 'express'
import cors from "cors";
import moviesRoute from './routes/movies.route.js'
import userRoute from './routes/user.route.js'
import dictionaryRoute from './routes/dictionary.route.js'
import connectDB from './lib/db.js';

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express()
const PORT =8989;


// data understanding middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))



// connect DB
connectDB();



app.get("/",(req,res)=>{
    res.json({msg:"hello world"});
});


// middleware
// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/movies',moviesRoute)
app.use('/users',userRoute)
app.use('/dictionary',dictionaryRoute)

app.listen(PORT,()=>{
      console.log(`🚀 Server running on http://localhost:${PORT}`);
})