import { Router } from "express"
import OrderController from "../controllers/orders.controller.js"

const orderRouter = Router()

orderRouter.route("/placeorder")
    .post(OrderController.createOrder)

export default orderRouter;