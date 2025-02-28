import React, { useContext, useEffect, useState } from 'react'
import PersonalDetail from './form/PersonalDetail'
import { Button } from '../../../components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './form/Summery'
import Experience from './form/Experience'
import Education from './form/Education'
import Skills from './form/Skills'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'



const FormSection = () => {

    const {resumeId} = useParams()
    const[activeFormIndex,setActiveFormIndex]= useState(1)
    const[enableNext,setEnableNext] = useState(false)

    const navigate = useNavigate(); // Use useNavigate instead of <Navigate />

    // Navigate when activeFormIndex reaches 6
    useEffect(() => {
        if (activeFormIndex === 6) {
            navigate(`/my-resume/${resumeId}/view`);
        }
    }, [activeFormIndex, resumeId, navigate]);
  return (
    <div >

    <div className='flex justify-between items-center'>
    <div className='flex gap-5'>
            <Link to={"/dashboard"}>
          <Button><Home/></Button>
          </Link>
          <ThemeColor/>
         
          </div>
        <div className='flex gap-2'>
        {
            activeFormIndex >0&&<Button 
            onClick={()=>{setActiveFormIndex(activeFormIndex-1)}}
            size='sm'><ArrowLeft/></Button>
        }
            <Button
             className="flex gap-2" size="sm"
             disabled={!enableNext}
             onClick={()=>{setActiveFormIndex(activeFormIndex+1)}}
            >Next <ArrowRight/></Button>
        </div>
    </div>
     {/* Personal Detail  */}
     {
        activeFormIndex == 1? 
        <PersonalDetail enableNext={(v)=>setEnableNext(v)} /> :
        activeFormIndex == 2? 
        <Summery enableNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex ==3? 
        <Experience enableNext={(v)=>setEnableNext(v)}/>:
    activeFormIndex == 4 ?
    <Education/>:
    activeFormIndex == 5?
    <Skills/>:
    null
     }
   

      {/* Experience  */}

      {/* Educational Detail  */}

      {/* Skills  */}

    </div>
  )
}

export default FormSection
