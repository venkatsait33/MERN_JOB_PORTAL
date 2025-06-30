import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TableComponent from './TableComponent';

const CompanyTable = () => {

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);

    }, [companies, searchCompanyByText])



    return (
        <>
            <div>{
                companies.length === 0 ? <h1 className='text-center'>No Company Found</h1>
                    :
                    <TableComponent companyData={filterCompany} title="List of Your recent registered companies" link={'/recruiter/companies'} />
            }</div>

        </>

    );
};

export default CompanyTable;
