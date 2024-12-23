"use client"
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Electronic.css"
const Electronic: React.FC = () => {
 
  const [name, setName] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<string>('0');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  
  
  const [processorType, setProcessorType] = useState<string>('');
  const [ramSize, setRamSize] = useState<string>('');
  const [storageType, setStorageType] = useState<string>('');
  const [storageCapacity, setStorageCapacity] = useState<string>('');
  const [displaySize, setDisplaySize] = useState<string>('');
  const [batteryCapacity, setBatteryCapacity] = useState<string>('');
  const [warranty, setWarranty] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stockQuantity', stockQuantity);
    formData.append('isAvailable', String(isAvailable));
    
   
    if (processorType) formData.append('processorType', processorType);
    if (ramSize) formData.append('ramSize', ramSize);
    if (storageType) formData.append('storageType', storageType);
    if (storageCapacity) formData.append('storageCapacity', storageCapacity);
    if (displaySize) formData.append('displaySize', displaySize);
    if (batteryCapacity) formData.append('batteryCapacity', batteryCapacity);
    if (warranty) formData.append('warranty', warranty);
    if (color) formData.append('color', color);
    if (weight) formData.append('weight', weight);
    
    
    if (image) {
        formData.append('image', image);
    }

    try {
      const response = await fetch('/api/Electronic', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Electronic item created successfully!');
        resetForm();
      } else {
        toast.error(result.message || 'Error creating electronic item');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
  };

  const resetForm = () => {
    setName('');
    setBrand('');
    setModel('');
    setCategory('');
    setPrice('');
    setDescription('');
    setStockQuantity('0');
    setIsAvailable(true);
    setProcessorType('');
    setRamSize('');
    setStorageType('');
    setStorageCapacity('');
    setDisplaySize('');
    setBatteryCapacity('');
    setWarranty('');
    setColor('');
    setWeight('');
    setImage(null);
  };

  return (
    <div className="electronic-form-container">
      <form onSubmit={handleSubmit} className="electronic-form">
        <h2>Add Electronic Item</h2>
        
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
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
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
            <option value="Smartphones">Smartphones</option>
            <option value="Laptops">Laptops</option>
            <option value="Tablets">Tablets</option>
            <option value="Headphones">Headphones</option>
            <option value="SmartWatches">Smart Watches</option>
            <option value="Speakers">Speakers</option>
            <option value="Cameras">Cameras</option>
            <option value="Printers">Printers</option>
            <option value="GameConsoles">Game Consoles</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stockQuantity">Stock Quantity</label>
          <input
            type="text"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isAvailable">Available</label>
          <input
            type="checkbox"
            id="isAvailable"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </div>

        {['Laptops', 'Tablets', 'Smartphones'].includes(category) && (
          <>
            <div className="form-group">
              <label htmlFor="processorType">Processor Type</label>
              <input
                type="text"
                id="processorType"
                value={processorType}
                onChange={(e) => setProcessorType(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ramSize">RAM (GB)</label>
              <input
                type="text"
                id="ramSize"
                value={ramSize}
                onChange={(e) => setRamSize(e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="storageType">Storage Type</label>
              <select
                id="storageType"
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
              >
                <option value="">Select Storage Type</option>
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
                <option value="EMMC">EMMC</option>
                <option value="NVMe">NVMe</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="storageCapacity">Storage Capacity (GB)</label>
              <input
                type="text"
                id="storageCapacity"
                value={storageCapacity}
                onChange={(e) => setStorageCapacity(e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="displaySize">Display Size (inches)</label>
              <input
                type="text"
                id="displaySize"
                value={displaySize}
                onChange={(e) => setDisplaySize(e.target.value)}
                step="0.1"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="batteryCapacity">Battery Capacity (mAh)</label>
              <input
                type="text"
                id="batteryCapacity"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(e.target.value)}
                min="0"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="warranty">Warranty (months)</label>
          <input
            type="text"
            id="warranty"
            value={warranty}
            onChange={(e) => setWarranty(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            
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
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Electronic Item
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Electronic;