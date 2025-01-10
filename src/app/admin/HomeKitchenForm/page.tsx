"use client"
import { Category } from '@prisma/client';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeKitchenForm = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState('');
    //const [volumeUnit, setvolumeUnit] = useState('');
    const [color, setColor] = useState<string>('')
    const [warranty, setWarranty] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('capacity', capacity);
        formData.append('color', color);
        formData.append('warranty', warranty);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('/api/HomeKitchen', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Home Kitchen item created successfully!');
                resetForm();
            } else {
                toast.error(result.message || 'Error creating home kitchen item');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Network error. Please try again.');
        }
    };

    const handleImageChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setName('');
        setCapacity(' ');
        setCategory('');
        setColor('');
        setWarranty('');
        setPrice('');
        setDescription('');
        setImage(null);
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Home Kitchen</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="COOKWARE">Cookware</option>
                        <option value="KITCHEN_APPLIANCES">Kitchen Appliances</option>
                        <option value="DINING_AND_SERVEWARE">Dining and serveware</option>
                        <option value="HOME_DECOR">Home Decor</option>
                        <option value="CLEANING_SUPPLIES">Cleaning Supplies</option>

                    </select>
                </div>
                {
                    category === "KITCHEN_APPLIANCES" ? (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Warranty (month)
                                </label>
                                <input
                                    type="number"
                                    value={warranty}
                                    onChange={(e) => setWarranty(e.target.value)}
                                    step="0.01"
                                    min="0"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    //required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    //required
                                />
                            </div>
                        </>
                    ):(
                        <>
                         <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Capacity
                    </label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        step="0.01"
                        min="0"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                        </>
                    )
                }
                {
                    category === 'COOKWARE' && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </>
                    )
                }

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        min="0"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 h-32"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                    Add Home Kitchen
                </button>
            </form>

            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default HomeKitchenForm;