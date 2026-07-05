import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Title from '../components/Title.jsx';
import { ShopContext } from '../context/ShopContext.jsx';

const Order = () => {
  const {backendUrl, token,currency} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  
const loadOrderData = async () => {
  try {

    if (!token) {
      return;
    }

    const response = await axios.get(
      `${backendUrl}/api/orders/user`,
      {
        headers: { token }
      }
    );

    console.log(response.data);

    if (response.data.success) {
      let allOrders = [];

(response.data.orders || []).forEach(order => {
  (order.items || []).forEach(item => {

    allOrders.push({
      ...item,
      status: order.status,
      paymentMethod: order.paymentMethod,
      date: new Date(order.date).toDateString(),
      payment: order.payment
    });

  });
});

setOrderData(allOrders);
    }
      

  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    if (!token) {
      return;
    }
    loadOrderData();

  },[token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />

      </div>
      <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between items-center gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className=' sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size:{item.size}</p>

                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{item.date}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>

              </div>
              <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>

              </div>
              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>

              </div>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Order
