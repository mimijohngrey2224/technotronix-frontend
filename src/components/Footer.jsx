import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="bg-orange-500 py-10 px-5 md:px-10 flex flex-col md:flex-row justify-between">
        <div className="flex items-center justify-center md:justify-start mb-5 md:mb-0">
          <p className="text-2xl font-bold">TECHNOTRONIX</p>
        </div>
        <div className="text-center md:text-left mb-5 md:mb-0">
          <h1 className="text-lg font-bold mb-2">Useful Links</h1>
          <ul>
            <li>
              <a className="hover:text-white" href="#">Home</a>
            </li>
            <li>
              <a className="hover:text-white" href="#">Contact</a>
            </li>
            <li>
              <a className="hover:text-white" href="#">Privacy Policy</a>
            </li>
            <li>
              <a className="hover:text-white" href="#">Term and Conditions</a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-lg font-bold mb-2">Follow Us</h1>
          <div className="flex justify-center md:justify-start gap-5">
            <FaSquareFacebook />
            <FaSquareXTwitter />
            <FaSquareInstagram />
            <FaTiktok />
          </div>
        </div>
      </div>
      <div className="bg-black text-white text-center py-2">
        <p>&copy; Copyright Technotronix | All rights reserved.</p>
      </div>
    </>
  );
}

export default Footer;







// import { FaFacebook } from "react-icons/fa6";
// import { BsTwitter } from "react-icons/bs";
// import { GrInstagram } from "react-icons/gr";
// import { FaTiktok } from "react-icons/fa6";

// function Footer() {
//   return (
//     <>
//     <div className="bg-orange-500 sm:py-[40px] px-[50px] flex-col lg:flex justify-between p-6">
//         <div className="flex items-stretch">
//             <p className="text-[24px] lg:text-[30px] font-bold">TECHNOTRONIX</p>
//         </div>
//         <div>
//             <h1 className="text-[18px] font-bold mb-[10px]">Useful Links</h1>
//             <ul>
//                 <li>
//                     <a className="hover:text-white" href="">Home</a>
//                 </li>
//                 <li>
//                     <a className="hover:text-white" href="">Contact</a>
//                 </li>
//                 <li>
//                 <a className="hover:text-white" href="">Privacy Policy</a>
//                 </li>
//                <li>
//                <a className="hover:text-white" href="">Terms and Conditions</a>
//                </li>
//             </ul>
//         </div>
//         <div>
//             <h1 className="text-[18px] md:font-bold mb-[10px]">Follow Us</h1>
//             <div className="flex gap-3">
//                 <FaFacebook />
//                 <BsTwitter />
//                 <GrInstagram />
//                 <FaTiktok />
//             </div>
//         </div>
//     </div>
//     <div className="bg-black text-white text-center py-[5px]">
//         <p>&copy;Copyright Technotronix | All Rights Reserved. </p>
//     </div>

//     </>
//   );
// }

// export default Footer;

