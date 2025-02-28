import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalAPI from '../../../../../Service/GlobalAPI'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from "sonner"
import { AIChatSession } from '../../../../../Service/AIModal'

const Summery = ({enableNext}) => {
const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)

const [summery,setSummery] = useState()
const params=useParams();
const [loading,setLoading] = useState(false)
const prompt = 'Job Title: {jobTitle},  Depends on job title give me summery for my resume within 4-5 lines in JSON format with field experince Level and Summery with Experience level for Fresher, Mid-Level, Experienced'

const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();

useEffect(()=>{
    summery&&setResumeInfo({
        ...resumeInfo,
        summery:summery
    })
},[summery])

const GenerateSummeryFromAI = async()=>{
    setLoading(true)
    const PROMPT = prompt.replace('{jobTitle}' , resumeInfo?.jobTitle)
    console.log(PROMPT);
    
 const result = await  AIChatSession.sendMessage(PROMPT)

 console.log(JSON.parse(result.response.text()));
 setAiGenerateSummeryList(JSON.parse([result.response.text()]))
 setLoading(false)

}

const onSave=(e)=>{
    e.preventDefault();
    
    setLoading(true)
    const data={
        data:{
            summery:summery
        }
    }
  
          GlobalAPI.UpdateResumeDetail(params?.resumeId,data).then((resp)=>{
              console.log(resp);
              enableNext(true) 
              setLoading(false)
              toast("Details Updated")
          }, (error)=>{
              setLoading(false)
          })
}

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>
    </div>

    <form className='mt-7' onSubmit={onSave}>
    <div className='flex justify-between items-end'>
                <label>Add Summery</label>
               
                <Button variant="outline"
                onClick={()=>{GenerateSummeryFromAI()}}
                type="button" size="sm" className="border-primary text-primary flex gap-2"> 
                <Brain  className='h-4 w-4'/> Generate from AI</Button>
            </div>
            <Textarea className="mt-5"
            onChange= {(e)=>{setSummery(e.target.value)}}
             required />
             <div className='mt-2 flex justify-end'>
             <Button
                disabled={loading}
                 type="submit">  {loading?<LoaderCircle className='animate-spin'/>:"save"}</Button>
             </div>
             </form>

             {aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experienceLevel}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
    </div>

  )
}

export default Summery
