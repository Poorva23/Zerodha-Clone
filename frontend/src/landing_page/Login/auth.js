

export const useAuth = () => {
    // const navigate = useNavigate();
  
    // Function to validate the username (no spaces allowed)
    const isValidUsername = (username) => {
      const usernameRegex = /^\S+$/; // Matches strings without spaces
      return usernameRegex.test(username);
    };
  
    // Function to validate password strength
    const isStrongPassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      // Password must have at least 8 characters, 
      // at least one lowercase letter, one uppercase letter, one digit, and one special character
      return passwordRegex.test(password);
    };
  
    const registerUser = async (
      username,
      email,
      password,
      role = ["ROLE_USER"]
    ) => {
      // Validate username and password before proceeding with API call
      if (!isValidUsername(username)) {
        throw new Error("Username should not contain spaces.");
      }
  
      if (!isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters long, and include a mix of uppercase, lowercase, digits, and special characters.");
      }
      try {
        const response = await fetch("https://connecticaiot.com/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ username, email, password, role }),
        });
  
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.error || "Registration failed");
        }
  
        //  localStorage.setItem("token", data.jwt);
        //localStorage.setItem("token", data.username);
        // localStorage.setItem("token", data.email);
        return data;
      } catch (error) {
        console.error("Error during registration:", error);
        throw error;
      }
    };
  
    const loginUser = async (username, password) => {
      // Validate username and password before proceeding with API call
      if (!isValidUsername(username)) {
        throw new Error("Username should not contain spaces.");
      }
  
      if (!isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters long, and include a mix of uppercase, lowercase, digits, and special characters.");
      }
      try {
        const response = await fetch("https://connecticaiot.com/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || "Login failed");
        }
  
        localStorage.setItem("token", data.jwt);
        // localStorage.setItem("role", data.roles[0]);
        localStorage.setItem("username", data.username);
        sessionStorage.setItem("userId", data.id);
        const guestId = sessionStorage.getItem('guestId');
        if (guestId !== null && guestId !== undefined) {
          sessionStorage.removeItem('guestId');
        }
        // navigate("/");
        return data;
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    }
  
    const logout = async () => {
  
      // try {
      //   const response = await fetch("http://localhost:8080/api/auth/signout", {
      //     method: "POST",
      //     headers: {
      //       "Authorization": `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   });
  
      //   if (!response.ok) {
      //     throw new Error("Logout failed");
      //   }
  
      localStorage.removeItem("token");
      localStorage.clear();
      const userId = sessionStorage.getItem('userId');
      if (userId !== null && userId !== undefined) {
        sessionStorage.removeItem('userId')
      }
      const guestId = sessionStorage.getItem('guestId');
      if (guestId !== null && guestId !== undefined) {
        sessionStorage.removeItem('guestId');
      }
    navigate("/");
    //   } catch (error) {
    //     console.error("Error during logout:", error);
    //     throw error;
    //   }
  }
  return { registerUser, loginUser, logout };
  }
  
  