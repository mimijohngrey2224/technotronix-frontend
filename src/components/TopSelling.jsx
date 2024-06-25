import React, { useContext } from "react";
import Card from "./shared/Card";
import EcomContext from "../context/EcomContext";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function TopSelling() {
  const {topSelling, addToCart} = useContext(EcomContext)
  const [state, dispatch] = useContext(AuthContext)
  const isAuthenticated = state.accessToken !== null
  const redirect = useNavigate()

  const login = ()=> {
    if (!isAuthenticated) {
      redirect("/login")
    }

  }

  return (
    <div className='my-[20px] mx-[30px]'>
        <h1 className='mb-[10px] text-orange-500 font-bold text-2xl text-left pl-12'>Top Selling Products</h1>
        <div className='flex gap-5 flex-wrap justify-evenly'> 
        {topSelling.map((item) => (
            <Card key={item._id}>
              <Link to={`/detail/${item._id}`}><img src={"http://localhost:3000/" + item.img} alt="" className='h-[200px]' /></Link>
                <p className='font-bold'>{item.name}</p>
                <p>₦{item.price}</p>
                <button onClick={isAuthenticated ? ()=> addToCart(item._id) : login} className='bg-orange-500 text-white p-[10px] rounded mt-[10px]'>
                    Add to cart
                </button>
            </Card>
        ))}     
        </div>
    </div>
  );
}

export default TopSelling



