import express from "express";
import Users, { userDoc } from "../Users.js";
import login_post from "../authControllers.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { setTimeout } from "timers/promises";

const router = express.Router();

router.use(express.json());

router.post("/login", login_post);

router.post("/newUser", async (req, res) => {
  let user = await Users.find({ name: req.body.userName });
  if (user[0] == undefined) {
    try {
      const hashedPass = bcrypt.hashSync(req.body.pass, 10);

      const newUser = new userDoc({
        name: req.body.userName,
        pass: hashedPass,
      });

      newUser.transactions.push({});
      await b();
      async function b() {
        const wait = await setTimeout(10000, "wait");
        newUser.transactions.push({});
      }
      const added = await Users.create(newUser);
      console.log(added);
      res.json(added).status(200);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('here')
    res.status(400).end();
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const amount = await req.body.amount;
  } catch (error) {}
});

export default router;
