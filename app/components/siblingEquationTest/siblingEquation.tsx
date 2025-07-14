import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    type: "choice",
    question: "You caught her binge-watching... what?",
    options: [
      "A classic romantic drama she’s seen ten times",
      "Crime documentaries — while calmly texting relatives",
      "Reality shows she pretends to hate but secretly loves",
      "None of these quite capture her screen time choices",
    ],
  },
  {
    id: 2,
    type: "choice",
    question: "If she were a mobile setting, she’d be…",
    options: [
      "Dark mode — elegant, mysterious, efficient",
      "Bluetooth — always on, rarely available",
      "Airplane mode — peaceful, but impossible to reach",
      "Hard to define — none of these are close",
    ],
  },
  {
    id: 3,
    type: "choice",
    question: "Her love language is...",
    options: [
      "Sharp one-liners that leave you speechless",
      "Thoughtful gifts with secret messages",
      "Playful jabs in front of everyone",
      "None of the above really reflect her way of showing love",
    ],
  },
  {
    id: 4,
    type: "choice",
    question: "What’s her vibe at family gatherings?",
    options: [
      "Dressed like a Vogue cover, looking politely bored",
      "Deep in conversation with the gossip circle",
      "Quietly observing everything — and judging a little",
      "Not quite this — she’s in her own league",
    ],
  },
  {
    id: 5,
    type: "choice",
    question: "If she were a playlist, she’d be…",
    options: [
      "Soulful and calming — soft jazz meets poetry",
      "High-energy throwbacks and timeless Bollywood",
      "Curated indie — tasteful, ahead of her time",
      "None of these fit — she has her own soundtrack",
    ],
  },
  {
    id: 6,
    type: "choice",
    question: "What kind of chocolate does she truly love?",
    options: [
      "Dark — bold, rich, intense",
      "Milk — smooth, comforting, familiar",
      "A mix — depends on her mood",
      "Not sure — she surprises me every time",
    ],
  },
  {
    id: 7,
    type: "textarea",
    question:
      "What’s one unforgettable moment that defines your bond with her?",
    placeholder: "A funny memory, an inside joke, or a heartfelt moment...",
  },
  {
    id: 8,
    type: "textarea",
    question: "If you had to describe her in one line, what would it be?",
    placeholder: "Witty, poetic, or simple...",
  },
];

const loadingTexts = [
  "Stirring memories…",
  "Tempering personalities…",
  "Melting old grudges…",
  "Crafting your result...",
];

const options = [
  "Dark — rich, bold, no-nonsense",
  "Milk — smooth, familiar, comforting",
  "Mixed — depends on the day",
  "Not sure — she surprises me every time",
];

