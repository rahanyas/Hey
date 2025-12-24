import './addUser.style.scss'

const UserAdd = () => {
  return (
    <section id='contianer'>
        <header>
            {/* input for searching user */}
            <input type="text" placeholder='enter username'/>
        </header>

        {/* to display content related to search result */}
        <main>
            {/* section for displaying user profile and name with send request btn */}
            <div>

                {/* for displaying user profile and name */}
               <figure>
                <img src="/" alt="user-img" />
                <h3>user name</h3>
               </figure>
               {/* btn for sending req */}
                <button>send  request</button>
            </div>

        </main>
    </section>
  )
}

export default UserAdd;