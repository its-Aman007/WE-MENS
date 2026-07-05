import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    
    const bestProduct = products.filter((item) => item.bestSeller === true)
    console.log(bestProduct);
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi praesentium, repellat aliquam ipsam quod molestiae doloremque natus ratione repellendus porro quam iure architecto hic laboriosam atque provident, perferendis, ad modi.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id || item._id}
            name={item.name}
            image={Array.isArray(item.image) ? item.image[0] : item.image}
            price={item.price}
            isBestSeller={item.bestSeller}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
