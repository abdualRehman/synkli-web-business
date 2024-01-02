
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BackwardArrow } from 'utills/svgs/BackwardArrow'

export const AnnDetailsJumbo = () => {
  const navigate = useNavigate()
  const {data} = useSelector((state) => state.getSingleNews)
  return (
    <div className="profle-jumbo   flex   px-10 py-5 md:justify-between ">
    <div className="profile-jumbo-flex">
      <div className="jumbo-flex-1 ">
        <div className="jumbo-name flex items-center gap-2">
             <span className="cursor-pointer" onClick={() => navigate("/announcement")}> <BackwardArrow />  </span>
            <span>Announcements Details</span>
        </div>
        <div className="jumbo-dir mt-2">
          Workspace{" "}&gt; Announcements
          <span className="special-jumbo-text pl-1">&gt; {data?.title}</span>
        </div>
      </div>
    </div>
  
  </div>
  )
}
