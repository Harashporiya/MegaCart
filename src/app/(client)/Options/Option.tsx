"use client"
import React, { useState } from 'react';
import "./Option.css";
import Svgdown from './Svgdown';
import Svgup from './Svgup';

interface MenuItem {
  label: string;
  content?: () => React.ReactNode;
}

const Options: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [backgroundDark, setBackgroundDark] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
    setBackgroundDark(activeItem === index ? null : index);
  };

  const groceries = () => {
    return (
      <div className="menu-item-content">
        <p className='Item-groceries'>Fresh vegetables</p>
        <p className='Item-groceries'>Fresh fruits</p>
        <p className='Item-groceries'>Canned foods</p>
        <p className='Item-groceries'>Sauces</p>
        <p className='Item-groceries'>Oils & Vinegars</p>
      </div>
    );
  };

  const premiumFruits = () => {
    return (
      <div className="menu-item-content">
        <p className='Item-fruits'>Imported Plum</p>
        <p className='Item-fruits'>Dragon fruit</p>
        <p className='Item-fruits'>Apple</p>
        <p className='Item-fruits'>Longan - imported</p>
        <p className='Item-fruits'>Green Kiwi</p>
        <p className='Item-fruits'>Apple - Pink Lady</p>
      </div>
    );
  };

  const homeKitchen = () => {
    return (
      <div className="menu-item-content">
        <p className='Item-kitchen'>Cookware</p>
        <p className='Item-kitchen'>Kitchen Appliances</p>
        <p className='Item-kitchen'>Dining & Serveware</p>
        <p className='Item-kitchen'>Home Decor</p>
        <p className='Item-kitchen'>Cleaning Supplies</p>
      </div>
    );
  };

  const fashion = () => {
    return (
      <div className="menu-item-content">
        <p className='Item-fashion'>Women's Clothing</p>
        <p className='Item-fashion'>Men's Clothing</p>
        <p className='Item-fashion'>Kids' Clothing</p>
        <p className='Item-fashion'>Accessories</p>
        <p className='Item-fashion'>Footwear</p>
        <p className='Item-fashion'>Bags & Luggage</p>
      </div>
    );
  };

  const electronic = () => {
    return (
      <div className="menu-item-content">
        <p className='Item-electronic'>Smartphones</p>
        <p className='Item-electronic'>Laptops</p>
        <p className='Item-electronic'>Tablets</p>
        <p className='Item-electronic'>Headphones</p>
        <p className='Item-electronic'>Smart Watches</p>
        <p className='Item-electronic'>Speakers</p>
        <p className='Item-electronic'>Printers</p>
        <p className='Item-electronic'>GameConsoles</p>
      </div>
    );
  };

  const beauty = () => {
    return (
      <div className="menu-item-content">
        <p className='Item-beauty'>Skincare</p>
        <p className='Item-beauty'>Makeup</p>
        <p className='Item-beauty'>Hair Care</p>
        <p className='Item-beauty'>Fragrances</p>
        <p className='Item-beauty'>Bath & Body</p>
      </div>
    );
  };

  const homeImprovement = () => {
    return (
      <div className="menu-item-content">
        <p className='Item-home-improvement'>Tools</p>
        <p className='Item-home-improvement'>Lighting</p>
        {/* <p className='Item-home-improvement'>Hardware</p> */}
        <p className='Item-home-improvement'>Paint & Supplies</p>
        <p className='Item-home-improvement'>Bathroom Fixtures</p>
        <p className='Item-home-improvement'>Heating & Cooling</p>
      </div>
    );
  };

  const sportsToys = () => {
    return (
      <div className="menu-item-content">
        <p className='Item-sports-toys'>Outdoor Sports</p>
        <p className='Item-sports-toys'>Indoor Games</p>
        <p className='Item-sports-toys'>Fitness Equipment</p>
        <p className='Item-sports-toys'>Toys & Collectibles</p>
        <p className='Item-sports-toys'>Luggage</p>
        <p className='Item-sports-toys'>Travel Accessories</p>
      </div>
    );
  };

  const menuItems: MenuItem[] = [
    {
      label: "Groceries",
      content: groceries
    },
    { 
      label: "Premium Fruits",
      content: premiumFruits
    },
    { 
      label: "Home & Kitchen",
      content: homeKitchen
    },
    { 
      label: "Fashion",
      content: fashion
    },
    { 
      label: "Electronic",
      content: electronic
    },
    { 
      label: "Beauty",
      content: beauty
    },
    { 
      label: "Home Improvement",
      content: homeImprovement
    },
    { 
      label: "Sports, Toys & Luggage",
      content: sportsToys
    }
  ];

  return (
    <div className="menu-container">
      {menuItems.map((item, index) => (
        <div key={`${item.label}-${index}`} className="menu-item-wrapper">
          <div 
            className={`menu-item ${activeItem === index ? 'active' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            <span className="menu-item-label">{item.label}</span>
            { 
              activeItem === index ? <Svgup /> : <Svgdown />
             
            }
          </div>
          {activeItem === index && item.content && (
            <div className="menu-item-dropdown">
              {item.content()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Options;