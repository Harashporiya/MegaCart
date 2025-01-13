"use client";
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CategoryBeauty } from '@prisma/client';

const BeautyPage = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState<CategoryBeauty | ''>('');
    const [itemVolume, setItemVolume] = useState('');
    const [itemForm, setItemForm] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const validFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
            
            if (validFiles.length !== selectedFiles.length) {
                toast.error('Some files were not images and were excluded');
            }
            setImages(prevImages => [...prevImages, ...validFiles]);
        }
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images.length === 0) {
            toast.error('Please select at least one image');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('itemVolume', itemVolume || '');
        formData.append('itemForm', itemForm || '');
        
        images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('/api/Beauty', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Beauty item created successfully!');
                resetForm();
            } else {
                toast.error(result.message || 'Error creating beauty item');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Network error. Please try again.');
        }
    };

    const resetForm = () => {
        setName('');
        setBrand('');
        setCategory('');
        setItemVolume('');
        setItemForm('');
        setPrice('');
        setDescription('');
        setImages([]);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Beauty Item</h2>

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
                        Brand
                    </label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
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
                        onChange={(e) => setCategory(e.target.value as CategoryBeauty)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Skincare">Skincare</option>
                        <option value="Makeup">Makeup</option>
                        <option value="Hair_Care">Hair Care</option>
                        <option value="Fragrances">Fragrances</option>
                        <option value="Personal_Care">Personal Care</option>
                        <option value="Bath_Body">Bath & Body</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Item Form
                    </label>
                    <input
                        type="text"
                        value={itemForm}
                        onChange={(e) => setItemForm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Item Volume
                    </label>
                    <input
                        type="text"
                        value={itemVolume}
                        onChange={(e) => setItemVolume(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

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
                        Images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="text-sm text-gray-600">
                    Selected Images: {images.length}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                    Add Beauty Item
                </button>
            </form>

            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default BeautyPage;