
const AddFriendBtn = ({children, className, navigate}) => {
  function handleClick(){
    navigate('/addUserPage')
  }
  return (
    <button className={className} onClick={handleClick}>{children}</button>
  )
};

export default AddFriendBtn;