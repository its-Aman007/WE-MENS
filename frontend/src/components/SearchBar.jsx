import { useContext } from 'react';
import assets from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';


const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/search') {
            setShowSearch(true);
        }
        else{
            setShowSearch(false);
        }
    }, [location, setShowSearch]);


    return showSearch ? (
    <div className='border-t bg-gray-50 text-center'>

        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="flex-1 outline-none bg-inherit text-sm"
                
            />
            <img src={assets.search_icon} alt="Search" className="h-5 w-5 mr-2" />
            <img onClick={() => setShowSearch(false)} src={assets.cross_icon} alt="Search" className="ml-2 h-5 w-5" />
        </div>
      
    </div>
  ) : null;
}

export default SearchBar
