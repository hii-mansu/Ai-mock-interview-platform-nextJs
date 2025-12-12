"use client";

import React from "react";
import AddNew from "./_components/AddNew";
import InterviewList from "./_components/InterviewList";

function page() {
  return (
    <div className="p-10 w-full">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <p>Start your mock interview now.</p>
      <div className="flex flex-col gap-4 my-5 w-full">
        <AddNew />
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold text-2xl">Previous Mock Interview</h2>
          <InterviewList />
        </div>
      </div>
    </div>
  );
}

export default page;
