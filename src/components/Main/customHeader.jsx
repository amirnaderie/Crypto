import React from 'react';
import Burger from "./burger";
import Profile from "./profile";
import Logo from "./logo";

const CustomHeader = ({open,setOpen}) => {
   
    return ( 
        <header className="py-3 position-fixed bg-light" style={{top: '0',right: '0',left: '0','zIndex': '5',height: '53px'}}>
        
            <div><Burger open={open} setOpen={setOpen} />
            {/* <Profile /> */}
              <Logo/>
               </div>
        
        
       </header>
     );
}
 
export default CustomHeader;