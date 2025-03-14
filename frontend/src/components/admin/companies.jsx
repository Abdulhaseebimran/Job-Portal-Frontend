import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Navbar from '../shared/Navbar';
import CompaniesTable from './CompaniesTable';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { setSearchCompanyByText } from '../../../redux/companySlice.js'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen">
            <Navbar />
            <motion.div
                className="max-w-6xl mx-auto py-10 px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Input
                        className="w-full sm:w-auto border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition-all"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        New Company
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <CompaniesTable />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Companies;
