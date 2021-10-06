import React ,{useState} from 'react';
// import {Button} from './Button';
import {Link} from 'react-router-dom';
import Dropdown from './Dropdown';
import './Navbar.css';

function Navbar (){
    const [click,setClick]=useState(false);
    const [dropdown,setdropdown]= useState(false);
    const[mobile,setMobile]= useState(false);

    const handleClick= ()=>{setClick(!click);}
    const closeMobileMenu= ()=>{setClick(false)}
    
    const onMouseEnter=()=>{
        window.innerWidth<1000? setdropdown(false):setdropdown(true)
    }
    const onMouseLeave=()=>{
        setdropdown(false)
    }
    const mobileMenu=()=>{setMobile(!mobile);}
    
    return(
        <nav className='navbar'>
            <Link to='/home' className='navbar-logo'onClick={click &&closeMobileMenu}>
                <i class="fas fa-stethoscope"/>
                HMS
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times': 'fas fa-bars' }/>
            </div>
            <ul className={click?'nav-menu active':'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                    <i className='fas fa-home'/>
                        Home
                    </Link>
                </li>
                <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Link to='/Appointment' className='nav-links' onClick={mobileMenu}>
                    <i className='fas fa-tasks'/>
                    Appointment<i className={(mobile)?'fas fa-caret-up':'fas fa-caret-down'}/>
                    </Link>
                    {dropdown && <Dropdown/>}
                </li>{(mobile?
                <div className='nav-links-mobile-sub' onClick={closeMobileMenu}>
                    <Dropdown/>
                </div>
                    :'')}
                <li className='nav-item'>
                    <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                        <i className='fas fa-headset'/>
                        Support
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>
                        <i className='fas fa-tools'/>
                        Services
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                        <i className='fa fa-user'/>
                        Sign Up
                    </Link>
                </li>
            </ul>
            {/* <Button/> */}
        </nav>
    );
}

export default Navbar;