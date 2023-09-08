import "../../components/main-feed/navbar.css";
import { useNavigate } from "react-router-dom";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineCog, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { run } from "../../utils";
import { SearchBarTab } from "./searchTab";


export const NavBar = () => {
  const navigate = useNavigate();
  const [handleSearchClick, setHandleSearchClick] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      const largeScreenThreshold = 1024;
      const mediumScreenThreshold = 768;

      setIsLargeScreen(screenWidth >= largeScreenThreshold);
      setIsMediumScreen(screenWidth >= mediumScreenThreshold);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    // return will remove the event listener when component unmounts 
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return handleSearchClick ? (
    <>
      <div
        className={`hidden sm:flex w-16 min-w-[64px] flex-col justify-start items-start h-screen transition-width  ease-in-out duration-300 border-gray-500 border-r `}
      >
      <div className="h-1/5 w-full"> 
          <img
            src={EmptyLogo}
            alt="Logo"
            className="top-0 left-0 p-2 lg:h-[8vh] transition-height duration-300 ease-in-out"
          />
        </div>

        <div className="flex flex-col h-4/5 w-full">
          {/* Starting column of icons */}
          <div className="flex group cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
            <div
              onClick={() => navigate("/feed")}
              style={{
                fontFamily: "Verdana",
                fontSize: "20px",
                color: "white",
              }}
            >
              <AiOutlineHome
                size={32}
                className="transition-transform duration-100 group-hover:scale-110"
                style={{ color: "white", marginLeft: "1rem" }}
              />
            </div>
          </div>

          <div
            className="group flex cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md"
            onClick={() => {
              console.log(
                setHandleSearchClick(false),
                console.log(handleSearchClick)
              );
            }}
          >
            <div
              style={{
                fontFamily: "Verdana",
                fontSize: "20px",
                color: "white",
              }}
            >
              <HiOutlineMagnifyingGlass
                size={32}
                className="transition-transform duration-100 group-hover:scale-110"
                style={{ color: "white", marginLeft: "1rem" }}
              />
            </div>
          </div>

          <div className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
            <div
              style={{
                fontFamily: "Verdana",
                fontSize: "20px",
                color: "white",
              }}
            >
              <BiAddToQueue
                size={32}
                className="transition-transform duration-100 group-hover:scale-110"
                style={{ color: "white", marginLeft: "1rem" }}
              />
            </div>
          </div>

          <div onClick={() => {navigate("/profile")}
        } className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
            <div
              style={{
                fontFamily: "Verdana",
                fontSize: "20px",
                color: "white",
              }}
            >
              <BsFillPersonFill
                size={32}
                className="transition-transform duration-100 group-hover:scale-110"
                style={{ color: "white", marginLeft: "1rem" }}
              />
            </div>
          </div>

          <div className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
            <div
              style={{
                fontFamily: "Verdana",
                fontSize: "20px",
                color: "white",
              }}
            >
              <HiOutlineCog
                size={32}
                className="transition-transform duration-100 group-hover:scale-110"
                style={{ color: "white", marginLeft: "1rem" }}
              />
            </div>
          </div>
        </div>
      </div>
      <SearchBarTab handleSearchProp={setHandleSearchClick}/>
    </>
  ) : (
    <>
    {/* run is defined in utils.ts and is designed to clean up turnary statements*/}
      {run(() => {
        if (isLargeScreen) {
          return (
            <div
              className={`hidden lg:flex flex-col justify-start items-start h-screen w-64 transition-width ease-in-out duration-300 border-gray-500 border-r`}
            >
              <div className="h-1/5 w-full">
                <img
                  src={EmptyLogo}
                  alt="Logo"
                  className="top-0 left-0 m-2 h-8 lg:h-[9vh] transition-height duration-300 ease-in-out"
                />
              </div>
              <div className="flex flex-col h-4/5 w-full">
                {" "}
                {/*Starting column of icons*/}
                <div
                  className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center hover:bg-gray-600 hover:rounded-md"
                  onClick={() => navigate("/feed")}
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <AiOutlineHome
                    size={32}
                    className="mr-2 transition-transform duration-100 group-hover:scale-110 "
                    style={{ color: "white" }}
                  />
                  <div className="custom-transition-width-left">Home</div>
                </div>
                <div
                  className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
                  onClick={() => {
                    console.log(
                      setHandleSearchClick(true),
                      console.log(handleSearchClick)
                    );
                  }}
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <HiOutlineMagnifyingGlass
                    size={32}
                    className="mr-2 transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white" }}
                  />
                  <div className="custom-transition-width-left">Search</div>
                </div>
                <div
                  className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <BiAddToQueue
                    size={32}
                    className="mr-2 transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white" }}
                  />
                  <div className="custom-transition-width-left">Post</div>
                </div>
                <div
                  onClick={() => {navigate("/profile")}}
                  className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <BsFillPersonFill
                    size={32}
                    className="mr-2 transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white" }}
                  />
                  <div className="custom-transition-width-left">Account</div>
                </div>
                <div
                  className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <HiOutlineCog
                    size={32}
                    className="mr-2 transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white" }}
                  />
                  <div className="custom-transition-width-left">Settings</div>
                </div>
              </div>
            </div>
          );
        } else if (isMediumScreen && !isLargeScreen) {
          return (
            <div
              className={`flex w-16 flex-col justify-start items-start h-screen transition-width ease-in-out duration-300 border-gray-500 border-r `}
            >
              <div className="h-1/5 w-full">
                <img
                  src={EmptyLogo}
                  alt="Logo"
                  className="top-0 left-0 p-2 lg:h-[8vh] transition-height duration-300 ease-in-out"
                />
              </div>

              <div className="flex flex-col h-4/5 w-full">
                {/* Starting column of icons */}
                <div className="hidden sm:flex group cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
                  <div
                    onClick={() => navigate("/feed")}
                    style={{
                      fontFamily: "Verdana",
                      fontSize: "20px",
                      color: "white",
                    }}
                  >
                    <AiOutlineHome
                      size={32}
                      className="transition-transform duration-100 group-hover:scale-110"
                      style={{ color: "white", marginLeft: "1rem" }}
                    />
                  </div>
                </div>

                <div
                  className="group flex cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md"
                  onClick={() => {
                    console.log(
                      setHandleSearchClick(false),
                      console.log(handleSearchClick)
                    );
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Verdana",
                      fontSize: "20px",
                      color: "white",
                    }}
                  >
                    <HiOutlineMagnifyingGlass
                      size={32}
                      className="transition-transform duration-100 group-hover:scale-110"
                      style={{ color: "white", marginLeft: "1rem" }}
                    />
                  </div>
                </div>

                <div className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
                  <div
                    style={{
                      fontFamily: "Verdana",
                      fontSize: "20px",
                      color: "white",
                    }}
                  >
                    <BiAddToQueue
                      size={32}
                      className="transition-transform duration-100 group-hover:scale-110"
                      style={{ color: "white", marginLeft: "1rem" }}
                    />
                  </div>
                </div>

                <div onClick={() => {navigate("/profile")}}
                className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
                  <div
                    style={{
                      fontFamily: "Verdana",
                      fontSize: "20px",
                      color: "white",
                    }}
                  >
                    <BsFillPersonFill
                      size={32}
                      className="transition-transform duration-100 group-hover:scale-110"
                      style={{ color: "white", marginLeft: "1rem" }}
                    />
                  </div>
                </div>

                <div className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
                  <div
                    style={{
                      fontFamily: "Verdana",
                      fontSize: "20px",
                      color: "white",
                    }}
                  >
                    <HiOutlineCog
                      size={32}
                      className="transition-transform duration-100 group-hover:scale-110"
                      style={{ color: "white", marginLeft: "1rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          // will add something in final else statement to render in future. Possibly navbar on bottom of screen or hamburger menus
          return <></>;
        }
      })}
    </>
  );
};
