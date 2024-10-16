import { FaRegWindowMinimize,FaTimes } from "react-icons/fa";
import Logo from "../../assets/Logo.png";
import SettingSvg from "../../assets/settings.svg";
import crossIcon from "../../assets/Union.svg";
function Menu(){

  const handleMinimize = () => {
    window.electron.minimizeWindow() ;
  };

  const handleClose = () => {
    window.electron.closeWindow();
  };
    return(
      <div className="text-lightWhite font-montserrat">
       <nav className="bg-black px-10  py-1" style={{borderRadius:'30px'}}>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center gap-10">
            <div className="relative bottom-3.5 ">
              <img src={Logo} alt="" className=""/>
            </div>
            <div className="flex flex-row gap-2">
              <div className="border-2 cursor-pointer hover:bg-white hover:text-black bg-black border-lightWhite uppercase text-[13px] rounded-full px-3 py-1">
                Features
              </div>
              <div className="border-2 cursor-pointer hover:bg-white hover:text-black bg-black border-lightWhite uppercase text-[13px] rounded-full px-3 py-1">
                News
              </div>
              <div className="border-2 cursor-pointer hover:bg-white hover:text-black bg-black border-lightWhite uppercase text-[13px] rounded-full px-3 py-1">
                Events
              </div>
            </div>
          </div>
          <div>
          <div className="flex h-full flex-row gap-12 w-full items-center">
            <div className="flex flex-row items-center gap-4">
              <div className="uppercase self-center text-center">
                Settings
              </div>
             <div className="text-center cursor-pointer">
           <img src={SettingSvg} alt="" />
             </div>
            </div>
            <div className="flex flex-row gap-5 items-center">
            <button className="menubar-btn" id="minimize-btn"><FaRegWindowMinimize color='white' className="text-center relative bottom-1" onClick={handleMinimize}/>        </button>
            <div className="cursor-pointer" onClick={handleClose}>    
            <img src={crossIcon} alt="" />
                </div>
            </div>
          </div>
          </div>
        </div>
        </nav>
      </div>
     
    )
  }
  
export default Menu;