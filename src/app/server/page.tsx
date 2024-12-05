"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"


export default function Page() {
   const [data, setData] = useState<any>(null)
   const router = useRouter()

   useEffect(() => {
     const fetchData = async () => {
       const token = Cookies.get('token')
       
       if (!token) {
         router.push('/signin')
         return
       }
       
       try {
         const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': token
           }
         })
         
         setData(response.data)
       } catch (error: any) {
         console.error(error)
         
         if (error.response?.status === 401) {
           Cookies.remove('token')
           router.push('/signin')
         }
       }
     }
     
     fetchData()
   }, [router])

   return (
     <div>
       {/* Pass the name as a prop to Header */}
      
       {/* <h1>Welcome</h1>
       <pre>{JSON.stringify(data, null, 2)}</pre>
       {data && (
         <>
           {data.user.name}
         </>
       )} */}
     </div>
   )
}