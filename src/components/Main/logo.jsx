import React from 'react';
import { Link } from 'react-router-dom';
const Logo = () => {
    return ( 
        <div className="pb-1 mb-1 border-bottom text-center">
               <Link to="/home">
                  <img
                    src={process.env.PUBLIC_URL + "/images/flowers32.png"}
                    alt="Site Logo"
                  />
                </Link>
              </div>
     );
}
 
export default Logo;