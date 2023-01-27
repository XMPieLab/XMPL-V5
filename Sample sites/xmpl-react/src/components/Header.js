import { useState } from "react"
import { Link } from "react-router-dom"
import logoIcon from './../assets/RoundTravel_Logo.png'

/* eslint-disable jsx-a11y/anchor-is-valid */
export const Header = () => {
	const [ isShowMenu, setShowMenu ] = useState(false)
	const showMenu = (e) => {
		e.preventDefault()
		setShowMenu(!isShowMenu)
	}
	return (
		<>
			<header id='header' className='alt'>
				<Link to='/' className='logo'>
					<img src={logoIcon} alt="Round Travel" />
				</Link>
				<nav>
					<a onClick={showMenu}>Menu</a>
				</nav>
			</header>

			<nav className={isShowMenu && 'visible'} id='menu' onClick={showMenu}>
				<ul className='links'>
					<li>
						<Link to='/'>Home Page</Link>
					</li>
					<li>
						<Link to='/content' xmp-tracking-action='Clicked Content'>
							Content Page
						</Link>
					</li>
					<li>
						<a href='https://www.xmpie.com' xmp-tracking-action='Clicked XMPie'>
							XMPie Website
						</a>
					</li>
					<li>
						<a
							href='https://campus.xmpie.com'
							xmp-tracking-action='Clicked Campus'
						>
							XMPie Campus
						</a>
					</li>
				</ul>
				<ul className='actions stacked'>
					<li>
						<Link to='/' className='button primary fit'>
							Get Started
						</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}
