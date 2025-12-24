import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {useSelector} from 'react-redux'
import { useNavigate}  from 'react-router-dom'
import AddFriendBtnCompo from '../../components/AddFriendBtn.compo';
import './home.style.scss';

const Home = () => {

    const [showSearch, setShowSearch] = useState(false); 
    const { friends } = useSelector(state => state.user); 
    const navigate = useNavigate();
    return (
        <section id="container">
            {/* Top Bar */}
            <header className="top-bar">
                <div className="search-area">
                    {
                        showSearch ? (
                            <input type="text" placeholder="Search friends..." />
                        ) : (
                            <h2>Search friends</h2>
                        )
                    }
                </div>

                <button 
                    className="icon-btn"
                    onClick={() => setShowSearch(prev => !prev)}
                >
                    <FaSearch />
                </button>
            </header>

            {/* Main */}
            <main className="friendsBox">
                <div className="no-friends">
                    <h2>Add friends</h2>
                    <p>to get chat started</p>

                    {
                        friends.length <= 0 && (
                            <AddFriendBtnCompo className="add-btn" navigate={navigate}>
                                Add friend
                            </AddFriendBtnCompo>
                        )
                    }
                </div>
            </main>
        </section>
    );
};

export default Home;
