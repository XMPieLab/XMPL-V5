import logo from '../images/RoundTravel_Logo.png'
import { useEffect, useState } from 'react';

export const Header = () => {
    const [isMenuVisible, setisMenuVisible] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [isNavFixed, setisNavFixed] = useState(false);
    const toggleMenu = () => {
    document.body.className =  document.body.className === 'is-menu-visible' ? '' : 'is-menu-visible'
        setisMenuVisible(!isMenuVisible)
    }

    useEffect(()=>{
        const handleScroll = (event) => {
            setisNavFixed(scrollTop > 100)
            setScrollTop(window.scrollY)
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })
    return (
        <>
            <header id="header" className= {isNavFixed ? 'reveal' : 'alt reveal'}>
                <a href="" className="logo"><img src={logo} alt="'Round Travel"/></a>
                <nav>
                    <a onClick={toggleMenu} href="#menu">Menu</a>
                </nav>
            </header>
            <nav id="menu">
                <div className='inner'>
                    <ul className="links">
                        <li><a onClick={toggleMenu} href="">Home Page</a></li>
                        <li><a onClick={toggleMenu} href="">Content Page</a></li>
                        <li><a onClick={toggleMenu} href="https://www.xmpie.com">XMPie Website</a></li>
                        <li><a onClick={toggleMenu} href="https://campus.xmpie.com">XMPie Campus</a></li>
                    </ul>
                    <ul className="actions stacked">
                        <li><a onClick={toggleMenu} href="" className="button primary fit">Get Started</a></li>
                    </ul>
                </div>
                <a className='close' href='' onClick={toggleMenu}>Close </a>
            </nav>
        </>
    )
}
