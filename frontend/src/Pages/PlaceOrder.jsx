import Title from '../components/Title.jsx'
import CartTotal from '../components/CartTotal.jsx'
import assets from '../assets/assets.js'
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'


const PlaceOrder = () => {

  const { navigate, backendUrl, token, cartItems, getCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipCode:'',
    country:'',
    phone:''
  });

  const onchangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({...data,[name]:value}));
  }

  const onsubmitHandler = async (e)=>{
    e.preventDefault();

    try {

      let orderItems = [];

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){

            const product = products.find(product => product._id === items);
            if(!product) continue;

            const itemInfo = structuredClone(product);
            itemInfo.quantity = cartItems[items][item];
            itemInfo.size = item;

            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        orderItems,
        amount: getCartAmount() + delivery_fee,
        payment_method: method,
        address: formData
      }

      switch(method){

        case "cod":

          const response = await fetch(`${backendUrl}/api/orders`,{
            method:'POST',
            headers:{
              "Content-Type":"application/json",
              token: token
            },
            body:JSON.stringify(orderData)
            
          });
          

          const data = await response.json();

          if(data.success){
            // getCartItems();
            navigate('/orders');
          } else {
            toast.error(data.message,'Failed to Place Order');
          }

          break;


        case "stripe":

          const responseStripe = await axios.post(`${backendUrl}/api/orders/stripe`,orderData,{
          
            headers:{
              "Content-Type":"application/json",
              token:token
            },
            body:JSON.stringify(orderData)
          });
          if (responseStripe.data.success){
            const {session_url}=responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }

          break;

      }

    } catch(error){
      console.log(error);
      toast.error("Something went wrong while placing order");
    }
  }

  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text' placeholder='First Name'
          onChange={onchangeHandler} value={formData.firstName} name='firstName'/>

          <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text' placeholder='Last Name'
          onChange={onchangeHandler} value={formData.lastName} name='lastName'/>
        </div>

        <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        type='email' placeholder='Email Address'
        onChange={onchangeHandler} value={formData.email} name='email'/>

        <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        type='text' placeholder='Street'
        onChange={onchangeHandler} value={formData.street} name='street'/>

        <div className='flex gap-3'>
          <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text' placeholder='City'
          onChange={onchangeHandler} value={formData.city} name='city'/>

          <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text' placeholder='State'
          onChange={onchangeHandler} value={formData.state} name='state'/>
        </div>

        <div className='flex gap-3'>
          <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='number' placeholder='Zip Code'
          onChange={onchangeHandler} value={formData.zipCode} name='zipCode'/>

          <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text' placeholder='Country'
          onChange={onchangeHandler} value={formData.country} name='country'/>
        </div>

        <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        type='number' placeholder='Phone Number'
        onChange={onchangeHandler} value={formData.phone} name='phone'/>

      </div>

      {/* RIGHT SIDE */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>

          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex gap-3 flex-col lg:flex-row'>

            <div onClick={()=>setMethod('stripe')}
            className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':'bg-white'}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt=""/>
            </div>

            <div onClick={()=>setMethod('razorpay')}
            className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':'bg-white'}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt=""/>
            </div>

            <div onClick={()=>setMethod('cod')}
            className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':'bg-white'}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit'
            className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder;