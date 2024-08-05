import clubLogo from '../images/ClubMemberLogo.png'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { XmplContext } from 'xmpl-react';
import { useContext } from 'react';

export const Banner = () => {
    const { xmp } = useContext(XmplContext)

    return (
        <section id="banner" className="major">
            <div className="inner">
                <header className="major">
                    <h1>{`Hi ${xmp.r['firstname'] || ""}, welcome to Round Travel!`}</h1>
                </header>
                <div className="row">
                    <div className="content col-9 col-lg-6 col-md-12">
                        <p>Your personalized travel destination<br/>
                            brought to you by XMPie.</p>
                        <ul className="actions">
                            <li><AnchorLink href="#one" className="button next scrolly">Get Started</AnchorLink></li>
                        </ul>
                    </div>
                    <div className="col-3 col-lg-6 col-md-12">
                        <img src={clubLogo} alt="Travel Club Member" style={{display: `${!!+xmp.r['isClubMember'] ? 'block' : 'none'}`}}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
