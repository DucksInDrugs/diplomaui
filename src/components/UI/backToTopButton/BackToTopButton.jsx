import React, {useState} from 'react';
import classes from './BackToTopButton.module.css'
  
const BackToTopButton = () =>{ 
  
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
    }); 
  }; 
  
  window.addEventListener('scroll', toggleVisible); 
  
  return ( 
    <button onClick={scrollToTop} className={classes.btn} style={{display: visible ? 'inline' : 'none'}}>
        <a/>
    </button> 
     
  ); 
} 

export default BackToTopButton;