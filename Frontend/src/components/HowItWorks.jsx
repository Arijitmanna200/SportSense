import React from "react";
import { Lightbulb, ClipboardList, BarChart3, Brain } from "lucide-react";


const HowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardList className="w-10 h-10 text-yellow-400" />,
      title: "Step 1: Take the Survey",
      boxClass : "bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-md hover:shadow-yellow-200 transition-all duration-300 transform hover:-translate-y-2",
      description:
        "Answer a few short questions about your thoughts on sports and career choices.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-green-400" />,
      title: "Step 2: AI Analyzes Responses",
      boxClass : "bg-gradient-to-r from-green-50 to-cyan-50 rounded-2xl p-8 shadow-md hover:shadow-cyan-200 transition-all duration-300 transform hover:-translate-y-2",
      description:
        "Our trained model processes your answers using data-driven insights.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-blue-400" />,
      title: "Step 3: Get Your Prediction",
      boxClass : "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-2",
      description:
        "SportSense reveals how much parental support aligns with a sports career!",
    },
  ];

  return (
    <div
      id="how-it-works"
      className="text-black relative py-16 px-6 md:px-12 bg-white w-11/12flex flex-col justify-center items-center p-4 rounded-3xl shadow-2xl w-11/12 m-auto mt-5 pace-y-8 transition-all duration-500 hover:shadow-cyan-200"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">
          How <span className="text-yellow-400">SportSense</span> Works ⚙️
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className= {step.boxClass}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-lg text-gray-400">
          Your journey from curiosity to insight — powered by{" "}
          <span className="text-yellow-400 font-semibold">AI intelligence</span>.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
