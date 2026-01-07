
const AddFriendBtn = ({children, className, navigate}) => {

  function handleClick(){
    navigate('/addUserPage')
  };
  
  return (
    <button
    onClick={handleClick}
     className={className}>
      {children}
      </button>
  )
};

export default AddFriendBtn;