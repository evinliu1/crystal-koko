import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer relative' to={`/product/${id}`}>
            {/* Cascaded pastel pink box, slightly to the left and up */}
            <div className='absolute inset-0 bg-pink-200 rounded-xl opacity-60 -z-10 transform -translate-x-4 -translate-y-2 hover:opacity-100' />

            <div className='relative z-10'>
                <img className='opacity-85 hover:opacity-100 transition-opacity ease-in-out duration-500' src={image[0]} alt={name} />
            </div>

            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem
