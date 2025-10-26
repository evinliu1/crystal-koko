import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem';
import Hero from '../components/Hero';
import GlassPane from '../components/GlassPane';

const Collection = () => {

  const {products} = useContext(ShopContext);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent');


  const applyFilter = () => {

    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=> a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=> b.price - a.price));
        break;

      default:
        applyFilter();
        break;

    }

  }

  useEffect(()=>{
    applyFilter();
  },[category, subCategory, products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col gap-2 pt-40 px-80 '>
      <GlassPane/>
        {/* Products */}
      <div className='flex-1 z-1'>
        <div className='gap-20 gap-y-6 flex justify-between flex-wrap'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Collection
