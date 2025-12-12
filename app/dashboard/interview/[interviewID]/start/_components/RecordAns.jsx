"use client";

import { Button } from "@/components/ui/button";
import { Camera, Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast, Toaster } from "sonner";
import { chatSession } from "@/utils/geminiModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAns({
  mockInterviewQuestions,
  activeQIndex,
  interviewData,
  mockId,
}) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [answer, setAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    results.map((result) =>
      setAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && answer.length > 10) {
      compareResponseAndAns();
    }
    if (answer?.length < 10) {
      toast("Can't save your answer");
      return;
    }
  }, [answer]);

  const compareResponseAndAns = async () => {
    setLoading(true);
    const feedBackReport =
      "Question:" +
      mockInterviewQuestions[activeQIndex].question +
      ", user Answer:" +
      answer +
      ", read question and user answer and compare the user answer with correct answer and give rating based on user answer by comparing user answer and also give feedback as area of improvment, evaluate answer and give rating strictly like you are an HR manager and taking interview, cover you response in 3 to 4 lines only. give response in JSON formate with rating and feedback feild.";

    const result = await chatSession.sendMessage(feedBackReport);
    const mockResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const JsonConvertedData = JSON.parse(mockResponse);
    console.log(mockResponse);

    const response = await db.insert(UserAnswer).values({
      mockIdRef: mockId,
      question: mockInterviewQuestions[activeQIndex]?.question,
      userAns: answer,
      correctAns: mockInterviewQuestions[activeQIndex]?.answer,
      feedback: JsonConvertedData?.feedback,
      rating: JsonConvertedData?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });
    if (response) {
      toast("Your answer is recorded.");
      setResults([]);
      setAnswer("");
      setLoading(false);
    }

    setLoading(false);
  };

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      /*if(answer?.length>10){
            toast("Can't save your answer")
            return;
        }*/
    } else {
      startSpeechToText();
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col rounded-xl items-center justify-center p-2 gap-2">
      <Camera className="absolute" />
      <div className="rounded-xl overflow-hidden flex flex-col border-blue-700 border-2 bg-blue-700 ">
        <Webcam mirrored={true} style={{ height: 300, width: "100%" }} />
        <Button
          onClick={
            /*isRecording? stopSpeechToText : startSpeechToText*/ startStopRecording
          }
          className={"w-full"}
        >
          {loading ? (
            "Loading...."
          ) : isRecording ? (
            <span
              className={`flex flex-row gap-2 items-center ${
                isRecording ? "text-red-700" : "text-white"
              }`}
            >
              <Mic /> Recording
            </span>
          ) : (
            "Record Answer"
          )}
        </Button>
      </div>
    </div>
  );
}

export default RecordAns;
