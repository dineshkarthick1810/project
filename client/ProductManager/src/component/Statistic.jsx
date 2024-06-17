import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"

const Statistic = ({totalprice,soldItems,notSoldItems}) => {
  return (
    <>

<div style={{display:"flex",justifyContent:"center",width:"100%",height:"70vh",alignItems:"center"}}>

 


      <div className='card shadow' style={{ width: "600px",borderRadius:"20px",borderRight:"8px solid grey" }}>
        <div style={{display:"flex",justifyContent:"space-around"}} className='mt-5'>

          <p className='text-dark' style={{fontWeight:"bold"}}>Total price</p>
          <p className='text-white badge bg-primary px-3 py-2' style={{fontWeight:"bold"}}>{`$ ${Math.ceil(totalprice)}`} </p>
        </div>

        <div style={{display:"flex",justifyContent:"space-around"}} className='mt-5'>

<p className='text-dark' style={{fontWeight:"bold"}}>Total sold item</p>
<p className='text-white badge bg-primary px-3 py-2' style={{fontWeight:"bold"}}>{soldItems} </p>
</div>

<div style={{display:"flex",justifyContent:"space-around"}} className='mt-5'>

          <p className='text-dark' style={{fontWeight:"bold"}}>Total not sold item</p>
          <p className='text-white badge bg-primary px-3 py-2' style={{fontWeight:"bold"}}>{notSoldItems} </p>
        </div>


      </div>
      </div>
    </>

  )
}

export default Statistic
