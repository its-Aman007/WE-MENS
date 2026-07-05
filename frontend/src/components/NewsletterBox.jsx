
const NewsletterBox = () => {

        const OnSubmitHandler = (e) => {
                e.preventDefault();
                // TODO: wire up real submit action (API/email)
        }

    return (
        <div className='text-center'>
        <p className='text-xl font-medium text-gray-800'>Subscribe Now and Get 15% off</p>
        <p className='text-gray-400 mt-3 text-xl'>
            Join our newsletter to stay updated with the latest news and exclusive offers.

        </p>
        <form onSubmit={OnSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full text-sm sm:flex-1 outline-none' type="email" placeholder='Enter your Email'/>
            <button type="submit" className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
        </form>
      
    </div>
  )
}

export default NewsletterBox
