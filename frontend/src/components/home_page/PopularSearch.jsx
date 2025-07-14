import React, { useState } from 'react'

const cardsData = [
    {
        id: 1,
        title: "Jobs for Freshers",
        trending: '1',
        color: '#DE3700',
        img: 'https://apna.co/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmumbai_apnatime_prod%2Fapna-home%2Ffreshers-jobs.png&w=1920&q=50'
    },
    {
        id: 2,
        title: "Work from home jobs",
        trending: '2',
        color: '#722ED1',
        img: 'https://apna.co/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmumbai_apnatime_prod%2Fapna-home%2Fwork-from-home-jobs.png&w=1920&q=50'
    },
    {
        id: 3,
        title: "Part time jobs",
        trending: '3',
        color: '#CC0000',
        img: 'https://apna.co/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmumbai_apnatime_prod%2Fapna-home%2Fpart-time-jobs.png&w=1920&q=50'
    },
    {
        id: 4,
        title: "jobs for women",
        trending: '4',
        color: '#1F8268',
        img: 'https://apna.co/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmumbai_apnatime_prod%2Fapna-home%2Fwomen-jobs.png&w=1920&q=50'
    },
    {
        id: 5,
        title: "Full time jobs",
        trending: '5',
        color: '#0066FF',
        img: 'https://apna.co/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmumbai_apnatime_prod%2Fapna-home%2FFull_time_banner_home_page.png&w=1920&q=50'
    }

]

const PopularSearch = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    return (
        <div className='flex items-center justify-center max-w-screen'>
            <div className="flex p-2 ">

                <div className='grid gap-10 md:grid-cols-2'>
                    <div className='flex max-sm:items-center max-sm:justify-center'><h1 className='text-base max-sm:text-xl max-sm:text-center text-[44px]'>Popular Search</h1></div>

                    {cardsData.map((card) => (
                        <div
                            key={card.id}
                            onMouseEnter={() => setHoveredCard(card.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="transition-all duration-300 border-3  rounded-lg shadow-sm md:card-side card bg-[#FCFCFC] text-black md:h-[250px] "
                            style={{
                                borderColor: hoveredCard === card.id ? card.color : "",
                            }}
                        >
                            <div className="card-body">
                                <h3>TRENDING AT #{card.trending}</h3>
                                <h2 className="card-title">{card.title}</h2>
                                <p>A card component has a figure, a body p</p>
                                <div className='btn btn-sm' style={{
                                    background: hoveredCard === card.id ? card.color : "",
                                }} >
                                    view all &gt;
                                </div>
                            </div>
                            <div className='flex items-center justify-center p-2 mx-auto'>
                                <figure className='w-[180px] h-[200px]'>
                                    <img src={card.img}  alt="" />
                                </figure>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PopularSearch