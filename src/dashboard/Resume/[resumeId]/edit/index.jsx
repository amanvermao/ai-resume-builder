import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../component/FormSection';
import ResumePreviewSection from '../../component/ResumePreviewSection';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import dummy from '../../../data/dummy';
import GlobalAPI from '../../../../../Service/GlobalAPI';

const EditResume = () => {


    const {resumeId}=useParams();
    // const params = useParams();
    const [resumeInfo,setResumeInfo]= useState()

    useEffect(() => {
        GetResumeInfo();
    
}, []); // Include params.resumeId if it affects the initial data

const GetResumeInfo=()=>{
        GlobalAPI.GetResumeById(resumeId).then(resp=>{
          console.log(resp.data.data);
          setResumeInfo(resp.data.data);
        })
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        {/* form section */}
        <FormSection/>
        {/* preview section */}
        <ResumePreviewSection/>
        </ResumeInfoContext.Provider>
    </div>
  )
}

export default EditResume
