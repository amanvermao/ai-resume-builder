import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePriview from './preview/ExperiencePriview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'

const ResumePreviewSection = () => {
const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
     style={{
        borderColor:resumeInfo?.themeColor
    }}
    >
        {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* Summery  */}
        <SummeryPreview resumeInfo={resumeInfo}/>
            
        {/* Professional Experience  */}
          <ExperiencePriview resumeInfo={resumeInfo}/>
        {/* Educational  */}
       <EducationalPreview resumeInfo={resumeInfo}/>
        {/* Skilss  */}
        <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreviewSection
