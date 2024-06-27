import React from 'react'
import Card from '../shared/Card'
import { useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import { inventory } from '../../data/EcomData'
import { Link } from 'react-router-dom'


function Products() {

  const {ShadowRoom, product} = useContext(EcomContext)

  return (
    <div className='my-[20px] mx-[30px]' >
      <h1 className="mb-[10px] text-orange-500 font-bold text-2xl text-left">Products Check</h1>
      <div className='flex gap-2 justify-evenly flex-wrap'>
      {product.map((item)=> (
      <Card key={item._id}>
        <Link to={`/detail/${item._id}`}><img src={"https://technotronix-api-vh62.onrender.com/" + item.img} alt="" className="h-[200px]" /></Link>
       
         <p className="font-bold">{item.name}</p>
         <p>{item.price}</p>
         <button className="bg-orange-500 text-white p-[10px] rounded mt-[10px]">Add to Cart</button>
     </Card>
   ))}
      </div>
      
    </div>
  )
}

export default Products

