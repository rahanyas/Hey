// import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import {useSelector} from 'react-redux'
// import { useNavigate}  from 'react-router-dom'
// import AddFriendBtnCompo from '../../components/AddFriendBtn.compo';
// import Friends from '../../components/Friends.compo';
// import './home.style.scss';

// const Home = () => {

//     const [showSearch, setShowSearch] = useState(false); 
//     const { friends } = useSelector(state => state.user); 

//     const navigate = useNavigate();

//     return (
//         <section id="container">
//             {
//                 friends.length !== 0 && (
//             <header className="top-bar">
//                 <div className="search-area">
//                     {
//                         showSearch ? (
//                             <input type="text" placeholder="Search friends..." />
//                         ) : (
//                             <h2>Search friends</h2>
//                         )
//                     }
//                 </div>

//                 <button 
//                     className="icon-btn"
//                     onClick={() => setShowSearch(prev => !prev)}
//                 >
//                     <FaSearch />
//                 </button>
//             </header>
//                 )
//             }
//             {/* Top Bar */}

//             {/* Main */}
//   <main className="friendsBox">
//   {friends.length === 0 && (
//     <div className="no-friends">
//       <h2>Add friends</h2>
//       <p>to get chat started</p>
//       <AddFriendBtnCompo className="add-btn" navigate={navigate}>
//         Add friend
//       </AddFriendBtnCompo>
//     </div>
//   )}

//   {/* to show friends of user that got from user state */}
//   <Friends friends={friends}/>

// </main>
//         </section>
//     );
// };

// export default Home;


import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddFriendBtnCompo from '../../components/AddFriendBtn.compo';
import Friends from '../../components/Friends.compo';
import './home.style.scss';

const Home = () => {

    const [showSearch, setShowSearch] = useState(false);
    const { friends } = useSelector(state => state.user);
    const navigate = useNavigate();

    return (
        <section id="hm-container">

            {/* ── Top bar — only when friends exist ── */}
            {friends.length !== 0 && (
                <header className="hm-topbar">
                    <div className="hm-brand">
                        <span className="hm-brand-dot" />
                        <span className="hm-brand-name">hey</span>
                    </div>

                    <div className={`hm-search-wrap ${showSearch ? 'hm-search-wrap--open' : ''}`}>
                        {showSearch && (
                            <input
                                className="hm-search-input"
                                type="text"
                                placeholder="Search friends…"
                                autoFocus
                            />
                        )}
                        {!showSearch && (
                            <span className="hm-search-label">Friends</span>
                        )}
                    </div>

                    <button
                        className="hm-icon-btn"
                        onClick={() => setShowSearch(prev => !prev)}
                        aria-label="Toggle search"
                    >
                        {showSearch ? <FaTimes /> : <FaSearch />}
                    </button>
                </header>
            )}

            {/* ── Section label when friends exist ── */}
            {friends.length !== 0 && !showSearch && (
                <p className="hm-section-label">
                    {friends.length} {friends.length === 1 ? 'contact' : 'contacts'}
                </p>
            )}

            {/* ── Main content ── */}
            <main className="hm-body">

                {/* Empty state */}
                {friends.length === 0 && (
                    <div className="hm-empty">
                        <div className="hm-empty__icon">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="16" r="7" stroke="currentColor" strokeWidth="2"/>
                                <path d="M4 40c0-7.732 6.268-14 14-14h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <circle cx="34" cy="30" r="2" fill="currentColor"/>
                                <path d="M34 24v4M34 34v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <circle cx="34" cy="30" r="10" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <h2 className="hm-empty__title">No contacts yet</h2>
                        <p className="hm-empty__sub">Add a friend to start chatting.</p>
                        <AddFriendBtnCompo className="hm-add-btn" navigate={navigate}>
                            Add friend
                        </AddFriendBtnCompo>
                    </div>
                )}

                {/* Friends list */}
                <Friends friends={friends} />

            </main>
        </section>
    );
};

export default Home;