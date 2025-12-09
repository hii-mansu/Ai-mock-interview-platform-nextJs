"use client"

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { mockInterviewAi } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Camera,CameraIcon,Lightbulb, Settings } from 'lucide-react';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview ({params}) {
    const resolvedParams = use(params);
    const [interviewData, setInterviewData] = useState();
    const [webCanEnabled, setWebCanEnabled] = useState(false);
    useEffect(()=>{
        getInterviewDetails();
    },[]);

    const getInterviewDetails = async()=>{
        const result = await db.select().from(mockInterviewAi)
        .where(eq(mockInterviewAi.mockId, resolvedParams.interviewID))

        console.log(result);
        setInterviewData(result[0]);
        //flex flex-col justify-center items-center gap-4
    }
  return interviewData &&(
    <div className='p-10 flex flex-col gap-2'>
        <h1 className='font-semibold text-2xl'>Start now.</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center p-5'>
            <div className='flex flex-col gap-4 justify-center'>
                <div className='flex flex-col gap-4 p-4 justify-center rounded-xl border-2 border-gray-400'>
                <h1><b>Job Title :</b> {interviewData?.jobPosition}</h1>
                <p><b>Job Description :</b> {interviewData?.jobDesc}</p>
                <h2><b>Job Position :</b> {interviewData?.jobPosition}</h2>
                <h2><b>Experince :</b> {interviewData?.jobExperience}</h2>
            </div>
            <div className='flex flex-col gap-4 p-4 justify-center rounded-xl border-2 border-y-yellow-200 bg-yellow-200'>
                <h2 className='text-md font-semibold text-yellow-600'><Lightbulb/> Note</h2>
                <p className='text-sm text-yellow-600'>{process.env.NEXT_PUBLIC_NOTIC_WEBCAM}</p>
            </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
            {
                webCanEnabled ? <Webcam
                onUserMedia={()=>setWebCanEnabled(true)}
                onUserMediaError={()=>setWebCanEnabled(false)}
                mirrored={true}
                style={{
                    height:300,
                    width:300,
                }}
                /> : <>
                <Camera className='h-72 w-full bg-blue-300 rounded-xl'/>
                <Button onClick={()=>setWebCanEnabled(true)}><Settings/> Enable web cam and mic</Button>
                </>
            }
        </div>
        </div>
        <Link href={`/dashboard/interview/${resolvedParams.interviewID}/start`}>
        <Button disabled={!webCanEnabled}><CameraIcon/>Start interview</Button>
        </Link>
    </div>
  )
}

export default Interview