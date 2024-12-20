import React from 'react'
const serviceLists = [
    {id: 1, title:"Catering", des: "Delight your guts with out flavours and presentation", image: "/images/home/services/icon1.png"},
    {id: 2, title:"Fast Delivery", des: "We deliver your order promptly to your door", image: "/images/home/services/icon2.png"},
    {id: 3, title:"Online Ordering", des: "Explore menu & order with ease using our Online Ordering", image: "/images/home/services/icon3.png"},
    {id: 4, title:"Gift Cards", des: "Give the gift of exceptional dining with Bakers and Crumbs Cards", image: "/images/home/services/icon4.png"}
]

const OurServices = () => {
  return (
    <div className='section-container my-16'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
        <div className='md:w-1/2'>
            <div className='text-left md:w-4/5'>
            <p className='subtitle'>Our Story & Services</p>
            <h2 className='title'>Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa omnis in eveniet totam rem nostrum at exercitationem quasi sint voluptatibus sequi, magnam quis, quibusdam molestiae minima aliquam dolor, veniam excepturi.
            </p>

            <button className='btn bg-pink border-pink text-white px-8 py-3 rounded-full'>Explore</button>
        </div>
        </div>
            {/*images */}
        <div className='md:w-1/2'>
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className='shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-black cursor-pointer hover:border-white transition-all duration-200 hover:border'>
                            <img src={service.image} alt="" className='mx-auto' />
                            <h5 className='pt-3 font-semibold'>{service.title}</h5>
                            <p className='text-[black]'>{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default OurServices

