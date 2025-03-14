import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
    const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs,setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 max-w-6xl mx-auto w-full mt-5 px-4">
                <div className="w-1/5 pr-4 border-r border-gray-200">
                    <FilterCard />
                </div>
                <div className="w-4/5 pl-4 overflow-y-auto">
                    {filterJobs.length === 0 ? (
                        <span>Job Not Found</span>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
                            {filterJobs.map((job) => (
                                <div key={job?._id}>
                                    <Job job={job} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
