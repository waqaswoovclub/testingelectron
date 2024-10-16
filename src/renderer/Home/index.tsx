import { useState } from 'react';
import peopleImage from '../../../assets/people.png';
import footerImg from '../../../assets/footer.png';
import arrowIcon from '../../../assets/arrowIcon2.svg';
import goIcon from '../../../assets/goIcon.svg';
import bgImage1 from '../../../assets/zoa-bg-image.png';
import bgImage2 from '../../../assets/bg-img-2.png';
import bgImage3 from '../../../assets/bg-img-3.png';
import bgImage4 from '../../../assets/bg-img-4.png';

// function classNames(...classes: any) {
//   return classes.filter(Boolean).join(' ');
// }

function Home() {
  const [checkbox, setCheckBox] = useState(false);
  const [index, setIndex] = useState(0);
  const [directoryPath, setDirectoryPath] = useState(
    'C:\\Program Files\\Zoaverse Business Hub',
  );

  const selectDirectory = async () => {
    const selectedPath = await window.electron.selectDirectory();
    if (selectedPath) {
      setDirectoryPath(selectedPath);
    }
  };
  const handleImageNext = () => {
    if (index < 3) {
      setIndex((prev) => prev + 1);
    }
  };

  const handleImagePrev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="!z-10 !h-[631px] !w-full font-montserrat !relative"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(12, 12, 12, 0.9) 24%, rgba(30, 30, 30, 0.1) 100%), url(${index === 0 ? bgImage1 : index === 1 ? bgImage2 : index === 2 ? bgImage3 : bgImage4})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition:
          'background-image 0.5s ease-in-out, transform 0.5s ease-in-out',
        height: '579px',
        borderRadius: '30px',
        filter: 'contrast(0.9)',
      }}
    >
      <div className="h-full relative z-20 flex flex-row ">
        <div className="w-1/2 z-30 h-full flex flex-col px-12 py-20 items-center justify-start gap-6 ">
          <div className="uppercase text-32 leading-tight   text-lightWhite">
            CREATE. CONNECT. HOST. ZOAVERSE METAVERSE
          </div>
          <div className="text-white text-opacity-80 text-[14px]">
            Zoaverse provides a wide selection of customizable venues that makes
            it easy to get started in the metaverse with just a few clicks.
          </div>
          <div className="relative top-10 h-full w-full">
            <div className="text-lightWhite text-opacity-70 text-sm p-4">
              Installation directory
            </div>
            <div className="flex w-[404px] absolute items-center space-x-5 rounded-full">
              <input
                type="text"
                value={directoryPath}
                readOnly
                style={{ width: '404px' }}
                className="!w-[404px] p-2 text-black text-opacity-60 py-4 px-8 bg-opacity-90 bg-lightWhite rounded-full"
              />
              <button
                className="p-3 px-9 py-4 bg-lightGreen rounded-full hover:bg-green-600"
                onClick={selectDirectory}
              >
                <span className="text-white">...</span>
              </button>
            </div>
          </div>

          <div className=" absolute bottom-0 left-0 w-max flex ">
            <div className="relative">
              <img
                src={footerImg}
                alt=""
                className="w-full h-auto rounded-bl-[30px]"
                style={{ borderBottomLeftRadius: '30px' }}
              />
              <div className="absolute inset-0 flex flex-row items-center justify-start gap-10 px-12">
                <button className="px-8 py-3 bg-skyBlue rounded-full relative top-4 text-white hover:bg-blue-600 ">
                  <span className="flex flex-row justify-between items-center gap-6 w-full">
                    {' '}
                    <span className="text-sm text-lightWhite">
                      Begin Install
                    </span>{' '}
                    <span>
                      <img src={goIcon} alt="" />
                    </span>
                  </span>{' '}
                </button>
                <div className="round relative top-4 flex flex-row items-center justify-center gap-8">
                  <input
                    type="checkbox"
                    checked={checkbox}
                    id="checkbox"
                    onClick={() => setCheckBox(!checkbox)}
                    className=""
                  />
                  <label htmlFor="checkbox" />
                  <div className="self-center relative top-0.5 text-lightWhite">
                    Auto update the platform whenever a new update is available
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center gap-3">
              <div
                className={`p-2 bg-white bg-red-warm hover:bg-gray-200  transition-colors duration-200 ease-in-out transform  active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 h-12 w-12 rounded-full flex items-center justify-center ${index === 0 ? 'bg-opacity-60 cursor-not-allowed hover:bg-opacity-80 hover:scale-100' : 'cursor-pointer hover:scale-105'}`}
                onClick={() => handleImagePrev()}
              >
                <img
                  src={arrowIcon}
                  alt=""
                  className="self-center -rotate-45 "
                  style={{ rotate: '180deg' }}
                />
              </div>
              <div
                className={`p-2 bg-white bg-red-warm hover:bg-gray-200  transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 h-12 w-12 rounded-full flex items-center justify-center ${index === 3 ? 'bg-opacity-60 cursor-not-allowed hover:bg-opacity-60' : 'cursor-pointer'}`}
                onClick={() => handleImageNext()}
              >
                <img
                  src={arrowIcon}
                  alt=""
                  className="self-center -rotate-45 "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 z-10 h-full flex flex-col items-center justify-end">
          <img src={peopleImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
