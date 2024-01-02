import "../../dashboard-css/auth-css/backupCodes.css";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useState } from "react";
import { useEffect } from "react";
import { setLoader } from "../../../store/global/globalReducer";
import { generateBackupCodesThunk, regenerateBackupCodesThunk } from "../../../store/auth/slices";
import { Loader } from "../../common/Loader";
import { useNavigate } from "react-router-dom";
const BackupCodesPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.global.isLoading)
  const [codes, setCodes] = useState(null)
  const {data} = useSelector((state) => state.login)
  
  const firstLineCodes = codes?.slice(0, 5)
  const lastLineCodes = codes?.slice(5, 10)

  const contentRef = useRef(null);
  const secondContentRef = useRef(null);

  //download content
  const handleDownload = () => {
    const paragraphs = contentRef.current.getElementsByTagName("p");
    const secondP = secondContentRef.current.getElementsByTagName("p");
    let content = "";
    for (let i = 0; i < paragraphs.length; i++) {
      content += paragraphs[i].textContent + "\n";
    }

    for (let i = 0; i < secondP.length; i++) {
      content += secondP[i].textContent + "\n";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "content.txt";
    downloadLink.click();
    URL.revokeObjectURL(url);
  };

  //copy content

  const handleMerge = () => {
    const paragraphs1 = contentRef.current.getElementsByTagName("p");
    const paragraphs2 = secondContentRef.current.getElementsByTagName("p");
    let content = "";
    for (let i = 0; i < paragraphs1.length; i++) {
      content += paragraphs1[i].textContent + "\n";
    }
    for (let i = 0; i < paragraphs2.length; i++) {
      content += paragraphs2[i].textContent + "\n";
    }

    // Copy the merged content to clipboard
    navigator.clipboard
      .writeText(content)
      .then(() => {
        NotificationManager.success("Codes copied to clipboard", "Success");
      })
      .catch((error) => {
        console.error("Failed to copy content to clipboard:", error);
      });
  }; 

  useEffect(() => {
      const codeConfig = {
        user_id : data?.user_id,
        user_type : "employee"
      }
      dispatch(setLoader(true))
      
     setTimeout(() => {  dispatch(generateBackupCodesThunk(codeConfig)).then((response) => {
      dispatch(setLoader(false))
      if(response.payload) {
        setCodes(response.payload)
      }
    }).catch((error) => {
      dispatch(setLoader(false))
        console.log(error)
    }).finally(() => {
       dispatch(setLoader(false))
    })}, 500)
    
  }, [dispatch]) 
 
  const handleRegenrateCodes = async () => {
    const codeConfig = {
      user_id : data?.user_id,
      user_type : "employee"
    }
    dispatch(setLoader(true))
    
    await dispatch(regenerateBackupCodesThunk(codeConfig)).then((response) => {
          dispatch(setLoader(false))
          if(response.payload) {
            setCodes(response.payload)
          }
        }).catch((error) => {
          dispatch(setLoader(false))
            console.log(error)
        }).finally(() => {
           dispatch(setLoader(false))
        })
  }


  return (
    <div>

      <div>
        <button className="back-to-login-btn absolute top-5 left-5 px-5 py-2" onClick={() => navigate('/two/factor/auth')}>Go Back</button>
      </div>
      {isLoading && <Loader />}
      <div className="codes-wrapper">
        <div className="codes-container">
          <h1 className="text-center pt-2">Backup Codes</h1>
           
          <div>
            <div className="px-5 backup-text">
              Save your backup codes in a safe place. Without these you may not
              be able to login to your account if you lose access to your phone
              or can’t login using your security method.
            </div>
          </div>

          <div className="main-codes grid grid-cols-2 mx-20 mt-5 gap-16 shadow-md py-3">
            <div ref={contentRef} className="justify-self-end ">
               {firstLineCodes && firstLineCodes.map((code) => (
                <p key={code.user_backup_code_id}>{code.code}</p>
               ))}
            </div>
            <div ref={secondContentRef} className=" ">
             {lastLineCodes && lastLineCodes.map((code) => (
               <p key={code.user_backup_code_id}>{code.code}</p>
             ))}
            </div>
          </div>


          <div className="flex justify-center items-center gap-3 mt-5">
            <button
              onClick={handleMerge}
              className="copy-btn px-10 py-2 rounded-md"
            >
              Copy Codes
            </button>
            <NotificationContainer />
            <button
              onClick={handleDownload}
              className="download-btn px-10 py-2 rounded-md"
            >
              Download
            </button>
          </div>
          
          <div className="px-5 backup-text mt-5">
            You can use each backup code once. You can also get new codes if
            this set is no longer secure or if you’ve already used most of them.
          </div>

          <div className="flex justify-center items-center mb-10 mt-5">
            <button onClick={handleRegenrateCodes} className="download-btn px-10 cursor-pointer py-2 rounded-md">
              Get New Codes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupCodesPage;
