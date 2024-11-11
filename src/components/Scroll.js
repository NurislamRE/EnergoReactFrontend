import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const ScrollButton = () =>{ 
  
    const [visible, setVisible] = useState(false) 
    
    const toggleVisible = () => { 
      const scrolled = document.documentElement.scrollTop; 
      if (scrolled > 300){ 
        setVisible(true) 
      }  
      else if (scrolled <= 300){ 
        setVisible(false) 
      } 
    }; 
    
    const scrollToTop = () =>{ 
      window.scrollTo({ 
        top: 0,  
        behavior: 'smooth'
        /* you can also use 'auto' behaviour 
           in place of 'smooth' */
      }); 
    }; 
    
    window.addEventListener('scroll', toggleVisible); 
    
    return ( 

        <IconButton
          style={{ width: "auto", float: "right" }}
          color="primary"
          aria-label="edit"
          title="Редактировать"
          onClick={scrollToTop}
        >
          <EditIcon />
        </IconButton>
    ); 
  } 
    
  export default ScrollButton; 