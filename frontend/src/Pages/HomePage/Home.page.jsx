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
            {
                friends.length !== 0 && (
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
                )
            }
            {/* Top Bar */}

            {/* Main */}
            <main className="friendsBox">
                    {
                        friends.length === 0 && (
                <div className="no-friends">
                    <h2>Add friends</h2>
                    <p>to get chat started</p>

                            <AddFriendBtnCompo className="add-btn" navigate={navigate}>
                                Add friend
                            </AddFriendBtnCompo>
                </div>
                        )
                    }
{/* 
                    <div className="friends">
                            {
                                friends.map(user => (
                                    <h1>{}</h1>
                                ))
                            }
                    </div> */}
            </main>
        </section>
    );
};

export default Home;
