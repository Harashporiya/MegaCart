"use client"
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Fashion.css'
const Fashion: React.FC = () => {

  const [name, setName] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [accessorySize, setAccessorySize] = useState<string>('');
  const [footwearSize, setFootwearSize] = useState<string>('');
  const [bagSize, setBagSize] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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

    if (images.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('category', category);


    if (accessorySize) formData.append('accessorySize', accessorySize);
    if (footwearSize) formData.append('footwearSize', footwearSize);
    if (bagSize) formData.append('bagSize', bagSize);
    if (size) formData.append('size', size);

    formData.append('price', price);
    formData.append('description', description);


    images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('/api/Fashion', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Fashion item created successfully!');
        resetForm();
      } else {
        toast.error(result.message || 'Error creating fashion item');
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
    setAccessorySize('');
    setFootwearSize('');
    setBagSize('');
    setSize('');
    setPrice('');
    setDescription('');
    setImages([]);
  };

  return (
    <div className="fashion-form-container">
      <form onSubmit={handleSubmit} className="fashion-form">
        <h2>Add Fashion Item</h2>


        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="WomensClothing">Women's Clothing</option>
            <option value="MensClothing">Men's Clothing</option>
            <option value="KidsClothing">Kids' Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Footwear">Footwear</option>
            <option value="BagsAndLuggage">Bags & Luggage</option>
          </select>
        </div>


        {category === 'Accessories' && (
          <div className="form-group">
            <label htmlFor="accessorySize">Accessory Size</label>
            <select
              id="accessorySize"
              value={accessorySize}
              onChange={(e) => setAccessorySize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="OneSize">One Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        )}

        {category === 'Footwear' && (
          <div className="form-group">
            <label htmlFor="footwearSize">Footwear Size</label>
            <select
              id="footwearSize"
              value={footwearSize}
              onChange={(e) => setFootwearSize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="US_6">US 6</option>
              <option value="US_7">US 7</option>
              <option value="US_8">US 8</option>
              <option value="US_9">US 9</option>
              <option value="US_10">US 10</option>
              <option value="US_11">US 11</option>
              <option value="US_12">US 12</option>
            </select>
          </div>
        )}

        {category === 'BagsAndLuggage' && (
          <div className="form-group">
            <label htmlFor="bagSize">Bag Size</label>
            <select
              id="bagSize"
              value={bagSize}
              onChange={(e) => setBagSize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="XLarge">Extra Large</option>
              <option value="Compact">Compact</option>
              <option value="Weekend">Weekend</option>
              <option value="Carry_On">Carry On</option>
            </select>
          </div>
        )}

        {['WomensClothing', 'MensClothing', 'KidsClothing'].includes(category) && (
          <div className="form-group">
            <label htmlFor="size">Clothing Size</label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

       
        <div className="form-group">
          <label htmlFor="image">
            Images
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            multiple
            onChange={handleImageChange}
           
          />
        </div>
        <div className="text-sm text-gray-600">
          Selected Images: {images.length}
        </div>
        <button type="submit" className="submit-btn">
          Create Fashion Item
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Fashion;