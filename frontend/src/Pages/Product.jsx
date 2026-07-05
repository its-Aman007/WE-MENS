import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import assets from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import '../index.css';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {

  const {productId} = useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [productData,setProductData]=useState(false);
  const [image,setImage]=useState('')
  const [size,setSize]=useState('');


  const fetchProductData=async()=>{
    products.map((item)=>{
      if((item.id || item._id)===productId){
        setProductData(item) 
        console.log(item);
        setImage(item.image[0])
        return null;
      }
    });

  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product Data */}

      <div className ='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* images */}
        <div className='flex-1 flex flex-col-reverse gap-4 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-contain ${image===item ? 'ring-2 ring-indigo-500' : ''}`} alt={productData.name || ''} />
            ))
          }
          </div>
          <div className='w-full sm:w-[81.3%]'>
            <img className='w-full h-auto object-contain' src={image || (productData.image && productData.image[0])} alt={productData.name || ''} />

          </div>

        </div>

        {/*----- product details------  */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_dull_icon} alt="" className="w-3.5" />
              <p className='pl-2'>(20 Reviews)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>

              <p>Select Size</p>
            <div className='flex gap-2'>
                {productData.sizes.map((item, index) => (
  <button
    onClick={() => setSize(item)}
            className={`border-2 py-2 px-4 bg-white rounded-md font-medium transition-all ${
              item === size
                ? 'border-orange-500 bg-orange-50 text-orange-300 shadow-sm'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            key={index}
          >
            {item}
          </button>
        ))}

            </div>
          </div>

          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white py-2 px-8 text-sm active:bg-gray-800'>ADD TO CART</button>
          <hr className='mt-8 sm:w-3/4 border-gray-300' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>

                <p>100% Original Product</p>
                <p>Cash On Delivery is Available on this Product</p>
                <p>Easy Returns and Exchanges within 3 days</p>

          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-300 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews(22)</p>

        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Welcome to our online clothing store, where style meets comfort and quality. We offer a carefully curated collection of trendy, timeless, and affordable fashion for every occasion. From everyday wear to festive and party outfits, our designs are crafted to help you look confident and feel your best.

            Enjoy a seamless shopping experience with secure payments, easy returns, and fast delivery right to your doorstep. With detailed product views, size guides, and responsive customer support, finding your perfect fit has never been easier.</p>
          <p>Discover the latest trends and timeless classics in our collection. Whether you're dressing up for a special event or looking for casual everyday wear, we have something for everyone. Our commitment to quality ensures that every piece you purchase is made to last, so you can enjoy your favorite styles season after season.</p>

        </div>

      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      
    </div>
  ): <div className='opacity-0'></div>
}

export default Product
