import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://thevishven_db_user:TfKCLTIoFeei2pAi@cluster0.trzde8q.mongodb.net/?appName=Cluster0"
    );
    console.log("DB connected successfully !!!");
  } catch (error) {
    console.error(error.message);
    process.exit(1); // it will used to exist the process when the error came 
  }
};

export default connectDB;