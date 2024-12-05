"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast"
import './signin.css'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Cookies from 'js-cookie'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)

  const handelSubmit = async (e: any) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
        email,
        password
      })

      Cookies.set('token', response.data.token)
 
      toast.success("Sign in successful!")
      console.log(response.data)
      setEmail('')
      setPassword('')

      setTimeout(() => {
        router.push('/')
      }, 2000);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Sign in failed. Please try again."
      toast.error(errorMessage)
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignin = async () => {
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

  const handleGitHubSignin = async () => {
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
    <div id="signin">
      <Toaster position="top-center" />

      <form onSubmit={handelSubmit} className="signin-form">
        <h2 id='text'>Sign in</h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div style={{ position: 'relative', width: 'fit-content' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              paddingRight: '30px',
            }}
          />
          {showPassword ? (
           
            <IoEyeSharp
            size={25}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
            onClick={() => setShowPassword(false)}
          />
          ) : (
            <FaEyeSlash
            size={25}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
            onClick={() => setShowPassword(true)}
          />
          )}
        </div>

        <div id='signinBtn'>
          <button
            type="submit"
            id="btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <p id='already'>
          Don't have an account? <a href="/signup" id='signup'>Sign up</a>
        </p>

        <div id='lineContainer'>
          <hr id='line' /><span>or</span><hr id='line1' />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center' }}>
        <button 
          type="button" 
          id="google" 
          onClick={handleGoogleSignin}
          disabled={googleLoading}
          style={{ width: '300px' }}
        >
          {googleLoading ? (
            "Signing..."
          ) : (
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
              <FcGoogle size={24} style={{ marginRight: '10px' }} />
              Sign in with Google
            </div>
          )}
        </button>

        <button 
          type="button" 
          id="github" 
          onClick={handleGitHubSignin}
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
              Sign in with GitHub
            </div>
          )}
        </button>
      </div>
      </form>

      <div id='spanContainer'>
        <p id='spanText'>
          By signing the account I accept<br />
          Company's <span id='termSpan'>Term of Use and Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}

export default Signin