import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect } from "react";

function MockInterviewQ({ mockInterviewQuestions, activeQIndex }) {
  console.log(mockInterviewQuestions);

  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support this feature");
    }
  };
  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg bg-gray-100 border-x-blue-700 ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInterviewQuestions.map((question, index) => (
            <h2
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQIndex == index && "bg-blue-300 text-blue-700 border-2"}`}
            >
              Question {index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-sm md:text-md">
          <b className="flex flex-row gap-2 items-center">Qus. : <Volume2 onClick={()=> textToSpeach(mockInterviewQuestions[activeQIndex].question)}/>  </b>
          {mockInterviewQuestions[activeQIndex].question}
        </h2>
        <div className="border rounded-lg p-5 bg-blue-200">
          <h2 className="flex gap-5 items-center text-blue-700">
            <Lightbulb />
            <strong>Note: </strong>
          </h2>
          <h2 className="text-sm text-blue-600 my-2">
            {process.env.NEXT_PUBLIC_NOTIC_WEBCAM}
          </h2>
        </div>
      </div>
    )
  );
}

export default MockInterviewQ;
