"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

function page({ params }) {
  const [feedBackList, setFeedBackList] = useState([]);
  const resolvedParams = use(params);
  const router = useRouter()

  useEffect(() => {
    GetFeedback();
  }, []);
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, resolvedParams.interviewID))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedBackList(result);
    if(result.length < 1){
      router.replace('/dashboard')
    }
  };
  return (
    feedBackList.length >=1 && (
      <div className="flex flex-col gap-3 items-center justify-center p-5">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-green-500 font-bold text-2xl">Congratulation.</h1>
          <h2 className="text-black font-bold text-xl">
            Feedback of your interview
          </h2>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-lg text-blue-600 font-bold">
            Your overall rating 7/10
          </h3>
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, unde!
          </p>
        </div>
        <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
          {feedBackList &&
            feedBackList.map((items, index) => (
              <Collapsible key={index} className="mt-5">
                <CollapsibleTrigger className={`p-2 flex justify-between ${items.rating <3 ? "bg-red-400" : items.rating >= 7 ? "bg-green-400" : "bg-yellow-200"}  rounded-lg my-2 text-left gap-7 w-full`}>
                  <h2 className="flex flex-row gap-2 items-center">{items.question} <ArrowDown className="h-4 font-extrabold"/></h2>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {items.rating} / 10
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {items.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer Looks Like: </strong>
                      {items.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {items.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </div>
        <Button className='mt-5' onClick={()=>router.replace('/dashboard')}> Go Home</Button>
      </div>
    )
  );
}

export default page;
