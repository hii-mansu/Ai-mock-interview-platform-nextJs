import { PenLine, Edit3, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  const steps = [
    {
      title: "Enter your details",
      desc: "Provide your job role, experience, and preferences to generate a tailored interview.",
      icon: <PenLine className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Attend your AI interview",
      desc: "Answer real-time AI-generated questions just like a real interview.",
      icon: <Edit3 className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "View your results & feedback",
      desc: "Instantly see your performance, ratings, and improvement suggestions.",
      icon: <Share2 className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <section className="py-20 bg-[url('/grid.svg')] bg-repeat">
      <div className="max-w-6xl mx-auto text-center px-4">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How it Works?
        </h2>

        <p className="text-gray-500 mt-2 mb-10">
          Give mock interview in just 3 simple easy steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-6 text-left border-[1px] border-gray-400 hover:shadow-lg transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-gray-500 mt-2 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <Button className="bg-pink-600 hover:bg-pink-700 mt-10">
          Get Started Today
        </Button>
      </div>
    </section>
  );
}
