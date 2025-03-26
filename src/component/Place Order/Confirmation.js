import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Confirmation = () => {
  return (
    <div className='empty'>
      <CheckCircleIcon style={{ color: '#eb4034' }} className='fs-1'/>
      <h1>Your Order has been Placed successfully</h1>
    </div>
  )
}

export default Confirmation
