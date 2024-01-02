import React from 'react'
import "./team-detail-skeletons/team-details-skeleton.css"
export const TeamDetailSkeleton = () => {
  return (
    <div >
        <div className='flex gap-5 items-center p-5 details-skeleton'> 
            <div> <div className='team-detail-skeleton'></div> </div>
            <div className='flex gap-2 flex-col'> 
               <div className='team-details-skeleton-name'></div>   
               <div className='team-details-skeleton-name'></div>     
               <div className='team-details-skeleton-name'></div>       
            </div>
        </div>
    </div>
  )
}
