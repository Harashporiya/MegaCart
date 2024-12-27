"use client"
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PremiumFruits = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    
    
    switch (category) {
      case 'Imported_Plum':
        formData.append('importantPlum', weight);
        break;
      case 'DragonFruit':
        formData.append('DragonFruit', weight);
        break;
      case 'Apple':
        formData.append('Apple', weight);
        break;
      case 'LonganImported':
        formData.append('ImportedLongan', weight);
        break;
      case 'GreenKiwi':
        formData.append('GreenKiwi', weight);
        break;
      case 'ApplePinkLady':
        formData.append('ApplePinkLady', weight);
        break;
    }
    
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/PremiumFruits', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Premium fruit item created successfully!');
        resetForm();
      } else {
        toast.error(result.message || 'Error creating premium fruit item');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleImageChange = (e:any) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setName('');
    setWeight('');
    setCategory('');
    setPrice('');
    setDescription('');
    setImage(null);
  };

  const renderWeightOptions = () => {
    switch (category) {
      case 'Imported_Plum':
      case 'GreenKiwi':
        return (
          <>
            <option value="">Select Quantity</option>
            <option value="Pcs_2">2 Pieces</option>
            <option value="Pcs_4">4 Pieces</option>
            <option value="Pcs_6">6 Pieces</option>
            <option value="Pcs_8">8 Pieces</option>
            <option value="Pcs_10">10 Pieces</option>
          </>
        );
      case 'DragonFruit':
        return (
          <>
            <option value="">Select Weight</option>
            <option value="Gram_200">200 Gram</option>
            <option value="Gram_400">400 Gram</option>
            <option value="Gram_500">500 Gram</option>
            <option value="Gram_700">700 Gram</option>
            <option value="Gram_800">800 Gram</option>
            <option value="Gram_1000">1000 Gram</option>
          </>
        );
      case 'Apple':
      case 'ApplePinkLady':
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
      case 'LonganImported':
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Premium Fruit</h2>
      
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
            <option value="Imported_Plum">Imported Plum</option>
            <option value="DragonFruit">Dragon Fruit</option>
            <option value="Apple">Apple</option>
            <option value="LonganImported">Imported Longan</option>
            <option value="GreenKiwi">Green Kiwi</option>
            <option value="ApplePinkLady">Apple Pink Lady</option>
          </select>
        </div>

        {category && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {['Imported_Plum', 'GreenKiwi'].includes(category) ? 'Quantity' : 'Weight'}
            </label>
            <select
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              {renderWeightOptions()}
            </select>
          </div>
        )}

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
          Add Premium Fruit
        </button>
      </form>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default PremiumFruits;