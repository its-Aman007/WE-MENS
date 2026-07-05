import assets from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import Title from '../components/Title.jsx'

const About = () => {
  return (
    <div>
      <div className='text-center pt-8 text-3xl border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to we-men, your one-stop destination for stylish, comfortable, and affordable fashion. We believe that clothing is more than just what you wear — it’s how you express yourself. Our collection is carefully curated to bring you the latest trends, premium quality fabrics, and timeless designs for every occasion.

At we-men, we are committed to providing excellent customer service and a seamless shopping experience. Whether you're dressing for work, casual outings, or special moments, we’ve got something perfect for you.

Fashion that fits your lifestyle. Confidence in every outfit. </p>
        
        
        <b className='text-gray-800'>OUR MISSION</b>
        <p>Our mission is to empower individuals by providing high-quality, fashionable clothing that enhances their confidence and reflects their personal style. We strive to create a sustainable and inclusive fashion ecosystem where everyone can find something they love.</p>
        <p className='text-4xl text-black-400 py-2 mt-4'>Thank you for choosing We-Men!</p>
        <p>Enjoy the convenience of online shopping with fast delivery and easy returns. </p>
        <hr />
        </div>

      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={' CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Every piece in our collection undergoes rigorous quality checks to ensure durability, comfort, and style. We use only premium materials and sustainable practices to deliver the best possible experience.</p>
        </div>
        <div className='border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Convenience:</b>
          <p className='text-gray-600'>Enjoy the convenience of online shopping with fast delivery and easy returns. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur sit repellat totam eveniet.</p>
        </div>
        <div className='border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600' >Our dedicated team is always ready to assist you with any queries or concerns. We value your feedback and strive to provide a seamless shopping experience from start to finish.</p>
        </div>

      </div>

      <NewsletterBox />
      
    </div>
  )
}

export default About
