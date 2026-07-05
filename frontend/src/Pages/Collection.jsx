import { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [ShowFilter, setShowFilter] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [showType, setShowType] = useState(true);
  const [Category,setCategory]=useState([]);
  const [subcategory,setSubcategory]=useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('relavent');

  const toggleCategory=(e)=>{
    if(Category.includes(e.target.value)){
      setCategory(Category.filter(item=>item!==e.target.value));
    }else{
      setCategory([...Category,e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory(subcategory.filter((item) => item !== e.target.value));
    } else {
      setSubcategory([...subcategory, e.target.value]);
    }
  };


  useEffect(()=>{
    let result = products || [];
    if(Category && Category.length > 0){
      result = result.filter(p => Category.includes(p.category));
    }
    if(subcategory && subcategory.length > 0){
      result = result.filter(p => subcategory.includes(p.subCategory));
    }

    if (search && showSearch){
      result = result.filter(item => (item.name || '').toLowerCase().includes(search.toLowerCase()));
    }
    // Apply sorting
    if(sortOption === 'low-high'){
      result = result.slice().sort((a,b) => (a.price || 0) - (b.price || 0));
    } else if(sortOption === 'high-low'){
      result = result.slice().sort((a,b) => (b.price || 0) - (a.price || 0));
    }
    setFilteredProducts(result);
  },[products, Category, subcategory, sortOption,search,showSearch])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!ShowFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden transition-transform ${ShowFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowFilter ? '' : 'hidden'} ${showCategory ? '' : 'hidden'} sm:block`}>
          <p onClick={() => setShowCategory(!showCategory)} className='mb-3 text-sm font-medium flex items-center justify-between gap-2 cursor-pointer sm:cursor-default'>
            <span>CATEGORIES</span>
            <img className={`h-3 sm:hidden transition-transform ${showCategory ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} checked={Category.includes('Men')} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} checked={Category.includes('Women')} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} checked={Category.includes('Kids')} /> Kids
            </p>
          </div>
        </div>

      <div className={`border border-gray-300 pl-5 py-3 my-5 ${ShowFilter ? '' : 'hidden'} ${showType ? '' : 'hidden'} sm:block`}>
          <p onClick={() => setShowType(!showType)} className='mb-3 text-sm font-medium flex items-center justify-between gap-2 cursor-pointer sm:cursor-default'>
            <span>Type</span>
            <img className={`h-3 sm:hidden transition-transform ${showType ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubcategory} checked={subcategory.includes('Topwear')} /> Top-wear
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubcategory} checked={subcategory.includes('Bottomwear')} /> Bottom-wear
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubcategory} checked={subcategory.includes('Winterwear')} /> Winter-wear
                </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
              <select className='border-2 border-gray-300 text-sm px-2' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="relavent">Sort by: Relavent</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
          {/* Product Sort */}
          
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filteredProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
