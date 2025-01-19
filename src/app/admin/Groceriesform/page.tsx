"use client"
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Groceries = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [weight, setWeight] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);


    if (['Fresh_vegetables', 'Fresh_fruits'].includes(category)) {
      formData.append('weight', weight);
    } else if (category === 'Sauces') {
      formData.append('SaucesWeight', weight);
    } else if (category === 'Oils_and_Vinegars') {
      formData.append('OilsAndVinegarsWeight', weight);
    } else if (category === 'Canned_foods') {
      formData.append('CannedFoodsWeight', weight);
    }

    formData.append('price', price);
    formData.append('description', description);

    if (images.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('/api/Groceries', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Grocery item created successfully!');
        resetForm();
      } else {
        toast.error(result.message || 'Error creating grocery item');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const resetForm = () => {
    setName('');
    setWeight('');
    setCategory('');
    setPrice('');
    setDescription('');
    setImages([]);
  };

  const renderWeightOptions = () => {
    switch (category) {
      case 'Fresh_vegetables':
      case 'Fresh_fruits':
        return (
          <>
            <option value="">Select Weight</option>
            <option value="Gram_500">500 Gram</option>
            <option value="Gram_1000">1000 Gram</option>
            <option value="Gram_1500">1500 Gram</option>
            <option value="Gram_2000">2000 Gram</option>
            <option value="Gram_2500">2500 Gram</option>
            <option value="Gram_3000">3000 Gram</option>
          </>
        );
      case 'Sauces':
        return (
          <>
            <option value="">Select Weight</option>
            <option value="Gram_250">250 Gram</option>
            <option value="Gram_450">450 Gram</option>
            <option value="Gram_500">500 Gram</option>
            <option value="Gram_1000">1000 Gram</option>
            <option value="Gram_1500">1500 Gram</option>
            <option value="Gram_2000">2000 Gram</option>
          </>
        );
      case 'Oils_and_Vinegars':
        return (
          <>
            <option value="">Select Volume</option>
            <option value="Ml_250">250 ML</option>
            <option value="Ml_500">500 ML</option>
            <option value="Ml_1000">1000 ML</option>
            <option value="Ml_1500">1500 ML</option>
            <option value="Ml_2000">2000 ML</option>
          </>
        );
      case 'Canned_foods':
        return (
          <>
            <option value="">Select Weight</option>
            <option value="GRAM_150">150 Gram</option>
            <option value="GRAM_250">250 Gram</option>
            <option value="GRAM_400">400 Gram</option>
            <option value="GRAM_450">450 Gram</option>
            <option value="GRAM_800">800 Gram</option>
            <option value="GRAM_1000">1000 Gram</option>
            <option value="GRAM_1500">1500 Gram</option>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Grocery Item</h2>

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="Fresh_vegetables">Fresh Vegetables</option>
            <option value="Fresh_fruits">Fresh Fruits</option>
            <option value="Canned_foods">Canned Foods</option>
            <option value="Sauces">Sauces</option>
            <option value="Oils_and_Vinegars">Oils & Vinegars</option>
          </select>
        </div>

        {category && (
          <div className="space-y-2">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              {category === 'Oils_and_Vinegars' ? 'Volume' : 'Weight'}
            </label>
            <select
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {renderWeightOptions()}
            </select>
          </div>
        )}

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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md h-32"
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
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Create Grocery Item
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Groceries;