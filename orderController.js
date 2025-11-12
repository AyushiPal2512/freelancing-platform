import Order from "../models/Order.js";
import Gig from "../models/Gig.js";

export const createOrder = async (req, res) => {
  const gig = await Gig.findById(req.body.gig);
  if (!gig) return res.status(404).json({ message: "Gig not found" });
  const order = await Order.create({
    gig: gig._id,
    buyer: req.user.id,
    seller: gig.seller,
    amount: gig.price,
    status: "active",
    requirements: req.body.requirements || ""
  });
  res.status(201).json(order);
};

export const myOrders = async (req, res) => {
  const roleField = req.user.role === "seller" ? { seller: req.user.id } : { buyer: req.user.id };
  const orders = await Order.find(roleField).populate("gig", "title price").sort("-createdAt");
  res.json(orders);
};
