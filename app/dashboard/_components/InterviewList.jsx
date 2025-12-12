import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { mockInterviewAi } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BlinkBlur } from "react-loading-indicators";

function InterviewList() {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const startNow = (mockId) => {
    router.push("/dashboard/interview/" + mockId);
  };

  const ViewFeedback = (mockId) => {
    router.push("dashboard/interview/" + mockId + "/feedback");
  };
  const GetInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(mockInterviewAi)
      .where(
        eq(mockInterviewAi.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(mockInterviewAi.id));

    console.log(result);
    setInterviewList(result);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div className="flex ic justify-center w-full"><BlinkBlur color="#2563EB" size="small" text="" textColor="" /></div>
      ) : InterviewList.length === 0 ? (
        <p>No Previous Mock Interviews Found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {InterviewList &&
            InterviewList.map((interview) => (
              <div className="border shadow-sm rounded-sm p-3">
                <h2 className="font-semibold text-primary">
                  <b>For</b> : {interview?.jobPosition}
                </h2>
                <h2 className="text-sm text-gray-500">
                  Exp. : {interview?.jobExperience} Years
                </h2>
                <h2 className="text-xs text-gray-400">
                  Created At: {interview?.createdAt}
                </h2>
                <div className="flex flex-col justify-between gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => ViewFeedback(interview?.mockId)}
                  >
                    Feedback
                  </Button>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => startNow(interview.mockId)}
                  >
                    Start
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;
