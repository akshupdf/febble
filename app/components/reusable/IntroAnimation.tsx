import { useState } from 'react';
import bg from '../../assets/fs.svg';
import bg2 from '../../assets/fs2.svg';
import fl from '../../assets/logo.svg';
import star from '../../assets/star.svg'

export default function IntroAnimation(props: any) {
    const [isIntroDone, setIsIntroDone] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);

    const handleClick = () => {
        setAnimateOut(true);
        setIsIntroDone(true);
    };

    return (
        <>
            {/* {!isIntroDone ? (
                <div
                    onClick={handleClick}
                    className={`h-[110vh] relative flex flex-col items-center justify-center  transition-transform duration-1000 ease-in-out overflow-hidden
          ${animateOut ? 'scale-150 opacity-0' : 'scale-75 opacity-100'}
        `}
                >
                    <img src={bg} alt="bg" className="w-60 h-60 mx-auto absolute top-2 left-[20%]" />
                    <img
                        src={fl}
                        alt="flare"
                        className="w-30 h-30 mx-auto absolute bottom-0 left-[35%]"
                    />
                </div>
            ) : ( */}
            <div className="h-screen flex flex-col items-center justify-center text-center px-4 py-8" onClick={() => props.handleNext()}>

                <div
                    className={`text-center text-sm text-yellow-200 transition-opacity duration-1000 opacity-100 max-w-60 `}


                >
                    <p className="text-sm tracking-wide mb-2 golden-text">A FEW CLICKS BY YOU.</p>
                    <p className="text-sm tracking-wide mb-4 golden-text">
                        A PERSONALIZED BOX OF TRUFFLES FOR HER.
                    </p>
                </div>
                <img
                    src={star}
                    alt="star"
                    className="w-3 h-3 mb-2 mx-auto mt-2"
                />
                <div
                    className={`text-center text-white transition-opacity duration-1000 opacity-100 mt-4`}


                >
                    <p className="text-xs mb-1">CRAFTED BY</p>
                    <p className="text-base font-semibold mb-1">MASTER CHOCOLATIERS.</p>
                    <p className="text-xs">CURATED BY</p>
                    <p className="text-base font-semibold">YOUR SIBLING BOND.</p>
                </div>

            </div>

        </>
    );
}