export function SiblingEquationTest() {
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [tempData, setTempData] = useState<any>(null);
  const [decodedData, setDecodedData] = useState<any>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(2);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [showFlavours, setShowFlavours] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showDeliveryAddressForm, setShowDeliveryAddressForm] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    pincode: "",
    date: "",
    phoneNo: "",
  });
  const navigate = useNavigate();

  const flavours = decodedData?.chocolates || [];
  const [resultHistory, setResultHistory] = useState<any[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  //Loader text effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      interval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  //Flip effect
  useEffect(() => {
    if (decodedData) {
      setShowFront(true);
      const timer = setTimeout(() => {
        setShowFront(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [decodedData]);

  const handleDecodeClick = async () => {
    setIsLoading(true);
    setDecodedData(null);
    const mcqs = questions
      .filter((q) => q.type === "choice" && mcqAnswers[q.id])
      .map((q) => ({
        question: q.question,
        answer: mcqAnswers[q.id],
      }));

    const inputs = questions
      .filter((q) => q.type === "textarea" && textAnswers[q.id])
      .map((q) => ({
        question: q.question,
        answer: textAnswers[q.id],
      }));

    const payload = { mcqs, inputs, chocolateType: selected };
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "https://reg-backend-staging.fabelle-hamper.vtour.tech/chocolate-box/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTimeout(() => {
          setIsLoading(false);
          setDecodedData(data.data);
          setOrderId(data.data.orderId);
          setResultHistory([data.data]);
          setCurrentResultIndex(0);
        }, 2000);
      } else {
        console.error("API Error:", data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      setIsLoading(false);
    }
  };

  const handleTryAgain = async () => {
    if (!orderId || attemptsLeft <= 0) return;

    try {
      setIsRetrying(true);
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        "https://reg-backend-staging.fabelle-hamper.vtour.tech/chocolate-box/try-again",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowFront(true);
        setTempData(data.data);
        setAttemptsLeft((prev) => prev - 1);

        setTimeout(() => {
          setDecodedData(data.data);
          setResultHistory((prev) => [...prev, data.data]); // Add to history
          setCurrentResultIndex((prev) => prev + 1); // Update current index
          setShowFront(false);
          setTempData(null);
        }, 1000);
      } else {
        console.error("Try again failed:", data.message);
      }
    } catch (error) {
      console.error("Try again error:", error);
    } finally {
      setIsRetrying(false);
    }
  };

  const handleGoBack = () => {
    if (currentResultIndex > 0) {
      setShowFront(true);
      setTimeout(() => {
        setDecodedData(resultHistory[currentResultIndex - 1]);
        setCurrentResultIndex((prev) => prev - 1);
        setShowFront(false);
      }, 1000);
    }
  };

  const handleGoForward = () => {
    if (currentResultIndex < resultHistory.length - 1) {
      setShowFront(true);
      setTimeout(() => {
        setDecodedData(resultHistory[currentResultIndex + 1]);
        setCurrentResultIndex((prev) => prev + 1);
        setShowFront(false);
      }, 1000);
    }
  };

  const handleSubmitDeliveryDetails = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      orderId: orderId,
      name: deliveryDetails.name,
      address: deliveryDetails.address,
      pincode: deliveryDetails.pincode,
      date: deliveryDetails.date,
      phoneNo: deliveryDetails.phoneNo,
    };

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "https://reg-backend-staging.fabelle-hamper.vtour.tech/chocolate-box/add-delivery-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Delivery details submitted successfully:", result);
        navigate("/");
      } else {
        console.error("Submission failed:", result);
      }
    } catch (err) {
      console.error("Error submitting delivery details:", err);
    }
  };

  return (
    <div className="h-[100vh] overflow-y-auto custom-scrollbar relative">
      {!isLoading && !decodedData && (
        <div className="w-full max-w-4xl z-10 bg-[#2d1b0e]/40 backdrop-blur-md border border-[#6e4a2f]/30 rounded-2xl p-6 md:p-12 shadow-2xl shadow-black/40 mx-auto mt-[5%]">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37]">
              The Sibling Equation Test
            </h1>
            <p className="text-[#f3e9e0]/80 mt-4 text-lg">
              Answer 8 simple questions — 6 multiple-choice and 2 open-hearted.
              There are no right answers. Just real ones.
            </p>
          </div>

          {questions.map((q, index) => (
            <div key={q.id} className="mb-10">
              <h2 className="text-2xl text-white mb-4">
                <span className="text-[#d4af37] mr-2">{index + 1}.</span>
                {q.question}
              </h2>

              {q.type === "choice" && q.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setMcqAnswers({ ...mcqAnswers, [q.id]: option })
                      }
                      className={`p-5 border-2 rounded-lg text-left transition-all duration-300 text-[#f3e9e0] ${
                        mcqAnswers[q.id] === option
                          ? "border-[#d4af37] bg-[#4a2c1a]"
                          : "border-[#6e4a2f] bg-[#4a2c1a]/50 hover:border-[#d4af37]/70 hover:bg-[#4a2c1a]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {q.type === "textarea" && (
                <textarea
                  placeholder={q.placeholder}
                  rows={4}
                  value={textAnswers[q.id] || ""}
                  onChange={(e) =>
                    setTextAnswers({ ...textAnswers, [q.id]: e.target.value })
                  }
                  className="w-full mt-2 bg-[#4a2c1a]/50 border border-[#6e4a2f] rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none"
                />
              )}
            </div>
          ))}

          <div>
            <p className="mt-4 max-w-2xl  text-[#f3e9e0]/80 text-2xl">
              <span className="text-[#d4af37] mr-2">9.</span> What kind of
              chocolate does she truly enjoy?
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(opt)}
                  className={`p-5 bg-[#4a2c1a]/50 border-2 rounded-lg text-left transition-all duration-300 text-[#f3e9e0] text-base flex justify-between items-center ${
                    selected === opt
                      ? "border-[#d4af37] ring-2 ring-[#d4af37]/50 font-semibold"
                      : "border-[#6e4a2f] hover:border-[#d4af37]/70 hover:bg-[#4a2c1a]"
                  }`}
                >
                  <span>{opt}</span>
                  {selected === opt && (
                    <svg
                      className="ml-3 w-5 h-5 text-[#d4af37]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={handleDecodeClick}
              disabled={
                Object.keys(mcqAnswers).length < 6 ||
                Object.keys(textAnswers).length < 2
              }
              className="bg-gradient-to-r from-[#b98a53] to-[#d4af37] text-[#2d1b0e] font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20 disabled:opacity-50"
            >
              Decode our bond
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="w-full max-w-4xl z-10 bg-[#2d1b0e]/40 backdrop-blur-md border border-[#6e4a2f]/30 rounded-2xl p-6 md:p-12 shadow-2xl shadow-black/40  absolute h-[20vh] flex items-center justify-center top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-[#d4af37] text-3xl text-center h-[20vh] flex items-center justify-center">
            {loadingTexts[currentTextIndex]}
          </div>
        </div>
      )}
      {!showFlavours && decodedData && (
        <div className="w-full max-w-4xl z-10 bg-[#2d1b0e]/40 backdrop-blur-md border border-[#6e4a2f]/30 rounded-2xl p-6 md:p-12 shadow-2xl shadow-black/40 mx-auto mt-[2%]">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37]">
              Your Bond, Decoded in Chocolate
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-[#f3e9e0]/80 text-lg">
              Based on your answers, we’ve discovered your unique sibling
              equation. And our Master Chocolatiers have just the right flavours
              to match.
            </p>

            <div className="relative w-full max-w-md mx-auto h-64 perspective-1000">
              <div className="flex justify-center gap-4 mt-3 mb-4">
                <button
                  onClick={handleGoBack}
                  disabled={currentResultIndex === 0}
                  className={`border-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentResultIndex === 0
                      ? "opacity-50 cursor-not-allowed border-[#6e4a2f] text-[#f3e9e0]/50"
                      : "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#2d1b0e]"
                  }`}
                >
                  ← Previous
                </button>

                <button
                  onClick={handleGoForward}
                  disabled={currentResultIndex === resultHistory.length - 1}
                  className={`border-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentResultIndex === resultHistory.length - 1
                      ? "opacity-50 cursor-not-allowed border-[#6e4a2f] text-[#f3e9e0]/50"
                      : "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#2d1b0e]"
                  }`}
                >
                  Next →
                </button>
              </div>

              <div
                className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d my-5 ${
                  showFront ? "rotate-y-0" : "rotate-y-180"
                }`}
              >
                {/* Front */}
                {showFront && (
                  <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-gradient-to-br from-[#4a2c1a] to-[#3a1f11] border-2 border-[#d4af37]/50 rounded-2xl p-6">
                    <h2 className="text-3xl font-serif text-white">
                      Revealing Your Archetype...
                    </h2>
                  </div>
                )}

                {/* Back */}
                {decodedData && !showFront && (
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-gradient-to-br from-[#4a2c1a] to-[#3a1f11] border-2 border-[#d4af37]/50 rounded-2xl p-6 flex-col">
                    <h2 className="text-5xl font-serif text-[#d4af37]">
                      {decodedData.title}
                    </h2>
                    <p className="text-lg text-white mt-3">
                      {decodedData.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center mt-20">
              <button
                onClick={handleTryAgain}
                disabled={attemptsLeft === 0 || isRetrying}
                className={`mb-4 flex items-center justify-center border-2 border-[#d4af37] text-[#d4af37] font-bold py-2 px-6 rounded-lg transition-all duration-300 ${
                  attemptsLeft === 0 || isRetrying
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#d4af37] hover:text-[#2d1b0e]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M3 2v6h6" />
                  <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
                  <path d="M21 22v-6h-6" />
                  <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
                </svg>
                Try Again ({attemptsLeft} left)
              </button>

              <p className="text-xs text-[#f3e9e0]/50 mb-8 max-w-sm">
                Want to try again? You have {attemptsLeft} more chance
                {attemptsLeft !== 1 ? "s" : ""} to refine the result, just like
                you did after your last argument.
              </p>

              <button
                onClick={() => setShowFlavours(true)}
                className="bg-gradient-to-r from-[#b98a53] to-[#d4af37] text-[#2d1b0e] font-bold py-4 px-12 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20 text-lg"
              >
                Reveal Her Curated Box
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accordion */}
     {!isLoading &&
  resultHistory[currentResultIndex] &&
  showFlavours &&
  !showDeliveryForm &&
  !showDeliveryAddressForm && (
    <div className="text-center animate-fade-in w-full max-w-4xl mx-auto mt-[5%] bg-[#2d1b0e]/40 backdrop-blur-md border border-[#6e4a2f]/30 rounded-2xl p-6 md:p-12 shadow-2xl shadow-black/40">
      <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37]">
        One Box. Five Flavours. Every Shade of Your Siblinghood.
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-[#f3e9e0]/80 text-lg">
        Here’s your curated selection — handcrafted truffles that capture
        every nuance of your bond: the silent support, the gentle roasts,
        and the unexpected care.
      </p>

      <div className="mt-12 max-w-2xl mx-auto text-left">
        {(resultHistory[currentResultIndex]?.chocolates || []).map(
          (f: any, i: number) => (
            <div
              key={i}
              className="mb-4 border-b border-[#6e4a2f]/50 overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                className="w-full flex justify-between items-center px-4 py-5 text-white font-semibold text-lg"
              >
                {f.uniqueName}
                <span
                  className={`text-xl transition-transform duration-300 ease-in-out ${
                    openIndex === i ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === i
                    ? "max-h-60 opacity-100 p-4"
                    : "max-h-0 opacity-0 p-0"
                } text-white`}
              >
                <p className="mb-3">{f.description}</p>
                <p className="text-sm text-[#f3e9e0]/60">
                  <strong>Ingredients:</strong> {f.ingredients}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <button
        onClick={() => setShowDeliveryForm(true)}
        className="mt-12 bg-gradient-to-r from-[#b98a53] to-[#d4af37] text-[#2d1b0e] font-bold py-4 px-12 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20 text-lg"
      >
        Finalise Her Preference
      </button>
    </div>
  )}


      {!isLoading &&
        decodedData &&
        showDeliveryForm &&
        !showDeliveryAddressForm && (
          <div className="text-center animate-fade-in w-full max-w-4xl mx-auto mt-[5%] bg-[#2d1b0e]/40 backdrop-blur-md border border-[#6e4a2f]/30 rounded-2xl p-6 md:p-12 shadow-2xl shadow-black/40">
            <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37]">
              Before We Pack It All In...
            </h1>
          

            <button
              onClick={() => setShowDeliveryAddressForm(true)}
              className="mt-12 bg-gradient-to-r from-[#b98a53] to-[#d4af37] text-[#2d1b0e] font-bold py-4 px-12 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20 text-lg"
            >
              Proceed to Delivery
            </button>
          </div>
        )}
      {!isLoading && decodedData && showDeliveryAddressForm && (
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37]">
              Your Words. Her Box. Delivered.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-[#f3e9e0]/80 text-lg">
              Add a delivery address, and we’ll wrap the story — in fine
              chocolate, with finishing ribbons.
            </p>
          </div>
          <form
            className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 "
            onSubmit={handleSubmitDeliveryDetails}
          >
            <input
              type="text"
              placeholder="Name"
              className="md:col-span-2 bg-[#4a2c1a]/50 border border-[#6e4a2f] rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              value={deliveryDetails.name}
              onChange={(e) =>
                setDeliveryDetails({ ...deliveryDetails, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone no."
              className="md:col-span-2 bg-[#4a2c1a]/50 border border-[#6e4a2f] rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              value={deliveryDetails.phoneNo}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  phoneNo: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Address"
              rows={3}
              className="md:col-span-2 bg-[#4a2c1a]/50 border border-[#6e4a2f] rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              value={deliveryDetails.address}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  address: e.target.value,
                })
              }
            ></textarea>
            <input
              type="text"
              placeholder="Pincode"
              className="bg-[#4a2c1a]/50 border border-[#6e4a2f] rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              value={deliveryDetails.pincode}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  pincode: e.target.value,
                })
              }
            />
            <input
              type="date"
              placeholder="Preferred Delivery Date"
              className="bg-[#4a2c1a]/50 border border-[#6e4a2f] rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              value={deliveryDetails.date}
              onChange={(e) =>
                setDeliveryDetails({ ...deliveryDetails, date: e.target.value })
              }
            />
            <div className="text-center md:col-span-2">
              <button
                type="submit"
                className="mt-6 bg-gradient-to-r from-[#b98a53] to-[#d4af37] text-[#2d1b0e] font-bold py-4 px-12 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20 text-lg"
              >
                Proceed to Payment
              </button>
              <p className="mt-4 text-xs text-[#f3e9e0]/50">
                Delivery may take 2–5 days depending on your location. No
                express shipping via sibling guilt.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
