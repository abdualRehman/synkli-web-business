import React from 'react'
import "./css/team.css"
import { MultipleUsers } from 'utills/svgs/MultipleUsers'
export const NoTeam = () => {
  return (
    <div className='no-team'>
     
       <div> <MultipleUsers /></div>
       <div> There is no team added yet </div>

    </div>
  )
}
