import { Router } from "express";

const router: Router = Router();

// Example route handlers
router.get("/", (req, res) => {
  res.send("Get cart items");
});

router.post("/", (req, res) => {
  res.send("Add item to cart");
});

export default router;