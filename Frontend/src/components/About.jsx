import React from "react";
import { Brain, Target, Code } from "lucide-react";

const About = () => {
  return (
    <div
      id="about"
      className="bg-white flex flex-col justify-center items-center rounded-3xl shadow-2xl w-11/12 m-auto mt-8 mb-10 p-10 transition-all duration-500 hover:shadow-cyan-200"
    >
      <div className="max-w-5xl text-center">

        <h2 className="text-4xl font-bold mb-6">
          About{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            SportSense
          </span>
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          <span className="font-semibold text-gray-800">SportSense</span> is an
          AI-powered prediction system designed to understand and evaluate{" "}
          <span className="text-yellow-500 font-medium">
            parental support for a sports career
          </span>
          . By analyzing survey responses using a trained machine learning
          model, SportSense provides insightful results that bridge the gap
          between{" "}
          <span className="italic text-gray-700">
            passion for sports and parental perspective
          </span>
          .
        </p>


        <div className="grid md:grid-cols-3 gap-8 mt-10 text-left">

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-md hover:shadow-yellow-200 transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-800">Our Goal</h3>
            </div>
            <p className="text-gray-600">
              To promote awareness about sports careers by using AI insights to
              encourage open-minded decision-making among parents and students.
            </p>
          </div>


          <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-2xl p-8 shadow-md hover:shadow-cyan-200 transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-8 h-8 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-800">
                The Intelligence
              </h3>
            </div>
            <p className="text-gray-600">
              Built on a trained Random Forest model, SportSense transforms
              simple survey answers into meaningful, data-driven predictions.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <Code className="w-8 h-8 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-800">Technology</h3>
            </div>
            <p className="text-gray-600">
              Powered by Flask (backend) and React (frontend), designed to
              deliver smooth, real-time predictions with modern UI styling.
            </p>
          </div>
        </div>

        <p className="mt-12 text-gray-500 italic">
          Designed and developed with 💛 by{" "}
          <span className="font-semibold text-gray-800">Arijit Manna , Anish Das and Anupama Patra and our project mentor Suman das</span>.
        </p>
      </div>
    </div>
  );
};

export default About;
