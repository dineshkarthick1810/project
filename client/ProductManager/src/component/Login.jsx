import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { useState,useEffect } from 'react'
import "../Form.css"
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
//for navigate to transcation page after register

const navigate=useNavigate()

    //for maintaing the input values in state
    const [Signname,setNameforsign]=useState("")
    const [Signmail,setMailforsign]=useState("")
    const [Signpassword,setPasswordforsign]=useState("")
    const [loginname,setLoginName]=useState("")
    const[loginpass,setLoginPassword]=useState("")
//for rendering conditionally whether sign or register
    const [register, setregister] = useState(true)


   

    //for validation form via bootstrap and our oqn logic

    useEffect(() => {




        const forms = document.querySelectorAll('.needs-validation')


        Array.from(forms).forEach(form => {

            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                

                form.classList.add('was-validated')

            }, false)
        })




    }, [])



    const handlesubmit = (e) => {
        const form=e.currentTarget


        

            
                if (!form.checkValidity()) {
                    e.preventDefault()
                    e.stopPropagation()
                }
                else {
                   const btnval=document.getElementById("btn")
                   if(btnval.innerText=="Register"){
                    handleRegister(e)

                   }else{
                    handlelogin(e)
                   }
                  


                }

                form.classList.add('was-validated')

           
       

    }

    //for handleregister function
    const handleRegister=(e)=>{
        e.preventDefault()
        navigate("/Transaction")
    }

//for handle login

const handlelogin=(e)=>{
    e.preventDefault()
    alert("under working")

}
  

  return (
    <div className='container aligning' >
        <div className='card forcardsize'>
        <form className='forform needs-validation ' noValidate onSubmit={(e)=>handlesubmit(e)} >

<p className='forlogo mb-4 mt-2'>{register ? "Register" : "Login"}</p>
{register ? <div className='formargin'>  <input type='text' className='forinput form-control' placeholder='Name' onChange={(e)=>setNameforsign(e.target.value)}    required />
    <input type='email' className='forinput mt-3 form-control' placeholder='Enter mail' onChange={(e)=>setMailforsign(e.target.value)} required />
    <input type='password' className='forinput mt-3 form-control' placeholder='Password' onChange={(e)=>setPasswordforsign(e.target.value)} required /></div> : <div className='formargin'>
    <input type='text' className='forinput form-control' placeholder='Name' onChange={(e)=>setLoginName(e.target.value)}required />
    <input type='password' className='forinput mt-3 form-control' placeholder='Password' onChange={(e)=>setLoginPassword(e.target.value)} required />

</div>}


<button className="btn btn-success px-3 mt-4 mb-3"  type='submit' id="btn" style={{ fontweight: "bold", fontSize: "16px" }} >{register ? "Register" : "Login"}</button>

<p className='text-muted'>{register ? "Already have an account?" : "Create account ?"} <span><Link to='#' className='text-decoration-none' onClick={() => setregister(!register)}>{register ? "Login" : "Register"}</Link></span></p>

</form>
</div>
      
    </div>
  )
}

export default Login
