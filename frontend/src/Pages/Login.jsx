import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';



const Login = () => {

  console.log('Login component rendered');

  const [currentState,setCurrentState]=useState('login');
  const {setToken,token,navigate,backendUrl}=useContext(ShopContext);
  console.log('Context values:', {setToken,token,navigate,backendUrl});
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');

  const onsubmitHandler=async(e)=>{
    e.preventDefault();
    console.log('onsubmitHandler called');
    toast.info('Submitting form');
    // console.log('Submitting', currentState, { name, email, password, confirmPassword, backendUrl });
    try {
      if(currentState==='Sign Up'){
        if(password !== confirmPassword){
          toast.error("Passwords do not match");
          return;
        }
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password, confirmPassword });
        // console.log('Signup response', response.data);
        if(response.data.success){
          console.log('Signup token', response.data.token);
          setToken(response.data.token);
          toast.success("Account created successfully");
          navigate('/');
        } else {
          toast.error(response.data.message || "Signup failed");
        }
      } else {

        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        console.log('Login response', response.data);
        if(response.data.success){
          console.log('Login token', response.data.token);
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Login successful");
          navigate('/');
        } else {
          toast.error(response.data.message || "Login failed");
        }
      }
      
    } catch (error) {
      console.error('Auth error:', error);
      const message = error?.response?.data?.message || error.message || 'An error occurred';
      toast.error(message);
    }
  
  }
  useEffect(() => {
    if (token) {
      navigate('/');
    }

  },[token])


  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

      </div>
      {currentState === 'Sign Up' && <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Username' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
      {currentState === 'Log In' && (
        <div className='w-full text-right'>
          <Link to='/forgot-password' className='text-sm text-blue-500 hover:underline'>Forgot password?</Link>
        </div>
      )}
      {currentState==='Sign Up' && <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder='Confirm Password' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />}
      <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
  {currentState}
</button>

      <p className='text-sm'>
        {currentState==='Sign Up' ? 'Already have an account?' : "Don't have an account?"}
        <span
          className='text-blue-500 cursor-pointer ml-1'
          onClick={() => setCurrentState(currentState === 'Sign Up' ? 'Log In' : 'Sign Up')}
        >
          {currentState === 'Sign Up' ? 'Log In' : 'Sign Up'}
        </span>
      </p>

      
    </form>
  )
}

export default Login
