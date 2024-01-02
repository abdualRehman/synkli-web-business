import React from 'react'
import "./ann-skeleton.css"
import { BioSkeleton } from 'components/profile-content/profile-skeleton/BioSkeleton'
export const AnnDetailSkeleton = () => {
  return (
       <div >

    <div className=' mt-2 ann-skeleton'> 
       <div className=' ann-detail-skeleton'></div> 
         <div className="detail-heading-strip mt-5"> </div>
          <div className="mt-2">   <BioSkeleton lines={5} /></div>
    </div>
</div>
  )
}
