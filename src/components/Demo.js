import React from 'react';

const Demo = (props) => {
    
    React.useEffect(()=>{
        fetch('https://menuonline.com/api/getAllOrders/ready?outlet_id=1',{
            headers: {
                'Authorization': 'Bearer 5SWxeDSbigILo3bA4aGlX4PzG8GhR9BNVn70rhA2p1ZwoXKAZhTE9xhni1Wf',
                crossDomain:true,
                'Content-Type':'x-www-form-urlencoded'
              }
        })
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res)
  })

    },[])

   
        return (
          
   <div>sdfsdfsd
       </div>
        
        );
  
}
export default Demo;