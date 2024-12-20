import React, {useState, useEffect} from 'react'

const Login = ({axios, setActiveComponent, notifyError, notifySuccess}) => {
    const [user, setUser] = useState({
        email: "",
        password: ""
      });
    
      const handleFormFieldChange = (fieldName, e)=>{
        setUser({...user,  [fieldName]: e.target.value})
      }
    
      const apiLogin = async(e)=>{
        e.preventDefault();
        if(user.email == "" || user.password == ""){
          return notifyError("Please Provide Email And Password");
        }
        notifySuccess("Login To Your Account ...");
        
        try{

          const response = await axios({
            method: "POST",
            url: '/api/v1/user/login',
            withCredentials: true,
            data: {
              email: user.email,
              password: user.password,
            }
          })
          console.log("hii")
          
          if(response.data.status == "success"){
            notifySuccess("Account LoggedIn Successfully");
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
            console.log(response)
            // window.location.reload();
          } else if(response.data.status == "fail") {
            console.log("here")
            notifyError(response.data.message);
          }
        }catch(error){
          console.log(error)
        }
      }
    return (
        <div className='techwave_fn_sign'>
          <div className='sign__content'>
            <h1 className='logo'>
              Designed By Thomas
            </h1>
            <form className='login'>
              <div className='form__content'>
                <div className='form__title'>Login</div>

                <div className='form__username'>
                  <label htmlFor="user_login">Email</label>
                  <input type="text" className='input' onChange={(e)=> handleFormFieldChange("email", e)} />
                </div>
                <div className='form__username'>
                  <label htmlFor="user_login">Password</label>
                  <input type="text" className='input' onChange={(e)=> handleFormFieldChange("password", e)} />
                </div>
                
                <div className='form__alternative'>
                  <a onClick={(e)=> apiLogin(e)} className="techwave_fn_button">
                    <span>Sign In</span>
                  </a>
                </div>
              </div>
            </form>
    
            <div className='sign__desc'>
              <p>Not a member?
                <a onClick={(e)=>setActiveComponent("Signup")}>Signup</a>
              </p>
            </div>
          </div>
          
        </div>
      )
}

export default Login
