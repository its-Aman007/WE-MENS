import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({ id, name, image, price, isBestSeller }) => {
  const { currency } = useContext(ShopContext);
  const imgSrc = Array.isArray(image) ? image[0] : image;

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={imgSrc} alt={name} />
      </div>

      <p className='pt-3 pb-1 text-sum'>{name}</p>
      <p className='text-sm font-medium'>
        {currency}
        {price}
      </p>
      <p className='text-xs text-gray-500 mt-1'>{isBestSeller ? 'Best Seller' : ''}</p>
    </Link>
  )
}

export default ProductItem
