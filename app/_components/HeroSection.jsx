"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, Code } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();
  return (
    <section className="py-20 bg-[url('/grid.svg')] bg-center bg-repeat">
      <div className="max-w-5xl mx-auto text-center px-4">
        
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 pl-1 pr-4 py-1 rounded-full text-sm font-medium mb-5">
            <span className="font-semibold bg-blue-700 text-white px-2 py-1 rounded-full">New</span> Mansu's New Project
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Your Own AI Interview Coach
        </h1>

        <p className="mt-4 text-gray-600 text-lg md:text-xl">
          Double your chances of landing that job offer with our AI-powered interview app
        </p>

        <div className="flex justify-center gap-3 mt-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          onClick={()=> router.push("dashboard")}
          >
            Get Started <ArrowBigRight/>
          </Button>

          <Button size="lg" variant="outline" className="flex gap-2">
            <Code className="w-4 h-4" /> Source Code
          </Button>
        </div>
      </div>
    </section>
  );
}
