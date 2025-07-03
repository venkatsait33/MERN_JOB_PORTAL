import React from 'react';

const FilterData = ({ filterData, selectedValue, handleClick }) => {
    return (
        <div className="max-sm:text-sm">
            {filterData.map((data, index) => {
                const selectId = `select-${index}`;
                return (
                    <div key={index} className="mt-4">
                        <h1 className="text-lg font-bold">{data.filterType}</h1>

                        {/* Show select on small screens */}
                        <div className="mt-2 sm:hidden">
                            <select
                                id={selectId}
                                className="w-full select select-ghost"
                                value={selectedValue}
                                onChange={(e) => handleClick(e.target.value)}
                            >
                                <option disabled value="">Pick a value</option>
                                {data.array.map((item, idx) => (
                                    <option key={idx} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Show radio buttons on medium+ screens */}
                        <div className="hidden mt-2 overflow-y-scroll sm:block h-58 no-scrollbar">
                            {data.array.map((item, idx) => {
                                const itemId = `id-${index}-${idx}`;
                                return (
                                    <div key={itemId} className="flex items-center gap-2 my-2">
                                        <input
                                            type="radio"
                                            id={itemId}
                                            name={`radio-group-${index}`} // unique group per filterType
                                            className="radio"
                                            value={item}
                                            checked={selectedValue === item}
                                            onChange={() => handleClick(item)}
                                        />
                                        <label htmlFor={itemId}>{item}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FilterData;
