const { getUser } = require("../services/userServiceToken");

async function restrictToLoggedInUsersOnly(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) {
    console.log("No token found, redirecting to login");
    return res.redirect("/login");
  }

  const user = getUser(token);
  if (!user) {
    console.log("Token verification failed, redirecting to login");
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  try {
    const token = req.cookies?.uid;
    if (!token) {
      console.log("No token found in cookies.");
      return res.status(401).json({ error: "No token found" });
    }

    const user = getUser(token);
    if (!user) {
      console.log("Token verification failed.");
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in checkAuth middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { restrictToLoggedInUsersOnly, checkAuth };
