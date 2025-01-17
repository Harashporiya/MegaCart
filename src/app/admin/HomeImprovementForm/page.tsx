"use client"

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeImprovementForm = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState<string>('');
    const [brand, setBrand] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [numberOfItem, setNumberOfItem] = useState<string>('');
    const [material, setMaterial] = useState<string>('')
    const [headStyle, setHeadStyle] = useState<string>('')
    const [roomType, setRoomType] = useState<string>('');
    const [itemVolume, setItemVolume] = useState<string>('')
    const [itemForm, setItemForm] = useState<string>('')
    const [size, setSize] = useState<string>('')
    const [finishType, setFinishType] = useState<string>('')
    const [coolingPower, setCoolingPower] = useState<string>('')
    const [product, setProduct] = useState<string>('')
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
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();

          if (images.length === 0) {
                    toast.error('Please select at least one image');
                    return;
                }
        

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('capacity', capacity);
        formData.append('color', color);
        formData.append('brand', brand);
        formData.append('numberOfItem',numberOfItem);
        formData.append('material', material);
        formData.append('headStyle', headStyle);
        formData.append('roomType', roomType);
        formData.append('itemVolume', itemVolume);
        formData.append('itemForm', itemForm);
        formData.append('size', size);
        formData.append('finishType', finishType);
        formData.append('coolingPower',coolingPower);
        formData.append('product',product);

        images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('/api/HomeImprovement', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Home Improvement item created successfully!');
                resetForm();
            } else {
                toast.error(result.message || 'Error creating home improvement item');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Network error. Please try again.');
        }
    };

    

    const resetForm = () => {
        setName('');
        setCapacity(' ');
        setCategory('');
        setColor('');
        setBrand('')
        setItemForm('')
        setItemVolume('')
        setFinishType('')
        setCoolingPower('')
        setNumberOfItem('')
        setMaterial('')
        setHeadStyle('')
        setRoomType('')
        setSize('')
        setProduct('')
        setPrice('');
        setDescription('');
        setImages([]);
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Home Improvement</h2>

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
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Tools">Tools</option>
                        <option value="Lighting">Lighting</option>
                        <option value="PaintAndSupplies">Paint And Supplies</option>
                        <option value="BathroomAndFixtures">Bathroom And Fixtures</option>
                        <option value="HeatingAndCooling">Heating And Cooling </option>

                    </select>
                </div>
                {
                    category !== "HeatingAndCooling" ? (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Material
                                </label>
                                <input
                                    type="text"
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value)}
                                   
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
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
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
                {
                    category === 'HeatingAndCooling' && (
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

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    CoolingPower
                                </label>
                                <input
                                    type="text"
                                    value={coolingPower}
                                    onChange={(e) => setCoolingPower(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Product
                                </label>
                                <input
                                    type="number"
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
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
                    category === "Tools" ? (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Number of itmes
                                </label>
                                <input
                                    type="text"
                                    value={numberOfItem}
                                    onChange={(e) => setNumberOfItem(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Head Style
                                </label>
                                <input
                                    type="text"
                                    value={headStyle}
                                    onChange={(e) => setHeadStyle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>

                        </>
                    )
                }
                {
                    category === "PaintAndSupplies" ? (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Finish type
                                </label>
                                <input
                                    type="text"
                                    value={finishType}
                                    onChange={(e) => setFinishType(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
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
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>

                        </>
                    )
                }

                {
                    category === "BathroomAndFixtures" && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Finish type
                                </label>
                                <input
                                    type="text"
                                    value={finishType}
                                    onChange={(e) => setFinishType(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </>
                    )
                }

                {
                    category === "Lighting" && (
                        <>
                         <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Head Style
                                </label>
                                <input
                                    type="text"
                                    value={headStyle}
                                    onChange={(e) => setHeadStyle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Room Type
                                </label>
                                <input
                                    type="text"
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </>
                    )
                }

                <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded-md"
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
                    Add Home Improvement
                </button>
            </form>

            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default HomeImprovementForm;