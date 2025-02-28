import React, { useEffect, useState } from 'react';
import Header from '../../../components/custom/Header';
import { Button } from '../../../components/ui/button';
import ResumePreviewSection from '../../../dashboard/Resume/component/ResumePreviewSection';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import GlobalAPI from '../../../../Service/GlobalAPI';
import { useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';

const ViewResume = () => {
    const [resumeInfo, setResumeInfo] = useState(null);
    const { resumeId } = useParams();

    useEffect(() => {
        if (resumeId) {
            GetResumeInfo();
        }
    }, [resumeId]);

    const GetResumeInfo = () => {
        GlobalAPI.GetResumeById(resumeId)
            .then(resp => {
                console.log(resp.data.data);
                setResumeInfo(resp.data.data);
            })
            .catch(error => {
                console.error("Error fetching resume info:", error);
            });
    };

    const HandleDownload = () => {
        window.print();
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <Header />
            <div id="no-print">
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generates Resume is ready!
                    </h2>
                    <p className='text-center text-gray-400'>
                        Now you are ready to download your resume and you can share the unique resume URL with your friends and family.
                    </p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "Hello everyone, please open this link to see my resume",
                                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
                            }}
                            onClick={() => console.log("Shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>

            <div id="print-area" className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <ResumePreviewSection />
            </div>
        </ResumeInfoContext.Provider>
    );
};

export default ViewResume;