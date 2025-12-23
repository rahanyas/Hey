import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import AddFriendBtnCompo from '../../components/AddFriendBtn.compo';
import './home.style.scss';

const Home = () => {

    const [showSearch, setShowSearch] = useState(false);  
    const [friends, setFriends] = useState([]);

    return (
        <section id="container">
            {/* navbar */}
            <header>
                {
                    showSearch === true  ?  (
                        <input type="text" placeholder='search friends' />
                    ) : (
                        <h2>serach friends</h2>
                    )
                }
               <span onClick={() => setShowSearch((prev) => !prev)}><FaSearch /></span> 
            </header>

            <main className='friendsBox'>
                {/* add friend btn showing when user has no friends */}
                <div className='no-friends'>
                    <h2>add friends <br /> to get chat started</h2>
                {
                    friends.length <= 0 && (
                        <AddFriendBtnCompo className='add-btn'>add friend</AddFriendBtnCompo>
                    )
                } 
                </div>

            </main>
            
        </section>
    )
};

export default Home