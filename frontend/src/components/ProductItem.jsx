import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer relative ' to={`/product/${id}`}>

            <div className='relative z-10'>
                <img className='opacity-95 hover:opacity-100 transition-opacity ease-in-out rounded-xl ' src={image[0]} alt={name} />
            </div>

            <p className='pt-3 pb-1 text-sm text-center font-extrabold'>{name}</p>
            <p className='text-sm text-center font-extrabold'>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem
