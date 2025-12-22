import { FaSearch } from 'react-icons/fa';

import './home.style.scss'
import { useState } from 'react';
const Home = () => {
    const [showSearch, setShowSearch] = useState(false);  
    return (
        <section id="container">
            <nav>
                {
                    showSearch &&  (
                        <input type="text" placeholder='search friends' />
                    )
                }
               <span onClick={() => setShowSearch((prev) => !prev)}><FaSearch /></span> 
            </nav>
        </section>
    )
};

export default Home