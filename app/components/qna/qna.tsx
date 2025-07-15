import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Heart, Gift, Star, ShoppingCart, User, MapPin, CreditCard, Calendar, Minus, Plus } from 'lucide-react';
import ShinyOptionButton from '../reusable/ShinyOptionButton';
import bg from '../../assets/bg.png'
import IntroAnimation from '../reusable/IntroAnimation';
import bg2 from '../../assets/fs2.svg';
import fl from '../../assets/logo.svg';
import nxt from "../../assets/nxt.svg"
import bck from "../../assets/back.svg"
import StartJourney from '../startJourney/startJourney';
import star from '../../assets/star.svg'
import card from '../../assets/card.svg'
import scard from '../../assets/card2.svg'

interface UserAnswers {
  familyGathering: string;
  sweetSide: string;
  singleWatching: string;
  siblingBond: string;
  playlistMood: string;
  chocolateType: string;
  unforgettableMoment: string;
  describeThem: string;
  bondLayers: string;
  trustCall: string;
  hamperName: string;
  address: string;
  pincode: string;
  deliveryDate: string;
}

interface HamperOption {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  chocolates: string[];
}

interface ChocolateData {
  title: string;
  subtitle: string;
  description: string;
  chocolates: any;
  orderId: any;
}

const ChocolateHamperApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [box, setBox] = useState("");
  const [name, setName] = useState("");
  const [add, setAdd] = useState("");
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [lastCall, setLastCall] = useState("");
  const [loading, setLoading] = useState(false);
  const [resloading, setresLoading] = useState(false);

  const [expandedCard, setExpandedCard] = useState(null);
  const [chData, setChData] = useState<ChocolateData | null>(null);
  const [answers, setAnswers] = useState<UserAnswers>({
    familyGathering: '',
    sweetSide: '',
    singleWatching: '',
    siblingBond: '',
    playlistMood: '',
    chocolateType: '',
    unforgettableMoment: '',
    describeThem: '',
    bondLayers: '',
    trustCall: '',
    hamperName: '',
    address: '',
    pincode: '',
    deliveryDate: ''
  });
  const questionMap: Record<keyof UserAnswers, string> = {
    singleWatching: "You caught her binge-watching... what?",
    sweetSide: "If she were a mobile setting, she’d be…",
    siblingBond: "Her love language is...",
    familyGathering: "What’s her vibe at family gatherings?",
    playlistMood: "If she were a playlist, she’d be…",
    chocolateType: "What kind of chocolate does she truly love?",
    unforgettableMoment: "What’s one unforgettable moment that defines your bond with her?",
    describeThem: "If you had to describe her in one line, what would it be?",
    bondLayers: "What are the unseen layers of your bond?",
    trustCall: "When things get tough, why do you still call her?",
    hamperName: "What should we call this hamper of love?",
    address: "Delivery Address",
    pincode: "Pincode",
    deliveryDate: "Delivery Date"
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prepareFinalPayload = (answers: UserAnswers) => {
    const mcqs = [];
    const inputs = [];

    for (const key in answers) {
      const value = answers[key as keyof UserAnswers];
      const question = questionMap[key as keyof UserAnswers];

      if (!value || !question) continue;

      if (
        key === 'unforgettableMoment' ||
        key === 'describeThem' ||
        key === 'bondLayers' ||
        key === 'trustCall'
      ) {
        inputs.push({ question, answer: value });
      } else if (
        key === 'hamperName' ||
        key === 'address' ||
        key === 'pincode' ||
        key === 'deliveryDate'
      ) {
        continue;
      } else {
        mcqs.push({ question, answer: value });
      }
    }

    const payload = {
      mcqs,
      inputs,
      chocolateType: answers.chocolateType || ''
    };

    return payload;
  };


  const handleCardClick = (id: any) => {
    setExpandedCard(expandedCard === id ? null : id);
  };



  const questions = [
    {
      id: 'welcome',
      type: 'welcome',
      title: 'Welcome',
      subtitle: 'HAMILLS',
      description: 'A few clicks by you, a few questions by us & truffles for her.',
      tagline: 'Crafting Master Chocolatiers: Your sibling bond.'
    }, {
      id: 'otp',
      type: 'otp'
    },
    {
      id: 'intro',
      type: 'intro',
      title: 'EVERY BOND HAS AN ESSENCE. LET`S FIND YOURS.',
    },
    {
      id: 'familyGathering',
      type: 'multiple',
      title: "",
      subtitle: 'Now show her she\'s worth the one',
      question: 'YOU CAUGHT HER BINGE-WATCHING ...',
      options: [
        'A timeless romantic drama',
        'Crime documentaries',
        'Guilt pleasure reality shows',
        'None of the above'
      ]
    },
    {
      id: 'sweetSide',
      type: 'multiple',
      title: 'Every bond has an essence',
      subtitle: 'Let\'s find yours',
      question: 'If she were a mobile setting, she’d be…',
      options: [
        'Dark mode: Chic',
        'Bluetooth: Always on, never there',
        'Airplane mode: Calm, MIA',
        'None'
      ]
    },
    {
      id: 'singleWatching',
      type: 'multiple',
      title: 'You caught her binge watching',
      question: 'Her love language is…',
      options: [
        'Roasts, well-timed',
        'Gifts not words',
        'Public teasing, always',
        'None'
      ]
    },
    {
      id: 'siblingBond',
      type: 'multiple',
      title: 'If she were a mood setting, she\'d be',
      question: 'What’s her vibe at family gatherings?',
      options: [
        'Glam and unbothered',
        'Aunties’ MVP',
        'Judging outfits in silence',
        'None'
      ]
    },
    {
      id: 'playlistMood',
      type: 'multiple',
      title: 'Her love language is',
      question: 'If she were a playlist, she’d be…',
      options: [
        'Jazz & late-night feels',
        'Full Bollywood energy',
        'Indie, but make it aesthetic',
        'Unpredictable, like her'
      ]
    },
    {
      id: 'chocolateType',
      type: 'multiple',
      title: 'What kind of chocolate does she truly love?',
      question: 'Her chocolate preference?',
      options: [
        'Dark bold & rich',
        'Milk, soft & classic',
        'Mixed, depends on the mood',
        'No Clue'
      ]
    },
    {
      id: 'unforgettableMoment',
      type: 'text',
      title: 'Tell us one unforgettable moment with your sibling bond',
      question: 'Tell us one unforgettable moment with your sibling bond'
    },
    {
      id: 'describeThem',
      type: 'text',
      title: 'In one sentence, how would you describe her?',
      question: 'In one sentence, how would you describe her?',
      placeholder: "A memory, an inside joke, or a hearfelt pause - anything that's just `so you two.`"
    },
    {
      id: 'describeThem',
      type: 'text',
      title: 'In one sentence, how would you describe her?',
      question: 'YOUR BOND, LAYERED IN CHOCOLATE',
      img: card,
      placeholder: "Witty, warn, mysterious - your words will help up get it just right"
    },

    {
      id: 'hamperSelection',
      type: 'hamper',
      title: 'Choose the box for your one of a kind bond',
      description: 'Based on your answers, we\'ve curated these perfect hampers for your sister.'
    },
    {
      id: 'chocolate',
      type: 'chocolate',
      title: "Choose the box for your one-of-a-kind bond.",
      subtitle: "Three elegant packaging options, each hand-designed. choose the one that suits her style best."
    },
    {
      id: 'finalDetails',
      type: 'details',
      title: 'Final step, final touch',
      description: 'Just a few more details to complete your order'
    },
    {
      id: 'finalQue',
      type: 'finalQue',
      title: 'Trust us, you\'d want to answer this one',
      subtitle: 'When did you last call her?',
      question: 'When did you last call her?',
      options: [
        'Today',
        'Yesterday',
        'Last week',
        'Before last week'
      ]
    },
    {
      id: 'confirmation',
      type: 'confirmation',
      title: 'EXCLUSIVELY CURATED HAMPER',
      subtitle: ' Basis your responses here`s the price for your',
      question: 'Trust us, you\'d want to answer this one. When did you last call her?'
    }
  ];

  const varieties = [
    { id: "BOX1", url: "https://res.cloudinary.com/dix0enljq/image/upload/v1752309122/01_knm5hh.png" },
    { id: "BOX2", url: "https://res.cloudinary.com/dix0enljq/image/upload/v1752309156/03_s1wmv2.png" },
    { id: "BOX3", url: "https://res.cloudinary.com/dix0enljq/image/upload/v1752309164/05_pqcn0y.png" },
  ];

  const currentQuestion = questions[currentStep];

  const handleAnswerSelect = (answer: string, idx: any) => {
    const questionId = currentQuestion.id as keyof UserAnswers;
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));


    setSelectedIndex(idx);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const finalPayload = prepareFinalPayload(answers);

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("No auth token found in localStorage.");
      return;
    }


    try {
      setLoading(true);
      const response = await fetch(
        "https://gen-backend-staging.fabelle-hamper.vtour.tech/chocolate-box/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` },
          body: JSON.stringify({ ...finalPayload }),
        }
      );
      const data = await response.json();
      setChData(data.data);
      setLoading(false);
      handleNext();

    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    }

  }

  const handleChocolateClick = (id: any) => {
    setBox(id)
    handleNext();
  };


  const handleSubmitV2 = async () => {

    const finalPayload = {
      orderId: chData?.orderId,
      name,
      address: add,
      pincode: code,
      date,
      phoneNo: localStorage.getItem("userMobile") || "",
      slideCount: 1,
      boxId: box,
      lastCall: lastCall,
    };


    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("No auth token found in localStorage.");
      return;
    }


    try {
      const response = await fetch(
        "https://gen-backend-staging.fabelle-hamper.vtour.tech/chocolate-box/add-delivery-details",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` },
          body: JSON.stringify({ ...finalPayload }),
        }
      );
      const data = await response.json();
      handleNext();
      localStorage.removeItem("userMobile");
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    }

  }


  const handleSubmitv3 = async () => {

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("No auth token found in localStorage.");
      return;
    }


    try {
      const response = await fetch(
        "https://gen-backend-staging.fabelle-hamper.vtour.tech/chocolate-box/confirm-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` },
          body: JSON.stringify({ orderId: chData?.orderId }),
        }
      );
      const data = await response.json();
      setChData(data.data);
      handleNext();

    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    }

  }

  const generateRes = async () => {

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("No auth token found in localStorage.");
      return;
    }


    try {
      setresLoading(true);
      const response = await fetch(
        "https://gen-backend-staging.fabelle-hamper.vtour.tech/chocolate-box/try-again",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` },
          body: JSON.stringify({ orderId: chData?.orderId }),
        }
      );
      const data = await response.json();
      setChData(data.data);
      setresLoading(false);
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    }

  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleTextInput = (value: string) => {
    const questionId = currentQuestion.id as keyof UserAnswers;
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNextv2 = () => {
    setCurrentIndex((prev) => (prev + 1) % varieties.length);
  };

  const handlePreviousv2 = () => {
    setCurrentIndex((prev) => (prev - 1 + varieties.length) % varieties.length);
  };

  const renderWelcome = () => (
    <div className="min-h-screen  text-white flex flex-col items-center justify-center p-6" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <div className="text-center space-y-8">
        <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl font-serif">W</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-serif tracking-wider">{currentQuestion.title}</h1>
          <div className="w-20 h-px bg-white mx-auto"></div>
          <h2 className="text-2xl font-bold tracking-widest">{currentQuestion.subtitle}</h2>
        </div>

        <div className="space-y-6 max-w-xs">
          <p className="text-lg leading-relaxed">{currentQuestion.description}</p>
          <p className="text-sm opacity-90">{currentQuestion.tagline}</p>
        </div>

        <button
          onClick={handleNext}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
        >
          Let's Begin
        </button>
      </div>
    </div>
  );

  const renderWelcomev2 = () => (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 py-8" onClick={handleNext}>

      <div className="text-center space-y-8">

        <div className="space-y-4">
          <h1 className="golden-text">{currentQuestion.title}</h1>
          <img
            src={star}
            alt="star"
            className="w-3 h-3 mb-2 mx-auto mt-2"
          />
          <p className='w-40 mx-auto text-sm text-white'>Answer at your pace. There are no wrong answers-just yours.</p>
        </div>

      </div>

    </div>
  )

  const renderMultipleChoice = () => (
    <div className="min-h-screen text-white flex flex-col" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-2">
        <div className="text-center space-y-8 max-w-md">


          <div className="h-[10vh]">

            <p className="golden-text max-w-45 mx-auto uppercase">{currentQuestion.question}</p>
          </div>

          <div className="space-y-3 w-full mx-auto">
            {currentQuestion.options?.map((option, index) => (
              <ShinyOptionButton
                key={index}
                text={option}
                selected={selectedIndex === index}
                onClick={() => {
                  handleAnswerSelect(option, index);
                  setTimeout(handleNext, 300);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 flex mb-[8vh] justify-between items-center pt-0">
        <button
          onClick={handlePrevious}
          className="flex items-center space-x-2 text-amber-300 hover:text-white"
        >
          <img
            src={bck}
            alt="bg2"
            className="w-10 h-10 object-contain transition-transform duration-1000  mx-auto"
          />
        </button>


        <div className="text-sm opacity-60 text-amber-300">
          {currentStep - 2} / 8
        </div>
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 text-amber-300 hover:text-white"
        >
          <img
            src={nxt}
            alt="bg2"
            className="w-10 h-10  object-contain transition-transform duration-1000  mx-auto"
          />
        </button>
      </div>
    </div>
  );

  const renderTextInput = () => (
    <div className=" h-screen flex flex-col items-center justify-center text-center px-4 py-8">

      <div className="flex-1 flex flex-col items-center justify-center p-6 ">
        <div className="text-center space-y-8 max-w-md w-full">


          <div className="space-y-4">
            <p className="golden-text">{currentQuestion.question}</p>
            <img
              src={star}
              alt="star"
              className="w-3 h-3 mb-2 mx-auto mt-2"
            />
            {
              currentQuestion.img ? <p className='white_sm_text mt-4'>Crafted by Master Chocolatiers to match your sibling vibe. No two boxes or bonds ae alike.  </p> : " "}
          </div>

          <div className="space-y-4 w-full">
            {
              currentQuestion.img ? <img src={currentQuestion.img} alt="cr" className='w-60 h-60 mx-auto' /> :

                <textarea
                  value={answers[currentQuestion.id as keyof UserAnswers] || ''}
                  onChange={(e) => handleTextInput(e.target.value)}
                  placeholder="A memory, an inside joke, or a hearfelt pause - anything that's just `so you two.`"
                  className="w-60 bg-[#3E1006] text-center mt-4 text-white placeholder-[#84724F] p-4 rounded-lg border border-amber-600 focus:border-amber-500 focus:outline-none resize-none h-40"
                />}
            {
              currentQuestion.img ? <button
                onClick={() => handleSubmit()}
                disabled={!answers[currentQuestion.id as keyof UserAnswers]}
                className="w-1/2 shiny-button selected  py-3 px-6 rounded-lg transition-colors font-semibold"
              >
                <span className=''> {loading ? "Finalizing..." : "FINISH"} </span>
              </button> : <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id as keyof UserAnswers]}
                className="w-1/2 shiny-button selected  py-3 px-6 rounded-lg transition-colors font-semibold"
              >
                <span className=''>Next </span>
              </button>
            }
            {
              currentQuestion.img ? <p className='white_sm_text mt-4 w-60 text-center mx-auto'>Happy with this? Or want a redo? (You've got <span className='font-bold'>2 replays.</span> ) </p> : " "}


          </div>
          {
            !currentQuestion.img &&
            <div className="text-sm opacity-60 text-amber-300">
              {currentStep - 2} / 8
            </div>}
        </div>
      </div>

    </div>
  );

  const renderHamperSelection = () => (
    <div className="h-screen overflow-auto text-white pt-16 pb-4">

      <div className="p-2 px-4 flex">
        <div className='text-sm pt-8 white_sm_text'>
          <p>Happy with this?</p>
          <p>Or want a redo?</p>
          <button
            onClick={handlePrevious}
            className="flex items-center space-x-2 text-amber-300 hover:text-white mt-2"
          >
            <img
              src={bck}
              alt="bg2"
              className="w-10 h-10 mt-2 object-contain transition-transform duration-1000  mx-auto"
            />
          </button>
        </div>
        {
          resloading ? <div className="w-60 h-60 rounded-lg p-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer space-y-4">
            <div className="h-4 bg-white/40 rounded w-3/4"></div>
            <div className="h-4 bg-white/30 rounded w-2/3"></div>
            <div className="h-4 bg-white/20 rounded w-full"></div>
          </div>
            :

            <div className='w-60 h-60  silver-card text-center text-black p-6 text-sm italic'>
              <p className="font-bold font-sans pb-2">{chData?.title}</p>
              <hr></hr>
              <p className='py-2'>{chData?.subtitle}</p>
              <hr></hr>
              <p className='py-2'>{chData?.description}</p>

            </div>}
        <div className='text-sm pt-8'>
          <button
            onClick={handleNext}
            className=" items-center space-x-2 text-amber-300 hover:text-white"
          >
            <p className='white_sm_text w-24'>You have got 2 replays.</p>
            <img
              src={nxt}
              alt="bg2"
              className="w-10 h-10 mt-2 object-contain transition-transform duration-1000  mx-auto mt-14"
            />
          </button>
        </div>
      </div>
      <div className='w-80 mx-auto flex justify-center'>
        <button
          onClick={generateRes}
          className=" otp-shiny-button selected text-sm py-3 px-6 "
        >
          <span className=''>TRY AGAIN </span>
        </button>
        <button
          onClick={handleNext}
          className=" otp-shiny-button selected text-sm py-3 px-6 "
        >
          <span className=''>MOVE AHEAD </span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto   min-h-screen">
        <div className={`space-y-4 grid  transition-all  duration-300  gap-2 ${expandedCard ? "grid-cols-1 bg-[#592001]" : "grid-cols-2"}`}>
          {chData?.chocolates?.map((hamper: any) => (
            <div
              key={hamper.id}
              className="rounded-lg w-full md:w-44 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleCardClick(hamper.id)}
            >
              <div
                className={`p-6 flex items-center justify-between  ${expandedCard === hamper.id ? 'rounded-t-lg' : 'rounded-lg'
                  }`}
              >
                <div className="flex items-center space-x-8">
                  <div>
                    <h3 className="text-2xl !font-bold no-wrap golden-text">{hamper.uniqueName}</h3>
                    <p className="white_sm_text">{hamper.description}</p>
                  </div>
                </div>
                <div className="text-amber-400 transition-transform duration-300 ease-in-out">
                  {expandedCard === hamper.id ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedCard === hamper.id
                  ? ' opacity-100'
                  : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-6 pb-6 border-t border-amber-700 ">
                  <div className="pt-4 space-y-4">
                    <p className="text-base leading-relaxed white_sm_text" >
                      {hamper.ingredients}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>


    </div>
  );

  const renderChocolateSelection = () => (
    <div className="min-h-screen overflow-auto text-white">

      <h3 className="golden-text  mx-auto uppercase mt-8">{currentQuestion.title}</h3>
      <p className=" text-xs text-center mx-auto uppercase mt-4">{currentQuestion.subtitle}</p>
      <div className="p-2 px-4 flex items-center justify-center space-x-4">

        <div className="text-sm">
          <button
            onClick={handlePreviousv2}
            className="flex items-center space-x-2 text-amber-300 hover:text-white"
          >
            <img
              src={bck}
              alt="Previous"
              className="w-10 h-10 object-contain transition-transform duration-300 mx-auto"
            />
          </button>
        </div>

        <div>
          <div
            key={varieties[currentIndex].id}
            className="rounded-lg transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <img
              src={varieties[currentIndex].url}
              alt={varieties[currentIndex].id}
              className="w-60 h-60 object-contain mx-auto"
            />
          </div>
        </div>

        <div className="text-sm">
          <button
            onClick={handleNextv2}
            className="flex items-center space-x-2 text-amber-300 hover:text-white"
          >
            <img
              src={nxt}
              alt="Next"
              className="w-10 h-10 object-contain transition-transform duration-300 mx-auto"
            />
          </button>
        </div>
      </div>

      <button
        onClick={() => handleChocolateClick(varieties[currentIndex].id)}
        className="w-1/2 shiny-button selected  py-3 px-6 rounded-lg transition-colors font-semibold mx-auto justify-center flex"
      >
        <span className=''>CHOOSE BOX DESIGN </span>
      </button>

    </div>
  );

  const renderFinalQue = () => (
    <div className="min-h-screen  text-white">
      <div className="p-6">
        <div className="text-center space-y-4 mb-8">

        </div>
        <div className="h-[10vh]">

          <p className="golden-text  mx-auto uppercase">{currentQuestion.question}</p>
        </div>

        <div className="space-y-3 w-full mx-auto">
          {currentQuestion.options?.map((option, index) => (
            <ShinyOptionButton
              key={index}
              text={option}
              selected={selectedIndex === index}
              onClick={() => {
                setLastCall(option)
              }}
            />
          ))}
        </div>

        <button
          onClick={() => handleSubmitV2()}
          className="w-2/3 mx-auto mt-4 otp-shiny-button selected  py-3 px-6 rounded-lg transition-colors font-semibold"
        >
          <span className=''>CONFIRM YOUR ANSWER </span>
        </button>
      </div>

    </div>
  );

  const renderFinalDetails = () => (
    <div className="min-h-screen  text-white">
      <div className="p-6">
        <div className="text-center space-y-4 mb-8">
          <img
            src={fl}
            alt="flare"
            className="w-15 h-15 mx-auto mt-2"
          />
          <h1 className="golden-text">{currentQuestion.title}</h1>
          <p className="text-base opacity-90">{currentQuestion.description}</p>
        </div>

        <div className="space-y-6 w-full mx-auto flex flex-col justify-center">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="FULL NAME"
            className="w-fit mx-auto shiny-button p-2 px-8 mt-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-center"
          />
          <input
            id="add"
            type="text"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
            placeholder="ADDRESS"
            className="w-fit mx-auto shiny-button p-2 px-8 mt-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-center"
          />
          <input
            id="code"
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="PINCODE"
            className="w-fit mx-auto shiny-button p-2 px-8 mt-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-center"
          />
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="PREFERRED DELIVERY DATE"
            className="w-fit mx-auto shiny-button p-2 px-8 mt-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-center"
          />

          <button
            onClick={() => handleChocolateClick(varieties[currentIndex].id)}
            className="w-1/2 shiny-button selected  py-3 px-6 rounded-lg transition-colors font-semibold mx-auto justify-center flex"
          >
            Continue
          </button>
        </div>

        {/* <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="flex items-center space-x-2 text-amber-300 hover:text-white"
          >
            <img
              src={bck}
              alt="bg2"
              className="w-10 h-10 object-contain transition-transform duration-1000  mx-auto"
            />
          </button>
        </div> */}
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="min-h-screen overflow-auto text-white">

      <h3 className="golden-text  mx-auto uppercase mt-8">{currentQuestion.title}</h3>
      <p className=" text-xs text-center mx-auto uppercase mt-4">{currentQuestion.subtitle}</p>
      <div className="p-2 px-4 flex items-center justify-center space-x-4">



        <div>
          <div
            key={varieties[currentIndex].id}
            className="rounded-lg transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <img
              src={varieties[currentIndex].url}
              alt={varieties[currentIndex].id}
              className="w-60 h-60 object-contain mx-auto"
            />
          </div>
        </div>


      </div>

      <button
        onClick={() => handleSubmitv3()}
        className="otp-shiny-button selected  py-3 px-6 rounded-lg transition-colors font-semibold mx-auto justify-center flex"
      >
        <span className=''>CONFIRM ORDER </span>
      </button>

    </div>
  );


  //   YOUR CURATED HAMPER IS RESERVED AND OUR BRAND CONCIERGE
  // WILL REACH OUT TO YOU SOON
  // TO PROCEED WITH THE PAYMENT AND
  // CONFIRM THE ORDER.

  const renderCurrentStep = () => {
    switch (currentQuestion.type) {
      case 'welcome':
        return <IntroAnimation handleNext={handleNext} />
      case 'otp':
        return <StartJourney handleNext={handleNext} />
      case 'intro':
        return renderWelcomev2();
      case 'multiple':
        return renderMultipleChoice();
      case 'text':
        return renderTextInput();
      case 'hamper':
        return renderHamperSelection();
      case 'chocolate':
        return renderChocolateSelection();
      case 'details':
        return renderFinalDetails();
      case 'finalQue':
        return renderFinalQue();
      case 'confirmation':
        return renderConfirmation();
      default:
        return renderWelcome();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* <img
        src={fl}
        alt="flare"
        className="w-15 h-15 absolute top-2 left-[30%]"
      /> */}
      {renderCurrentStep()}
      {/* <img
        src={bg2}
        alt="bg2"
        className="w-15 h-15 object-contain transition-transform duration-1000 absolute bottom-2 left-[30%]"
      /> */}
    </div>
  );
};

export default ChocolateHamperApp;