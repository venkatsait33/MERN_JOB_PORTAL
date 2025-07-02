import React from 'react'

const FilterData = ({ filterData,  selectedValue, handleClick }) => {
  return (
        <div><div className='max-sm:text-sm'>
            {filterData.map((data, index) => (
                <div key={index} className="items-center gap-2 mt-2">
                    <h1 className="text-lg font-bold">{data.filterType}</h1>

                    <div className='overflow-hidden overflow-y-scroll h-58 no-scrollbar'>
                        {data.array.map((item, idx) => {
                            const itemId = `id-${index}-${idx}`;
                            return (
                                <div key={itemId} className="flex items-center gap-2 my-2">
                                    <input
                                        type="radio"
                                        name="global-radio" // all use same group
                                        className="radio "
                                        value={item}
                                        checked={selectedValue === item}
                                        onClick={() => handleClick( item)}
                                        readOnly
                                    />
                                    <label htmlFor={itemId}>{item}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div></div>
    )
}

export default FilterData