const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { userName } = req.body;
      const [user, created] = await User.findOrCreate({
        where: { userName },
        default: {
          win: 0,
          lose: 0,
        },
      });

      return res.status(200).json({
        message: created ? "User created successfully" : "User found",
        user: {
          id: user.id,
          userName: user.userName,
        },
      });
    } catch (err) {
      console.log("🚀 ~ UserController ~ register ~ err:", err);
      next(err);
    }
  }
  static async getUser(req, res, next) {
    try {
      const { id } = req.body;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
