import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decode);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false
      })
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    res.redirect('/login');
    console.log("error not a error");
  }
}