import './assets/css/main.css';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { Footer } from './components/Footer';
import { MainBlock } from './components/MainBlock';
import { Contact } from './components/Contact';
import { useContext, useEffect } from 'react';
import { XmplContext, useAdors } from 'xmpl-react';

function App() {
    const { xmp } = useContext(XmplContext)
    const { getAdorValues } = useAdors();
    const rid = new URLSearchParams(window.location.search).get('rid')

    useEffect(() => {
        getAdorValues({
            rid,
            isLogin: true,
            adors: ['firstname', 'lastname', 'preference', 'email', 'photo1', 'photo2', 'photo3', 'photo4', 'backgroundColor', 'isClubMember', 'showForm', 'showThanks'],
            resolved: ['photo1', 'photo2', 'photo3', 'photo4'],
            async: false,
            isCached: true,
            noCache: false,
        })
    }, [xmp])
    return (
        <div className="App">
            <div id="wrapper">
                <Header/>
                <Banner/>
                <MainBlock/>
                <Contact/>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
