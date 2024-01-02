import React from 'react'
import "./app-skeleton.css"
export const AppSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-5 md:px-10 px-5">
         <div className='app-skeleton'> 
            <div> <div className='app-skeleton-details'></div> </div>
         
        </div>
        <div className='app-skeleton'> 
            <div> <div className='app-skeleton-details'></div> </div>
         
        </div>
           <div className='app-skeleton'> 
            <div> <div className='app-skeleton-details'></div> </div>
         
        </div>
        <div className='app-skeleton'> 
            <div> <div className='app-skeleton-details'></div> </div>
         
        </div>
        
    </div>
  )
}
