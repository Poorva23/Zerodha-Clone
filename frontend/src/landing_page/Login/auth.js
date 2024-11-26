export const useAuth = () => {
  // Mocked data for users
  const mockUsers = {};

  // Function to validate the username (no spaces allowed)
  const isValidUsername = (username) => {
    const usernameRegex = /^\S+$/; // Matches strings without spaces
    return usernameRegex.test(username);
  };

  // Function to validate password strength
  const isStrongPassword = (password) => {
    // Optional: Simplify password validation
    return password.length >= 6; // Minimum 6 characters
  };

  // Register user locally or via API
  const registerUser = async (username, email, password) => {
    if (!isValidUsername(username)) {
      throw new Error("Username should not contain spaces.");
    }

    if (!isStrongPassword(password)) {
      throw new Error("Password must be at least 6 characters long.");
    }

    // Local registration (mocked)
    if (mockUsers[username]) {
      throw new Error("Username already exists.");
    }
    mockUsers[username] = { email, password };
    console.log("Registered user:", { username, email });
    return { message: "Registration successful" };
  };

  // Login user locally or via API
  const loginUser = async (username, password) => {
    if (!isValidUsername(username)) {
      throw new Error("Invalid username.");
    }

    if (!mockUsers[username] || mockUsers[username].password !== password) {
      throw new Error("Invalid credentials.");
    }

    // Save mock token and user data
    localStorage.setItem("token", "mockToken");
    localStorage.setItem("username", username);
    console.log("User logged in:", username);
    return { message: "Login successful" };
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    console.log("User logged out");
  };

  return { registerUser, loginUser, logout };
}                                                                                              