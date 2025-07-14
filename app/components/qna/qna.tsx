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
}

const ChocolateHamperApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const hamperOptions = [
    {
      id: 1,
      name: "VELVET PACT",
      price: 1199,
      kcal: "119 KCAL",
      description: "Warm, soft, silky-smooth chocolate with a new voice on tough days.",
      ingredients: "Milk Chocolate (55%) (Sugar, Cocoa Butter, Milk Solids, Cocoa Solids), Cashews (10%), Honey (5%), Refined Wheat Flour, Refined Palmolein, Milk Solids, Invert Sugar, Refined Palmolein, Cocoa Solids, Emulsifier (E322), Iodized Salt, Leavening Agent (E500), Flavour (Natural & Nature-identical), Antioxidant (E320). Contains Milk, Cashews, Wheat.",
      chocolates: ["Dark Chocolate Truffle", "Milk Chocolate Bar", "Hazelnut Crunch", "Caramel Delight"]
    },
    {
      id: 2,
      name: "SILENT JAZZ",
      price: 899,
      kcal: "134 KCAL",
      description: "Smooth jazz meets chocolate in this harmonious blend of flavors.",
      ingredients: "Dark Chocolate (60%) (Sugar, Cocoa Butter, Cocoa Solids), Almonds (8%), Vanilla Extract, Sea Salt, Emulsifier (E322), Natural Flavors.",
      chocolates: ["Dark Jazz Truffle", "Almond Crunch", "Vanilla Bean", "Sea Salt Caramel"]
    },
    {
      id: 3,
      name: "NUTTY JOY",
      price: 1099,
      kcal: "142 KCAL",
      description: "A celebration of nuts and chocolate in perfect harmony.",
      ingredients: "Milk Chocolate (50%) (Sugar, Cocoa Butter, Milk Solids), Mixed Nuts (20%), Honey, Cocoa Solids, Emulsifier (E322), Salt.",
      chocolates: ["Walnut Brownie", "Peanut Butter Cup", "Almond Bark", "Pistachio Delight"]
    },
    {
      id: 4,
      name: "PEARL AMBER",
      price: 1299,
      kcal: "128 KCAL",
      description: "Elegant amber-hued chocolates with a touch of luxury.",
      ingredients: "White Chocolate (45%) (Sugar, Cocoa Butter, Milk Solids), Saffron, Cardamom, Rose Petals, Emulsifier (E322), Natural Flavors.",
      chocolates: ["Saffron White", "Rose Petal", "Cardamom Spice", "Honey Amber"]
    },
    {
      id: 5,
      name: "MIDNIGHT OATH",
      price: 1399,
      kcal: "119 KCAL",
      description: "Dark, mysterious flavors for the midnight chocolate lover.",
      ingredients: "Dark Chocolate (70%) (Sugar, Cocoa Butter, Cocoa Solids), Coffee Beans (5%), Rum Essence, Sea Salt, Emulsifier (E322).",
      chocolates: ["Espresso Dark", "Rum Truffle", "Midnight Mint", "Black Forest"]
    }
  ];

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
      question: 'How would you describe your sweet side?',
      options: [
        'Subtle and caring',
        'Bold and expressive',
        'Thoughtful and deep',
        'Playful and fun'
      ]
    },
    {
      id: 'singleWatching',
      type: 'multiple',
      title: 'You caught her binge watching',
      question: 'What genre does she prefer?',
      options: [
        'Romantic comedies',
        'Psychological thrillers',
        'Documentary series',
        'Action adventures'
      ]
    },
    {
      id: 'siblingBond',
      type: 'multiple',
      title: 'If she were a mood setting, she\'d be',
      question: 'How would you describe your sibling bond?',
      options: [
        'Cozy and warm',
        'Dynamic and energetic',
        'Calm and peaceful',
        'Intense and passionate'
      ]
    },
    {
      id: 'playlistMood',
      type: 'multiple',
      title: 'Her love language is',
      question: 'What\'s her go-to playlist mood?',
      options: [
        'Chill and mellow',
        'Upbeat and energetic',
        'Classical and serene',
        'Indie and alternative'
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
      question: 'Share a special memory:'
    },
    {
      id: 'describeThem',
      type: 'text',
      title: 'In one sentence, how would you describe her?',
      question: 'Describe her in one sentence:'
    },
    {
      id: 'describeThem',
      type: 'text',
      title: 'In one sentence, how would you describe her?',
      question: 'YOUR BOND, LAYERED IN CHOCOLATE',
      img: card
    },

    {
      id: 'hamperSelection',
      type: 'hamper',
      title: 'Choose the box for your one of a kind bond',
      description: 'Based on your answers, we\'ve curated these perfect hampers for your sister.'
    },
    {
      id: 'finalDetails',
      type: 'details',
      title: 'Final step, final touch',
      description: 'Just a few more details to complete your order'
    },
    {
      id: 'trustCall',
      type: 'multiple',
      title: 'Trust us, you\'d want to answer this one',
      subtitle: 'When did you last call her?',
      question: 'When did you last call her?',
      options: [
        'Yesterday',
        'Last week',
        'Last month',
        'It\'s been too long'
      ]
    },
    {
      id: 'confirmation',
      type: 'confirmation',
      title: 'The final question',
      question: 'Trust us, you\'d want to answer this one. When did you last call her?'
    }
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
      const response = await fetch(
        "https://reg-backend-staging.fabelle-hamper.vtour.tech/chocolate-box/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` },
          body: JSON.stringify({ ...finalPayload }),
        }
      );
      const data = await response.json();
      setChData(data.data);
      handleNext();

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
    <div className="min-h-screen  text-white flex flex-col items-center justify-center p-6" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }} onClick={handleNext}>
      <img
        src={fl}
        alt="flare"
        className="w-15 h-15 mx-auto mt-2 absolute top-2"
      />
      <div className="text-center space-y-8">

        <div className="space-y-4">
          <h1 className="golden-text">{currentQuestion.title}</h1>
          <p className='w-40 mx-auto text-sm'>Answer at your pace. There are no wrong answers-just yours.</p>
        </div>
        <img
          src={star}
          alt="star"
          className="w-3 h-3 mb-2 mx-auto mt-2"
        />
      </div>
      <img
        src={bg2}
        alt="bg2"
        className="w-10 h-10 object-contain transition-transform duration-1000  mx-auto absolute bottom-4"
      />
    </div>
  )

  const renderMultipleChoice = () => (
    <div className="min-h-screen text-white flex flex-col" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <img
        src={fl}
        alt="flare"
        className="w-15 h-15 mx-auto mt-2"
      />
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-2">
        <div className="text-center space-y-8 max-w-md">


          <div className="h-[10vh]">

            <p className="golden-text max-w-45 mx-auto">{currentQuestion.question}</p>
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

      <div className="p-6 flex justify-between items-center pt-0">
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
      <img
        src={bg2}
        alt="bg2"
        className="w-10 h-10 object-contain transition-transform duration-1000  mx-auto"
      />
    </div>
  );

  const renderTextInput = () => (
    <div className=" text-white flex flex-col relative">
      <img
        src={fl}
        alt="flare"
        className="w-15 h-15 mx-auto mt-2"
      />
      <div className="flex-1 flex flex-col items-center justify-center p-6 ">
        <div className="text-center space-y-8 max-w-md w-full">


          <div className="space-y-4">
            <p className="golden-text">{currentQuestion.question}</p>
          </div>
          <img
            src={star}
            alt="star"
            className="w-3 h-3 mb-2 mx-auto mt-2"
          />
          <div className="space-y-4 w-full">
            {
              currentQuestion.img ? <img src={currentQuestion.img} alt="cr" className='w-60 h-60 mx-auto' /> :

                <textarea
                  value={answers[currentQuestion.id as keyof UserAnswers] || ''}
                  onChange={(e) => handleTextInput(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-60 bg-[#3E1006] mt-4 text-white placeholder-[#84724F] p-4 rounded-lg border border-amber-600 focus:border-amber-500 focus:outline-none resize-none h-40"
                />}
            {
              currentQuestion.img ? <button
                onClick={() => handleSubmit()}
                disabled={!answers[currentQuestion.id as keyof UserAnswers]}
                className="w-1/2 shiny-button selected  py-3 px-6 rounded-lg transition-colors font-semibold"
              >
                <span className=''>FINISH </span>
              </button> : <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id as keyof UserAnswers]}
                className="w-1/2 shiny-button selected  py-3 px-6 rounded-lg transition-colors font-semibold"
              >
                <span className=''>Next </span>
              </button>
            }


          </div>
          {
            !currentQuestion.img &&
            <div className="text-sm opacity-60 text-amber-300">
              {currentStep - 2} / 8
            </div>}
        </div>
      </div>
      <img
        src={bg2}
        alt="bg2"
        className="w-15 h-15 object-contain transition-transform duration-1000  mx-auto mt-40"
      />
    </div>
  );

  const renderHamperSelection = () => (
    <div className="min-h-screen overflow-auto text-white">
      <img
        src={fl}
        alt="flare"
        className="w-15 h-15 mx-auto mt-2"
      />
      <div className="p-2 px-4 flex">
        <div className='text-sm pt-8'>
          <p>Happy with this?</p>
          <p>Or want a redo?</p>
          <button
            onClick={handlePrevious}
            className="flex items-center space-x-2 text-amber-300 hover:text-white"
          >
            <img
              src={bck}
              alt="bg2"
              className="w-10 h-10 mt-2 object-contain transition-transform duration-1000  mx-auto"
            />
          </button>
        </div>
        <div className='w-60 h-60  silver-card text-black'>
          <p>{chData?.title}</p>
          <p>{chData?.subtitle}</p>
          <p>{chData?.description}</p>
          {/* <img
            src={scard}
            alt="bg2"
            className="w-60 h-60  object-contain transition-transform duration-1000  mx-auto"
          /> */}
        </div>
        <div className='text-sm pt-8'>
          <button
            onClick={handleNext}
            className=" items-center space-x-2 text-amber-300 hover:text-white"
          >
            <p>Happy with this?</p>
            <p>Or want a redo?</p>
            <img
              src={nxt}
              alt="bg2"
              className="w-10 h-10 mt-2 object-contain transition-transform duration-1000  mx-auto"
            />
          </button>
        </div>
      </div>
      <div className='w-80 mx-auto flex justify-center'>
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id as keyof UserAnswers]}
          className=" shiny-button selected text-sm py-3 px-6 "
        >
          <span className=''>TRY AGAIN </span>
        </button>
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id as keyof UserAnswers]}
          className=" shiny-button selected text-sm py-3 px-6 "
        >
          <span className=''>MOVE AHEAD </span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto  min-h-screen">
        <div className="space-y-4 flex flex-wrap">
          {hamperOptions.map((hamper) => (
            <div
              key={hamper.id}
              className=" rounded-lg w-44 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleCardClick(hamper.id)}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div>
                    <h3 className="text-xl font-bold text-amber-100">{hamper.name}</h3>
                    <p className="text-amber-300 text-sm">{hamper.kcal}</p>
                  </div>
                </div>
                <div className="text-amber-400 transition-transform duration-300 ease-in-out">
                  {expandedCard === hamper.id ? (
                    <Minus size={24} className="transform rotate-0" />
                  ) : (
                    <Plus size={24} className="transform rotate-0" />
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out ${expandedCard === hamper.id
                  ? 'w-[40vh] opacity-100'
                  : 'max-h-0 opacity-0'
                  } overflow-hidden`}
              >
                <div className="px-6 pb-6 border-t border-amber-700">
                  <div className="pt-4 space-y-4">
                    <p className="text-amber-200 text-base leading-relaxed">
                      {hamper.description}
                    </p>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-amber-100">Includes:</p>
                      <div className="flex flex-wrap gap-2">
                        {hamper.chocolates.map((chocolate, index) => (
                          <span
                            key={index}
                            className="bg-amber-700 text-xs px-3 py-1 rounded-full text-amber-100 border border-amber-600"
                          >
                            {chocolate}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-amber-100">Ingredients:</p>
                      <p className="text-xs text-amber-300 leading-relaxed">
                        {hamper.ingredients}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );

  const renderFinalDetails = () => (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-950 text-white">
      <div className="p-6">
        <div className="text-center space-y-4 mb-8">
          <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center mx-auto">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif leading-tight">{currentQuestion.title}</h1>
          <p className="text-base opacity-90">{currentQuestion.description}</p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-amber-300" />
              <input
                type="text"
                placeholder="Full Name"
                value={answers.hamperName}
                onChange={(e) => setAnswers(prev => ({ ...prev, hamperName: e.target.value }))}
                className="flex-1 bg-amber-800 text-white placeholder-amber-300 p-3 rounded-lg border border-amber-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-amber-300" />
              <input
                type="text"
                placeholder="Delivery Address"
                value={answers.address}
                onChange={(e) => setAnswers(prev => ({ ...prev, address: e.target.value }))}
                className="flex-1 bg-amber-800 text-white placeholder-amber-300 p-3 rounded-lg border border-amber-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Pincode"
                value={answers.pincode}
                onChange={(e) => setAnswers(prev => ({ ...prev, pincode: e.target.value }))}
                className="flex-1 bg-amber-800 text-white placeholder-amber-300 p-3 rounded-lg border border-amber-600 focus:border-amber-500 focus:outline-none"
              />
              <div className="flex items-center space-x-2 flex-1">
                <Calendar className="w-5 h-5 text-amber-300" />
                <input
                  type="date"
                  value={answers.deliveryDate}
                  onChange={(e) => setAnswers(prev => ({ ...prev, deliveryDate: e.target.value }))}
                  className="flex-1 bg-amber-800 text-white p-3 rounded-lg border border-amber-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!answers.hamperName || !answers.address || !answers.pincode || !answers.deliveryDate}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-900 disabled:opacity-50 text-white py-3 px-6 rounded-lg transition-colors font-semibold"
          >
            Continue
          </button>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="flex items-center space-x-2 text-amber-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-sm opacity-60">
            {currentStep} / {questions.length - 1}
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-950 text-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center mx-auto">
          <Star className="w-10 h-10" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-serif">Order Confirmed!</h1>
          <p className="text-lg">Your curated hamper is being prepared with love</p>
        </div>

        <div className="bg-amber-800 rounded-lg p-6 border border-amber-600 text-left">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Name:</span> {answers.hamperName}</p>
            <p><span className="font-semibold">Address:</span> {answers.address}</p>
            <p><span className="font-semibold">Pincode:</span> {answers.pincode}</p>
            <p><span className="font-semibold">Delivery Date:</span> {answers.deliveryDate}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-base opacity-90">
            Your exclusively curated hamper will reach out to you soon.
          </p>
          <p className="text-2xl font-bold">₹ 2500</p>
        </div>

        <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
          Complete Order
        </button>
      </div>
    </div>
  );

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
      case 'details':
        return renderFinalDetails();
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