"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/geminiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { mockInterviewAi } from "@/utils/schema";
import { useRouter } from "next/navigation";

function AddNew() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExp, setJobExp] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputPrompt = "Job position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExp+", Depends on Job Position, Job Description and Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+", Interview question along with Answer in JSON format, Give us question and Answer field on JSON"
    /*`Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExp}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
  {
    "question": "Your question here",
    "answer": "Your answer here"
  }`;*/

    const result = await chatSession.sendMessage(inputPrompt);
    const mockResponse = (result.response.text()).replace('```json','').replace('```','');
    console.log(JSON.parse(mockResponse),"Test");
    setJsonResponse(mockResponse);

    if (mockResponse) {
      const resp = await db.insert(mockInterviewAi).values({
          mockId: uuidv4(),
          jsonMockResponse: JSON.stringify(mockResponse),
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExp,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        }).returning({ mockId: mockInterviewAi.mockId });
        console.log("Inserted : ", resp)
        setLoading(false);
        router.push(`dashboard/interview/${resp[0]?.mockId}`);
        
    }else{
        console.log("Error hai.")
        setLoading(false);
    }

    setLoading(false);
  };
  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 bg-gray-200 hover:bg-gray-100 rounded-xl border-x border-gray-600 hover:shadow-md cursor-pointer "
      >
        <h2 className="text-center font-bold text-xl text-gray-700">Add new</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tell us about your job you are preparing</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
              nesciunt sunt possimus, beatae at porro.
              <form className="p-4 max-w-md mx-auto" onSubmit={submitHandler}>
                <div className="mb-3">
                  <label
                    htmlFor="jobPosition"
                    className="block font-medium mb-1"
                  >
                    Job Role/Position
                  </label>
                  <input
                    type="text"
                    id="jobPosition"
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="jobDesc" className="block font-medium mb-1">
                    Job Description/ stack and etc.
                  </label>
                  <textarea
                    id="jobDesc"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    rows={4}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="jobExp" className="block font-medium mb-1">
                    Year of Experience
                  </label>
                  <input
                    type="number"
                    id="jobExp"
                    placeholder="Exp. 21"
                    max={40}
                    value={jobExp}
                    onChange={(e) => setJobExp(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Start interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNew;
