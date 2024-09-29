import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("You are not authenticated!");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload?.userId;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // If the user is an admin, proceed
  } else {
    return res.status(403).send("Access denied. Admins only.");
  }
};
