import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export class UserController {
  static async getAllUsers(req) {
    try {
      await connectDB();
      const users = await User.find({});
      return {
        success: true,
        data: users,
      };
    } catch (error: unknown) {
      console.error("failed to fetch all users", error);
      return {
        success: false,
        message: (error as Error)?.message || "failed to fetch users",
      };
    }
  }

  static async createUser(req) {
    try {
      const user = {
        firstName: "x",
        lastName: "y",
        email: "abc@test.com",
      };

      const newUser = await User.create(user);

      return {
        data: newUser,
        success: true,
        message: "User created successfully",
      };
    } catch (error: unknown) {
      console.error("failed to create user", error);
      return {
        success: false,
        message: (error as Error)?.message || "failed to create user",
      };
    }
  }
}
