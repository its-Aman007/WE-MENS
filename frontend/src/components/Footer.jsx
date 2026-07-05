import { Link } from 'react-router-dom'
import assets from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="logo" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus optio totam soluta laudantium voluptate fugiat officia voluptates, possimus eos expedita dolorem officiis reprehenderit perspiciatis fugit esse, incidunt ipsum earum cumque.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to='/about'>About Us</Link></li>
                    <li><Link to='/delivery'>Delivery</Link></li>
                    <li><Link to='/privacy-policy'>Privacy Policy</Link></li>

                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5 '>
                    GET IN TOUCH
                </p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91-12122121212</li>
                    <li>we-men@gmail.com</li>

                </ul>
            </div>

        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2026@we-men.com-All Right Reserved</p>
        </div>
    
    </div>
)
}

export default Footer
