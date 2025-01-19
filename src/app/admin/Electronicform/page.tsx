"use client"
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type CategoryElectronic = 
  | "Smartphones"
  | "Laptops"
  | "Tablets"
  | "Headphones"
  | "SmartWatches"
  | "Speakers"
  | "Cameras"
  | "Printers"
  | "GameConsoles";

type StorageType = "SSD" | "HDD" | "EMMC" | "NVMe";

interface FormErrors {
  [key: string]: string;
}

const Electronic = () => {
 
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    category: '' as CategoryElectronic,
    price: '',
    description: '',
    stockQuantity: '0',
    isAvailable: true,
    processorType: '',
    ramSize: '',
    storageType: '' as StorageType,
    storageCapacity: '',
    displaySize: '',
    batteryCapacity: '',
    warranty: '',
    color: '',
    weight: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

 
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.color.trim()) newErrors.color = "Color is required";
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) newErrors.price = "Price must be a valid positive number";

    const stockQuantity = parseInt(formData.stockQuantity);
    if (isNaN(stockQuantity) || stockQuantity < 0) newErrors.stockQuantity = "Stock quantity must be a non-negative number";



    
    if (formData.ramSize && isNaN(parseInt(formData.ramSize))) {
      newErrors.ramSize = "RAM size must be a valid number";
    }

    if (formData.storageCapacity && isNaN(parseInt(formData.storageCapacity))) {
      newErrors.storageCapacity = "Storage capacity must be a valid number";
    }

    if (formData.displaySize && isNaN(parseFloat(formData.displaySize))) {
      newErrors.displaySize = "Display size must be a valid number";
    }

    if (formData.weight && isNaN(parseFloat(formData.weight))) {
      newErrors.weight = "Weight must be a valid number";
    }

    if (formData.warranty && isNaN(parseFloat(formData.warranty))) {
      newErrors.warranty = "Weight must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (images.length === 0) {
                toast.error('Please select at least one image');
                return;
            }

    
         
    
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }

    const formDataToSend = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '') {
        formDataToSend.append(key, value.toString());
      }
    });

   
  
    try {
      const response = await fetch('/api/Electronic', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Electronic item created successfully!');
        resetForm();
      } else {
        const errorMessage = result.errors?.[0]?.message || result.message || 'Error creating electronic item';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please try again.');
    }
  };


  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      model: '',
      category: '' as CategoryElectronic,
      price: '',
      description: '',
      stockQuantity: '0',
      isAvailable: true,
      processorType: '',
      ramSize: '',
      storageType: '' as StorageType,
      storageCapacity: '',
      displaySize: '',
      batteryCapacity: '',
      warranty: '',
      color: '',
      weight: '',
    });
    setImages([]);
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Add Electronic Item</h2>
        
      
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium">
              Brand *
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.brand ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.category ? 'border-red-500' : 'border-gray-300'} p-2`}
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
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
        </div>

       
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`mt-1 block w-full rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="stockQuantity" className="block text-sm font-medium">
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              min="0"
              className={`mt-1 block w-full rounded-md border ${errors.stockQuantity ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.stockQuantity && <p className="text-red-500 text-sm mt-1">{errors.stockQuantity}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="color" className="block text-sm font-medium">
              Color *
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`mt-1 block w-full rounded-md border ${errors.color ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
          </div>

          <div>
            <label htmlFor="warranty" className="block text-sm font-medium">
            Warranty *
            </label>
            <input
              type="number"
              id="warranty"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`mt-1 block w-full rounded-md border ${errors.warranty ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.warranty && <p className="text-red-500 text-sm mt-1">{errors.warranty}</p>}
          </div>
        </div>

     
        {['Laptops', 'Tablets', 'Smartphones'].includes(formData.category) && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="processorType" className="block text-sm font-medium">
                  Processor Type
                </label>
                <input
                  type="text"
                  id="processorType"
                  name="processorType"
                  value={formData.processorType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2"
                />
              </div>

              <div>
                <label htmlFor="ramSize" className="block text-sm font-medium">
                  RAM Size (GB)
                </label>
                <input
                  type="number"
                  id="ramSize"
                  name="ramSize"
                  value={formData.ramSize}
                  onChange={handleChange}
                  min="0"
                  className={`mt-1 block w-full rounded-md border ${errors.ramSize ? 'border-red-500' : 'border-gray-300'} p-2`}
                />
                {errors.ramSize && <p className="text-red-500 text-sm mt-1">{errors.ramSize}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="storageType" className="block text-sm font-medium">
                  Storage Type
                </label>
                <select
                  id="storageType"
                  name="storageType"
                  value={formData.storageType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2"
                >
                  <option value="">Select Storage Type</option>
                  <option value="SSD">SSD</option>
                  <option value="HDD">HDD</option>
                  <option value="EMMC">EMMC</option>
                  <option value="NVMe">NVMe</option>
                </select>
              </div>

              <div>
                <label htmlFor="storageCapacity" className="block text-sm font-medium">
                  Storage Capacity (GB)
                </label>
                <input
                  type="number"
                  id="storageCapacity"
                  name="storageCapacity"
                  value={formData.storageCapacity}
                  onChange={handleChange}
                  min="0"
                  className={`mt-1 block w-full rounded-md border ${errors.storageCapacity ? 'border-red-500' : 'border-gray-300'} p-2`}
                />
                {errors.storageCapacity && <p className="text-red-500 text-sm mt-1">{errors.storageCapacity}</p>}
              </div>
            </div>
          </div>
        )}

     
        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`mt-1 block w-full rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              Image *
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={`mt-1 block w-full ${errors.image ? 'text-red-500' : ''}`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Electronic Item
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Electronic;