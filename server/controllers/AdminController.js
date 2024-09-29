import User from "../model/UserModel.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    // Only admin can create users with roles 'user' or 'admin'
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .send("Access denied. Only admins can register users.");
    }

    // Create the new user
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: role || "user", // Set default role to 'user'
      isApproved: true, // Automatically approve the user since it's created by admin
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
