import React, { useEffect, useState } from "react";
import robot from "../assets/robo.png";
const Home = () => {

  const [questions, setQuestions] = useState({});

  const options = [
    { label: "Strongly Disagree", value: 1 },
    { label: "Disagree", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Agree", value: 4 },
    { label: "Strongly Agree", value: 5 },
  ];

  const questionKeys = Object.keys(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);

  const currentQuestionKey = questionKeys[currentIndex];
  const currentQuestion = questions[currentQuestionKey];

  const handleOptionClick = (value) => {
    setSelectedValue(value);
  };

  const handleNext = () => {
    if (selectedValue === null) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: selectedValue,
    }));

    if (currentIndex < questionKeys.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedValue(answers[questions[questionKeys[currentIndex + 1]]] || null);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsFinished(true);
      const cleanedAnswers = Object.fromEntries(
        Object.entries(answers).map(([key, value]) => [key.trim(), value])
      );
      const trimmedCurrentQuestion = currentQuestion.trim();
      const finalData = {
        ...cleanedAnswers,
        [trimmedCurrentQuestion]: selectedValue,
        Age_group: 2,
        Education: 10,
        Gender: 1,
      };
      console.log("🟩 Final Response JSON:", finalData);
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();
      setResponseData(data);
      console.log("Response from backend:", data);

    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  const startSurvey = () => {
    fetch("http://127.0.0.1:5000/getQuestion")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setSurveyStarted(true);
      })
      .catch((error) => {
        console.error("Error fetching survey questions:", error);
        setError(error);


      });
  }

  const restartSurvey = () => {
    const confirmRestart = window.confirm(
      "Are you sure you want to restart the survey? All your answers will be lost."
    );
    if (confirmRestart) {
      setCurrentIndex(0);
      setAnswers({});
      setSelectedValue(null);
      setIsFinished(false);
      setSurveyStarted(false);
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedValue(answers[questions[questionKeys[currentIndex - 1]]] || null);
    }
  };

  if (error) {
    return (
      <>
        <div className="flex justify-center items-center bg-transparent p-4">
          <div className="mt-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-8 transition-all duration-500 hover:shadow-cyan-200 flex justify-center items-center flex-col text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">🚨Error</h2>
            <p className="text-lg md:text-xl mb-4">
              Oops! Something went wrong while fetching the survey questions. Please try again later.
            </p>
            <button onClick={(e)=>{
              setError(null);
            }} className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500  text-white">
            Return to Home
          </button>
          </div>
          
        </div>
      </>
    );
  }

  if (!surveyStarted) {
    return (
      <>
        <div className="flex flex-col justify-center items-center p-4  bg-white rounded-3xl shadow-2xl w-11/12 m-auto mt-5 pace-y-8 transition-all duration-500 hover:shadow-cyan-200">
          <div className="mt-10 flex lg:flex-row lg:justify-around lg:p-0 md:flex-row md:justify-around md:p-0 justify-center items-center p-2 flex-col">

            <div className="">
              <h1 className="text-3xl md:text-6xl font-extrabold mb-4">
                👋 Hi, I’m <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500">SportSense</span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mb-6 leading-relaxed">
                Wondering if your <span className="font-semibold">parents would support</span> your dream to pursue a career in sports? 🏆
                Let’s find out — together!
              </p>
              <p className="text-lg md:text-xl max-w-2xl mb-6 italic">
                Just take a short, fun survey — and I’ll predict the level of support you might receive 💪
              </p>
            </div>
            <div className=" m-5 flex justify-center items-center w-1/2 floating bg-transparent">
              <img src={robot} alt="Sports Robot" height='400px' width='300px' className="scale-120  object-cover transition-all duration-300" />
            </div>

          </div>

          <button onClick={startSurvey} className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500  text-white">
            🚀 Start the Survey
          </button>
        </div >

      </>
    )
  }

  if (isFinished) {
    return (
      <>

        <div className="flex justify-center items-center bg-transparent p-4">
          <div className="mt-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-8 transition-all duration-500 hover:shadow-cyan-200 flex justify-center items-center flex-col text-center">

            <h2 className="text-5xl md:text-6xl font-bold mb-4">🎯 Your AI Prediction</h2>

            <p className="text-2xl mb-4 font-semibold">
              {responseData.prediction?.toLowerCase().includes("Would SUPPORT") ? "👍 Your parents would SUPPORT a sports career!" : "⚠️ Your parents might have concerns about a sports career."}
            </p>

            <p className="text-lg md:text-xl mb-4">
              Confidence: <span className="font-bold">{responseData.confidence}%</span>
            </p>

            <p className="text-lg md:text-xl italic mb-6 text-gray-700">
              {responseData.prediction?.toLowerCase().includes("Would SUPPORT")
                ? "Congratulations! 🎉 It seems your parents are likely to encourage your sports journey. Keep up your passion and follow your dreams!"
                : "Don’t worry! While there might be some concerns, communication is key. You can discuss your sports ambitions and plan together to make it work."}
            </p>
            <button
              onClick={restartSurvey}
              className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500  text-white ">
              Restart Survey
            </button>

          </div>
        </div>

      </>
    );
  }

  if (surveyStarted === true) {
    return (
      <div className=" flex justify-center items-center bg-transparent p-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-8 transition-all duration-500 hover:shadow-cyan-200">

          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            {currentIndex + 1}. {currentQuestion}
          </h1>

          <div className="space-y-4">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`cursor-pointer flex items-center justify-center border border-gray-300 rounded-xl py-3 px-4 text-lg md:text-xl font-medium transition-all duration-300
              ${selectedValue === option.value
                    ? "bg-gradient-to-r from-cyan-500 to-blue-400 text-white scale-105 shadow-lg"
                    : "bg-cyan-50 hover:bg-cyan-100 hover:scale-102 text-gray-700"
                  }`}
              >
                {option.label}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`w-full md:w-5/12 py-3 rounded-2xl font-semibold transition-transform transform shadow-md
            ${currentIndex === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 active:scale-95 hover:shadow-lg"
                }`}
            >
              Previous
            </button>
            <button
              onClick={restartSurvey}
              className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500  text-white ">
              Restart Survey
            </button>


            <button
              onClick={currentIndex === questionKeys.length - 1 ? handleSubmit : handleNext}
              disabled={selectedValue === null}
              className={`w-full md:w-5/12 py-3 rounded-2xl font-semibold transition-transform transform shadow-md
            ${selectedValue === null
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 active:scale-95 hover:shadow-lg"
                }`}
            >
              {currentIndex === questionKeys.length - 1 ? "Check Result" : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
