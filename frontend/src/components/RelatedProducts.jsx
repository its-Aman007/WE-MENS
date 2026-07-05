import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0 && category && subCategory) {
      const productCopy = products
        .filter((item) => item.category === category && item.subCategory === subCategory)
        .slice(0, 4);
      setRelated(productCopy);
    } else {
      setRelated([]);
    }
  }, [products, category, subCategory]);

  if (!related || related.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-medium mb-4">Related Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((item, idx) => (
          <ProductItem key={idx} id={item._id} image={item.image && item.image[0]} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
