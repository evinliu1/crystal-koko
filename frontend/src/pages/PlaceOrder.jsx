import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('stripe');
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({...data,[name]:value}))

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      
      let orderItems = []

      for(const item in cartItems) {

          if (cartItems[item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === item))
            if (itemInfo) {
              itemInfo.quantity = cartItems[item]
              orderItems.push(itemInfo)
            }
          }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method) {
        case 'stripe':
          const response = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          if (response.data.success) {
            const {session_url} = response.data
            window.location.replace(session_url)
          } else {
            toast.error(response.data.message)
          }
          break;

          default:
            break;
      }

    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-center items-center gap-8 pt-5 sm:pt-14 min-h-[80vh]  max-w-[1200px] mx-auto'>
    {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="number" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full border border-gray-300 px-3.5 py-1.5 rounded' type="number" placeholder='Phone Number' />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment Options */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
