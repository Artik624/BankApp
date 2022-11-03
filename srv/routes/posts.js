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
  let user = await Users.find({ name: req.body.userName });//check if user already exists
  if (user[0] == undefined) {
    try {
      const hashedPass = bcrypt.hashSync(req.body.pass, 10);

      const newUser = new userDoc({
        name: req.body.userName,
        pass: hashedPass,
      });

      const added = await Users.create(newUser);
      res.json(added).status(200);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).end();
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const amount = await req.body.amount;
  } catch (error) {}
});

router.post("/deposit", async (req, res) => {
  try {
    const uid = req.body.uid;
    const amount = req.body.amount;
    const usr = await Users.findById(uid);
    const deposit = await Users.findByIdAndUpdate(
      uid,
      { balance: +usr.balance + +amount },
      { new: true }
    );
    res.status(200).end();
  } catch (error) {}
});

router.post("/withdraw", async (req, res) => {
  try {
    const uid = req.body.uid;
    const amount = req.body.amount;

    const usr = await Users.findById(uid);
    if (usr.balance >= amount) {
      const withdraw = await Users.findByIdAndUpdate(
        uid,
        { balance: +usr.balance + -amount },
        { new: true }
      );
      res.status(200).end();
    } else {
      res.status(409).end();
    }
  } catch (error) {}
});

router.post("/transfer", async (req, res) => {
  try {
    const recipient = await Users.findOneAndUpdate(
      { name: req.body.recipient },
      { $inc: { balance: req.body.amount } },
      { new: true }
    );
    if (recipient == undefined) {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const uid = req.body.uid;
    const amount = req.body.amount;
    const usr = await Users.findById(uid);
    if (usr.balance >= amount) {
      const send = await Users.findByIdAndUpdate(
        uid,
        { balance: +usr.balance + -amount },
        { new: true }
      );
      res.status(200).end();
    } else {
      res.status(409).end();
    }
  } catch (error) {}
});

export default router;
