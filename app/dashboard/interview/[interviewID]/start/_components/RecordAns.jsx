import { Button } from '@/components/ui/button'
import { Camera, Mic } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';

function RecordAns() {
    const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const [answer, setAnswer] = useState('');

  useEffect(()=>{
    results.map((result)=>(
        setAnswer((prevAns)=> prevAns + result?.transcript)
    ));
    console.log(answer);
  },[results]);

  const saveResult = ()=>{
    if(isRecording){
        stopSpeechToText();
        if(answer?.length<10){
            toast("Can't save your answer")
            return;
        }
    }
    else{
        startSpeechToText();
    }
  }
  return (
    <div className='flex flex-col rounded-xl items-center justify-center p-2 gap-2'>
        <Camera className='absolute'/>
        <div className='rounded-xl overflow-hidden flex flex-col border-blue-700 border-2 bg-blue-700 '><Webcam mirrored={true} style={{height:300, width:"100%"}} />
        <Button onClick={isRecording? stopSpeechToText : startSpeechToText} className={'w-full'}>{isRecording ? <span className={`flex flex-row gap-2 items-center ${isRecording ? "text-red-700" : "text-white"}`}><Mic/> Recording</span> : 'Record Answer'}</Button>
        </div>
        
         
    </div>
  )
}

export default RecordAns