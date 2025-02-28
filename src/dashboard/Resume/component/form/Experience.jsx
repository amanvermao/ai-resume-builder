import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../components/ui/Input'
import { Button } from '../../../../components/ui/button'
import RichTextEditor from '../RichTextEditor'
import { useParams } from 'react-router-dom'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import GlobalAPI from '../../../../../Service/GlobalAPI'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const Experience = () => {

    
    const formField={
        title:'',
        companyName:'',
        city:'',
        state:'',
        startDate:'',
        endDate:'',
        workSummery:'',
    
    }

    const [experienceList, setExperienceList] = useState([
        formField
    ])

    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)

    const params=useParams();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        resumeInfo?.experience.length>0&& setExperienceList(resumeInfo?.experience)
        
    },[])


    const AddNewExperience = ()=>{
     setExperienceList([...experienceList, formField])

    }

    const RemoveExperience = ()=>{
  setExperienceList(experienceList=>experienceList.slice(0, -1))
    }


    const handleChange = (index,event) => {

        const newEntries = experienceList.slice();
        const {name,value} = event.target
        newEntries[index][name] = value
        setExperienceList(newEntries)
    }


const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experienceList.slice();
        newEntries[index][name]=e.target.value;
       
        setExperienceList(newEntries);
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experienceList
        });
     
    },[experienceList]);


    const onSave=()=>{
        setLoading(true);
    
    const data = {
        data: {
            experience: experienceList.map(({ id, currentlyWorking, ...rest }) => rest) // Ensure unwanted keys are removed
        }
    };

    console.log("Final Payload:", JSON.stringify(data, null, 2)); // Debugging line

    GlobalAPI.UpdateResumeDetail(params?.resumeId, data)
        .then(res => {
            console.log("Success:", res);
            setLoading(false);
            toast('Details updated!');
        })
        .catch(error => {
            setLoading(false);
            console.error("Error:", error?.response?.data);
            toast('Failed to update details!');
        });
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>

                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.title}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.companyName} />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.city} />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.state}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate} />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type="date" name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    {/* Work Summery  */}
                                    <RichTextEditor
                                    index ={index}
                                    defaultValue ={item?.workSummery}
                                        onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)} 
                                    />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                <div className='flex gap-2'>
                <Button variant="outline" onClick={AddNewExperience}  className="text-primary"> + Add More Experience</Button>
                <Button variant="outline" className="text-primary"  onClick={RemoveExperience}>- Remove</Button>
                </div>
                    
                <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
                </div>
            </div>

        </div>
    )
}

export default Experience
