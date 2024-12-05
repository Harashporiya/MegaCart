"use client"
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import "./signup.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validations, setValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const router = useRouter()

  const handlePasswordChange = (e: any) => {
    const input = e.target.value;
    setPassword(input);
    setShowValidation(input.length > 0);

    setValidations({
      hasUpperCase: /[A-Z]/.test(input),
      hasLowerCase: /[a-z]/.test(input),
      hasNumber: /\d/.test(input),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(input),
    });
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,
        { name, email, password }
      );
      toast.success("Signup successful!");
      console.log(response.data);
      setName("");
      setEmail("");
      setPassword("");
      setValidations({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
      });
      setTimeout(() => {
        router.push('/')
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Sign up failed. Please try again.";
      toast.error(errorMessage);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const result = await signIn("google", { 
        redirect: true, 
        callbackUrl: "/" 
      });
     
      if (result?.error) {
        toast.error("Error signing up with Google");
      }
    } catch (error) {
      toast.error("Error signing up with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    setGithubLoading(true);
    try {
      const result = await signIn("github", { 
        redirect: true, 
        callbackUrl: "/" 
      });
     
      if (result?.error) {
        toast.error("Error signing up with GitHub");
      }
    } catch (error) {
      toast.error("Error signing up with GitHub");
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <div id="signup">
      <Toaster position="top-center" />
      <form onSubmit={handelSubmit} id="signup-form">
        <h2 id="text">Sign up</h2>

        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div style={{ position: "relative", width: "fit-content" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              id="password"
              onChange={handlePasswordChange}
              style={{ paddingRight: "30px" }}
            />
            {showPassword ? (
              <IoEyeSharp
                size={25}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                size={25}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {showValidation && (
            <div id='vaildationCheckForm'>
              <form>
                <div id='checkboxInputOne' className={`checkboxInput ${
                  validations.hasUpperCase ? "valid" : "invalid"
                }`}>
                  <input type='checkbox' id={`checkBoxOne  ${
                    validations.hasUpperCase ? "valid" : "invalid"
                  }`} checked readOnly />
                  <p>At least 1 upper case letters (A-Z)</p>
                </div>
                <div id='checkboxInputTwo' className={`checkboxInput ${
                  validations.hasLowerCase ? "valid" : "invalid"
                }`}>
                  <input type='checkbox' id={`checkBoxTwo  ${
                    validations.hasLowerCase ? "valid" : "invalid"
                  }`} checked readOnly />
                  <p>Lower case letters (a-z)</p>
                </div>
                <div id='checkboxInputThree' className={`checkboxInput ${
                  validations.hasNumber ? "valid" : "invalid"
                }`}>
                  <input type='checkbox' id={`checkBoxThree  ${
                    validations.hasNumber ? "valid" : "invalid"
                  }`} checked readOnly />
                  <p>At least 1 number (0-9)</p>
                </div>
                <div id='checkboxInputFour' className={`checkboxInput ${
                  validations.hasSpecialChar ? "valid" : "invalid"
                }`}>
                  <input type='checkbox' id={`checkBoxFour  ${
                    validations.hasSpecialChar ? "valid" : "invalid"
                  }`} checked readOnly />
                  <p>Non-alphanumeric symbol (e.g., !@#)</p>
                </div>
              </form>
            </div>
          )}
        </div>

        <div id="signupBtn">
          <button type="submit" id="btn" disabled={loading}>
            {loading ? "Sign up..." : "Sign up"}
          </button>
        </div>

        <p id="already">
          Already have an account? <a href="/signin" id="login">Login</a>
        </p>

        <div id="lineContainer">
          <hr id="line" />
          <span>or</span>
          <hr id="line1" />
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center' }}>
        <button 
          type="button" 
          id="google" 
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          style={{ width: '300px' }}
        >
          {googleLoading ? (
            "Signing up..."
          ) : (
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
              <FcGoogle size={24} style={{ marginRight: '10px' }} />
              Sign up with Google
            </div>
          )}
        </button>

        <button 
          type="button" 
          id="github" 
          onClick={handleGitHubSignup}
          disabled={githubLoading}
          style={{ 
            width: '300px', 
            // backgroundColor: 'rgba(35,134,54,255)', 
            color: 'black', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          {githubLoading ? (
            "Signing up..."
          ) : (
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
              <FaGithub size={24} style={{ marginRight: '10px' }} />
              Sign up with GitHub
            </div>
          )}
        </button>
      </div>

      <div id="spanContainer">
        <p id="spanText">
          By signing up to create an account, I accept<br />
          Company's <span id="termSpan">Terms of Use and Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;