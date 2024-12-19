import React, {useState, useEffect} from 'react'

const Signup = ({axios, setActiveComponent, notifyError, notifySuccess}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormFieldChange = (fieldName, e)=>{
    setUser({...user,  [fieldName]: e.target.value})
  }

  const createAccount = async(e)=>{
    e.preventDefault();
    if(user.name == "" || user.email == "" || user.password == "" || user.confirmPassword == ""){
      return notifyError("Please Provide All The Details");
    }
    notifySuccess("Creating Account ...");
    try{
      const response = await axios({
        method: "POST",
        url: '/api/v1/user/signup',
        withCredentials: true,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirm: user.confirmPassword,
        }
      })
      
      if(response.data.status == "success"){
        notifySuccess("Account Created Successfully");
        localStorage.setItem(
          "USER_MEMBERSHIP",
          response.data.data.user.membershipType
        );
        localStorage.setItem(
          "CryptoBot_BackEnd",
          response.data.data.user._id
        );
        localStorage.setItem(
          "CryptoAuth_TOKEN",
          response.data.token
        )
        window.location.reload();
      } else {
        notifyError("Something Went Wrong")
      }
    }catch(error){
      console.log(error)
    }
  }
  console.log(user);
  return (
    <div className='techwave_fn_sign'>
      <div className='sign__content'>
        <h1 className='logo'>
          Designed By Thomas
        </h1>
        <form className='login'>
          <div className='form__content'>
            <div className='form_title'>Sign Up</div>
            <div className='form__username'>
              <label htmlFor="user_login">Name</label>
              <input type="text" className='input' onChange={(e)=> handleFormFieldChange("name", e)} />
            </div>
            <div className='form__username'>
              <label htmlFor="user_login">Email</label>
              <input type="text" className='input' onChange={(e)=> handleFormFieldChange("email", e)} />
            </div>
            <div className='form__username'>
              <label htmlFor="user_login">Password</label>
              <input type="text" className='input' onChange={(e)=> handleFormFieldChange("password", e)} />
            </div>
            <div className='form__username'>
              <label htmlFor="user_login">Confirm Password</label>
              <input type="text" className='input' onChange={(e)=> handleFormFieldChange("confirmPassword", e)} />
            </div>
            <div className='form__alternative'>
              <a onClick={(e)=> createAccount(e)} className="techwave_fn_button">
                <span>Create Account</span>
              </a>
            </div>
          </div>
        </form>

        <div className='sign__desc'>
          <p>Not a member?
            <a onClick={(e)=>setActiveComponent("Login")}>Login</a>
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default Signup
