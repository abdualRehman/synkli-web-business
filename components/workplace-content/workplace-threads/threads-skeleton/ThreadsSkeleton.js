import React from 'react'
import "./threads-skeleton.css"
import { BioSkeleton } from 'components/profile-content/profile-skeleton/BioSkeleton'
export const ThreadsSkeleton = () => {
  return (
    <div>
     <div >
    <div className='flex gap-2   threads-skeleton '> 
        <div> <div className=' threads-skeleton-details'></div> </div>
        <div className='flex gap-3 flex-col  pt-3'> 
           <div className='team-details-skeleton-name profile-details-skeleton-name'></div>  
           <div className='team-details-skeleton-name profile-details-skeleton-name'></div>   
        
        </div>
       
     
       
    </div>
   
    <div className="mt-2 pl-14">   <BioSkeleton lines={5} /></div>
  
</div>
<div className="mt-2">
    <div className='flex gap-2   threads-skeleton '> 
        <div> <div className=' threads-skeleton-details'></div> </div>
        <div className='flex gap-3 flex-col  pt-3'> 
           <div className='team-details-skeleton-name profile-details-skeleton-name'></div>  
           <div className='team-details-skeleton-name profile-details-skeleton-name'></div>   
        
        </div>
       
     
       
    </div>
   
    <div className="mt-2 pl-14">   <BioSkeleton lines={5} /></div>
  
</div>
<div className="mt-2">

    <div className='flex gap-2   threads-skeleton '> 
        <div> <div className=' threads-skeleton-details'></div> </div>
        <div className='flex gap-3 flex-col  pt-3'> 
           <div className='team-details-skeleton-name profile-details-skeleton-name'></div>  
           <div className='team-details-skeleton-name profile-details-skeleton-name'></div>   
        
        </div>
       
     
       
    </div>
   
    <div className="mt-2 pl-14">   <BioSkeleton lines={5} /></div>
  
</div>
</div>
  )
}
