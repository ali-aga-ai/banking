const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

function setUser(user) {
  return jwt.sign(
    {
      num: user[0].contact_number,
      id: user[0].customer_id
      },
    secret
  );
}
function setUser2(user) {//works for login
  console.log("here i am",user)
  return jwt.sign(
    {
      num: user.contact_number,
      id: user.customer_id
      },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,setUser2
};
