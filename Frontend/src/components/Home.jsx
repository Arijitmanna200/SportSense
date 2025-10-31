import React, { useState } from "react";
import robot from "../assets/robo.png";

const Home = () => {
  const [questions, setQuestions] = useState({});
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [userInfoStep, setUserInfoStep] = useState(false);
  const [userInfo, setUserInfo] = useState({
    Age_group: null,
    Education: null,
    Gender: null,
  });
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [responseData, setResponseData] = useState({});

  const options = [
    { label: "Strongly Disagree", value: 1 },
    { label: "Disagree", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Agree", value: 4 },
    { label: "Strongly Agree", value: 5 },
  ];
  const ageOptions = [
    { label: "Below 30", value: 1 },
    { label: "31-40", value: 2 },
    { label: "41-50", value: 3 },
    { label: "Above 50", value: 4 },

  ];
  const educationOptions = [
    { label: "School", value: 1 },
    { label: "Undergraduate", value: 2 },
    { label: "Postgraduate", value: 3 },
    { label: "Other", value: 4 },
  ]
  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ]

  const questionKeys = Object.keys(questions);
  const currentQuestionKey = questionKeys[currentIndex];
  const currentQuestion = questions[currentQuestionKey];

  // 🟡 Step 1: Start survey
  const startSurvey = () => {
    setUserInfoStep(true); // move to user info step first
  };

  // 🟢 Step 2: After user info, fetch questions
  const fetchQuestions = () => {
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
  };

  // 🟣 Step 3: Handle User Info Selection
  const handleUserInfoSelect = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartSurveyAfterInfo = () => {
    const { Age_group, Education, Gender } = userInfo;
    if (!Age_group || !Education || !Gender) {
      alert("Please answer all fields before continuing.");
      return;
    }
    fetchQuestions();
  };

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
      setSelectedValue(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedValue(
        answers[questions[questionKeys[currentIndex - 1]]] || null
      );
    }
  };

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
      setUserInfoStep(false);
      setUserInfo({
        Age_group: null,
        Education: null,
        Gender: null,
      });
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
        ...userInfo,
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

  // Error UI
  if (error) {
    return (
      <div className="flex justify-center items-center bg-transparent p-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 space-y-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">🚨 Error</h2>
          <p className="text-lg md:text-xl mb-4">
            Oops! Something went wrong while fetching the survey questions. Please try again later.
          </p>
          <button
            onClick={() => setError(null)}
            className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Home / Landing Page
  if (!userInfoStep && !surveyStarted && !isFinished) {
    return (
      <div className="flex flex-col justify-center items-center p-4 bg-white rounded-3xl shadow-2xl w-11/12 m-auto mt-5">
        <div className="mt-10 flex lg:flex-row justify-around items-center p-2 flex-col">
          <div>
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
          <div className="m-5 flex justify-center items-center w-1/2 floating bg-transparent">
            <img src={robot} alt="Sports Robot" height="400px" width="300px" className="scale-120 object-cover transition-all duration-300" />
          </div>
        </div>
        <button
          onClick={startSurvey}
          className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
        >
          🚀 Start the Survey
        </button>
      </div>
    );
  }

  // User Info Step (NEW)
  if (userInfoStep && !surveyStarted) {
    return (
      <div className="flex justify-center items-center p-4 mb-40 bg-none">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-8">
          <h2 className="text-4xl font-bold mb-6 text-center">🧠 Before we begin...</h2>
          <p className="text-lg text-gray-700 mb-4 m-auto text-center">
            Tell me a bit about yourself 👇
          </p>

          {/* Age Group */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-center">Select your Age Group</h3>
            <div className="flex flex-col gap-2">
              {ageOptions.map((age, index) => (
                <button
                  key={index}
                  onClick={() => handleUserInfoSelect("Age_group", index + 1)}
                  className={`py-2 rounded-xl border transition-all ${userInfo.Age_group === index + 1
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "bg-cyan-50 hover:bg-cyan-100"
                    }`}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-center">Select your Education Level</h3>
            <div className="flex flex-col gap-2">
              {educationOptions.map(
                (edu, index) => (
                  <button
                    key={index}
                    onClick={() => handleUserInfoSelect("Education", index + 1)}
                    className={`py-2 rounded-xl border transition-all ${userInfo.Education === index + 1
                      ? "bg-cyan-500 text-white shadow-lg"
                      : "bg-cyan-50 hover:bg-cyan-100"
                      }`}
                  >
                    {edu.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-center">Select your Gender</h3>
            <div className="flex flex-col gap-2">
              {genderOptions.map((gen, index) => (
                <button
                  key={index}
                  onClick={() => handleUserInfoSelect("Gender", index + 1)}
                  className={`py-2 rounded-xl border transition-all ${userInfo.Gender === index + 1
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "bg-cyan-50 hover:bg-cyan-100"
                    }`}
                >
                  {gen.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <button
              onClick={restartSurvey}
              className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
            >
              Restart Survey
            </button>
            <button
              onClick={handleStartSurveyAfterInfo}
              className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
            >
              Continue to Survey 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal Survey Step (unchanged)
  if (surveyStarted && !isFinished) {
    return (
      <div className="flex justify-center items-center bg-transparent p-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            {currentIndex + 1}. {currentQuestion}
          </h1>
          <div className="space-y-4">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`cursor-pointer flex items-center justify-center border border-gray-300 rounded-xl py-3 px-4 text-lg md:text-xl font-medium transition-all duration-300 ${selectedValue === option.value
                  ? "bg-gradient-to-r from-cyan-500 to-blue-400 text-white scale-105 shadow-lg"
                  : "bg-cyan-50 hover:bg-cyan-100 text-gray-700"
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
              className={`w-full md:w-5/12 py-3 rounded-2xl font-semibold transition-transform ${currentIndex === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105"
                }`}
            >
              Previous
            </button>

            <button
              onClick={restartSurvey}
              className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
            >
              Restart Survey
            </button>

            <button
              onClick={
                currentIndex === questionKeys.length - 1
                  ? handleSubmit
                  : handleNext
              }
              disabled={selectedValue === null}
              className={`w-full md:w-5/12 py-3 rounded-2xl font-semibold transition-transform ${selectedValue === null
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105"
                }`}
            >
              {currentIndex === questionKeys.length - 1
                ? "Check Result"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Result Page (unchanged)
  if (isFinished) {
    return (
      <div className="flex justify-center items-center bg-transparent p-4">
        <div className="mt-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">🎯 Your AI Prediction</h2>
          <p className="text-2xl mb-4 font-semibold">
            {responseData.prediction?.toLowerCase().includes("unlikely")
              ? "⚠️ Your parents might have concerns about a sports career."
              : "👍 Your parents would SUPPORT a sports career!"}
          </p>
          <p className="text-lg md:text-xl mb-4">
            Confidence: <span className="font-bold">{responseData.confidence}%</span>
          </p>
          <p className="text-lg md:text-xl italic mb-6 text-gray-700">
            {responseData.prediction?.toLowerCase().includes("unlikely")
              ? "Don’t worry! Communication and planning can change everything — keep believing!"
              : "Congratulations! 🎉 It seems your parents are likely to encourage your sports journey."}
          </p>
          <button
            onClick={restartSurvey}
            className="w-full md:w-5/12 py-3 rounded-2xl font-semibold transform shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:via-cyan-500 hover:to-blue-700 transition duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
          >
            Restart Survey
          </button>
        </div>
      </div>
    );
  }
};

export default Home;
