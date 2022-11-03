import bcrypt from "bcrypt";
import Users from "./Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

export async function login_post(req, res) {
  let user = await Users.find({ name: req.body.userName });
  
  if (user[0] != undefined) {
    try {
      if (await bcrypt.compare(req.body.pass, user[0].pass)) {
        const accessToken = jwt.sign(
          user[0].name,
          process.env.ACCESS_TOKEN_SECRET
        );

        const token = {
          accessToken: accessToken,
          uId: user[0].id,
        };
        
        res
          .cookie("token", accessToken )//{maxAge: 100000})
          .cookie("uid", user[0].id)//{maxAge: 100000})
          .cookie("usrObj", JSON.stringify({ name: user[0].name, balance: user[0].balance }))
          .status(200)
          .json({ cookie: "sent" });
      } else {
        res.json(null);//incorrect password reposnse
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.json(null);//incorrect username response
  }
}

async function addTransaction(req, res) {
  let amount = req.body.amount;
}

export default login_post;
