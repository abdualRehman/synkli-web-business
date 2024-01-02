import React from 'react'
import "./css/profile-skeleton.css"
import { useState } from 'react'
import { useEffect } from 'react'
export const ProfileSkeleton = ({numOfSlides}) => {
  
    const [divs, setDivs] = useState([]);

    useEffect(() => {
      const divElements = Array.from({ length: numOfSlides }, (_, index) => (
        <div key={index}  className='team-details-skeleton-name profile-details-skeleton-name'></div>
      ));
      setDivs(divElements);
    }, [numOfSlides]);
  
  return (
    <div >
        <div className='flex gap-5 items-center  details-skeleton profile-skeleton'> 
            <div> <div className='profile-skeleton-details'></div> </div>
            <div className='flex gap-3 flex-col  '> 
               <div className='team-details-skeleton-name profile-details-skeleton-name'></div>   
                <div className="flex items-center gap-3 flex-wrap">
                   {divs}
                 </div>   
            </div>
        </div>
    </div>
  )
}
