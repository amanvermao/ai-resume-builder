import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { Button } from '../../../components/ui/button'
import { Brain, LoaderCircle } from 'lucide-react'
import { AIChatSession } from '../../../../Service/AIModal'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'

const PROMPT=`Position Title: {positionTitle}.  
Generate 5-7 bullet points for my resume experience **in pure HTML list format (without JSON or any object key)**.  
Return only <li> elements inside an unordered list <ul>.  
Do not include additional text, labels, or JSON formatting.`

const RichTextEditor = ({onRichTextEditorChange,index,defaultValue}) => {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [value,setValue] = useState(defaultValue)
    const [loading,setLoading]=useState(false);

    const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
        toast('Please Add Position Title');
        return;
    }
    setLoading(true);

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
    const result = await AIChatSession.sendMessage(prompt);
    const resp = await result.response.text();

    try {
        // If response is a JSON string, parse it
        const jsonResp = JSON.parse(resp);

        if (jsonResp[0]?.bulletPoints) {
            setValue(jsonResp[0].bulletPoints.trim()); // Set only the HTML list content
        } else {
            setValue(resp.trim()); // Fallback in case of unexpected format
        }
    } catch (error) {
        console.log("Response is not JSON, using raw output.");
        setValue(resp.trim()); // Use raw text if JSON parsing fails
    }

    setLoading(false);
};

  return (
    <div>
<div  className='flex justify-between my-2'>
    <label htmlFor="" className='text-xs'>Summery</label>
     <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
</div>

    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
         
         
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
