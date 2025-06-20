import React from "react";

const Openings = [
    {
        id: 1,
        companyName: "Bajaj Allianz Life Insurance",
        description: "Provider of life insurance and financial services",
        logo:
            "https://apna.co/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmumbai_apnatime_prod%2Fapna-home%2Fcompanies%2Fbajaj.png&w=1920&q=75",
    },
    {
        id: 2,
        companyName: "Paytm Services Pvt.Ltd.",
        description: "Provider of digital payments and financial services",
        logo:
            "https://apna.co/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmumbai_apnatime_prod%2Fapna-home%2Fcompanies%2Fic-paytm.png&w=1920&q=75",
    },
    {
        id: 3,
        companyName: "Amazon India",
        description: "Provider of e-commerce and cloud computing services",
        logo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tRYipdHBksQuFPy7PPgod__Iek-plR-p-w&s",
    },
    {
        id: 4,
        companyName: "Flipkart",
        description: "Provider of e-commerce and digital payments services",
        logo:
            "https://apna.co/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmumbai_apnatime_prod%2Fapna-home%2Fcompanies%2Fflipkart.png&w=1920&q=75",
    },
    {
        id: 5,
        companyName: "Google India",
        description: "Provider of search engine and cloud computing services",
        logo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgzKyg9U7UNa19_S8ZZTNxpN3Xw8nEyRhlWQ&s",
    },
];

const JobOpeningsSection = () => {
    return (
        <div className="mt-10 bg-[#F4F2F6] text-black p-4">
            <h1 className="mb-8 text-xl font-bold text-center md:text-3xl">Job Openings in Top Companies</h1>
            <div className="flex space-x-6 overflow-x-auto no-scrollbar">
                {Openings.map((opening) => (
                    <div key={opening.id} className="flex-none carousel-item">
                        <div className="bg-white border shadow-md card max-sm:w-60 md:h-86 md:w-96">
                            <figure className="p-2 mt-4">
                                <img
                                    src={opening.logo}
                                    alt={opening.companyName}
                                    className="object-contain h-16"
                                />
                            </figure>
                            <div className="gap-4 card-body">
                                <h2 className="md:text-3xl card-title">{opening.companyName}</h2>
                                <p>{opening.description}</p>
                                <div className="justify-start card-actions">
                                    <button className="text-[#1F8268] hover:bg-[#1F8268] btn bg-transparent hover:btn  font-semibold">Apply Now &gt; </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center mt-10">
                <button className='btn hover:bg-[#1F8268] btn-outline border border-[#1F8268] mb-4'>View all</button>
            </div>
        </div>

    );
};

export default JobOpeningsSection;
