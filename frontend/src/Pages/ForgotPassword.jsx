import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    // Mock sending reset link
    setSent(true)
    toast.success('If this email exists, a reset link has been sent (mock).')
    setEmail('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Forgot Password</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      <p className='text-sm text-center'>Enter your account email and we'll send a password reset link.</p>

      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      <button
        type='submit'
        className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300'
      >
        Send reset link
      </button>

      {sent && <p className='text-green-600 text-sm'>If that email exists, a reset link has been sent.</p>}

      <p className='text-sm'>Back to <Link to='/login' className='text-blue-500 hover:underline'>Log In</Link></p>
    </form>
  )
}

export default ForgotPassword
