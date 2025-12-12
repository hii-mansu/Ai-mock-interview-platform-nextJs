"use client";

import { db } from "@/utils/db";
import { mockInterviewAi } from "@/utils/schema";
import React, { use, useEffect, useState } from "react";
import MockInterviewQ from "./_components/MockInterviewQ";
import { eq } from "drizzle-orm";
import RecordAns from "./_components/RecordAns";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight, ArrowRight, StopCircle } from "lucide-react";

function StartInterview({ params }) {
  const [interviewData, setInterViewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
  const [activeQIndex, setActiveQIndex] = useState(0);
  const resolvedParams = use(params);

  useEffect(() => {
    getInterviewDetails();
  }, []);
  const mockIdHard = resolvedParams.interviewID;
  console.log(mockIdHard);
  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterviewAi)
      .where(eq(mockInterviewAi.mockId, resolvedParams.interviewID));

    console.log(result);
    console.log("Json wala", JSON.parse(result[0].jsonMockResponse));
    const jsonResp = JSON.parse(result[0].jsonMockResponse);
    setMockInterviewQuestions(jsonResp);
    setInterViewData(result[0]);
  };
  return (
    mockInterviewQuestions && (
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 items-center">
        <RecordAns
          mockInterviewQuestions={mockInterviewQuestions}
          activeQIndex={activeQIndex}
          mockId={mockIdHard}
        />
        <div className="flex flex-col gap-2 items-center">
          <MockInterviewQ
          mockInterviewQuestions={mockInterviewQuestions}
          activeQIndex={activeQIndex}
          setActiveQIndex={setActiveQIndex}
          interviewData={interviewData}
          mockId={mockIdHard}
        />
        <div className="flex flex-row gap-2 justify-start w-full">
          { activeQIndex>0 && <Button onClick={()=>setActiveQIndex(activeQIndex-1)}><ArrowBigLeft/> Previous</Button> }
          { activeQIndex==mockInterviewQuestions?.length-1 &&<Button variant="destructive"><StopCircle/> End interview</Button>}
          {activeQIndex!=mockInterviewQuestions?.length-1 &&<Button onClick={()=>setActiveQIndex(activeQIndex+1)}>Next <ArrowBigRight/></Button>}
        </div>
        </div>
      </div>
    )
  );
}

export default StartInterview;
