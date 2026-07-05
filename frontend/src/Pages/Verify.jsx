import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

  const { token, setCartItems, backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {

      
      if (!token) {
        navigate("/login")
        return
      }

      const response = await axios.post(
        `${backendUrl}/api/orders/verifyStripe`,
        { success, orderId },
        {
          headers: { token }
        }
      )

      
      if (response.data.success && success === "true") {

        setCartItems({}) 

        toast.success("Payment Successful ")

        navigate("/orders") 

      } else {

        toast.error("Payment Failed ")

        navigate("/cart") 

    }

    } catch (error) {
      console.log(error)
      toast.error("Verification failed")
      navigate("/cart")
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return (
    <div className="flex justify-center items-center h-screen text-xl">
      Verifying Payment...
    </div>
  )
}

export default Verify