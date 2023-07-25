import React, { useState, useEffect } from "react";
import "./mainfeed.css";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../../redux/store";

interface Post {
  title: string;
  content: string;
  // username: string;
  // topic_tags: string[];
}

const username = useAppSelector((state) => state.userState.user?.username);
const MainFeed = () => {
  const [activeTab, setActiveTab] = useState("For You");
  const [placeholder, setActivePlaceholder] = useState(
    "Ask anything about computer science..."
  );
  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlePostClick = async () => {
    //input.trim just checks to see if there is nothing in the input, if there is nothing do not allow the user to post
    if (input.trim() !== "") {
      //if u are confused on the ..., research spread operators in javascript
      setPosts((prevPosts) => [...prevPosts, { title: title, content: input }]);
      setInput("");
      setTitle("");
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/post", {
        title: title, //objects sending to postgres db
        content: input,
        username: username,
      });
      console.log(response);
    } catch (error) {
      console.error("error while posting", error);
    }
  };

  useEffect(() => {
    //cycles through prompts every 3 seconds
    const prompts = [
      "computer science...",
      "tech...",
      "getting a tech job...",
      "software engineering...",
    ];
    let activePrompt = 0;
    const interval = setInterval(() => {
      setActivePlaceholder(`Ask anything about ${prompts[activePrompt]}`);
      activePrompt = activePrompt + 1 === prompts.length ? 0 : activePrompt + 1;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col justify-start items-center min-h-screen w-screen gradient-background-main">
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img
          src={EmptyLogo}
          alt="Logo"
          className="absolute top-0 left-0 m-2 h-8 lg:h-[10vh]"
        />
      </div>
      <div className="tab-container">
        <div
          className={`tab-item ${activeTab === "For You" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("For You")}
        >
          <div className="underline-custom">For You</div>
        </div>
        <div
          className={`tab-item ${activeTab === "Explore" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("Explore")}
        >
          <div className="underline-custom">Explore</div>
        </div>
      </div>
      <div className="mt-6 bg-white bg-opacity-20 rounded-lg w-10/12 md:w-7/12 lg:w-5/12 p-4">
        <h2 className="text-white text-xl">What's on your mind, {username}?</h2>
        <div className="flex flex-col justify-between items-start mt-2">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 rounded-lg bg-white bg-opacity-0 mr-2 mb-2 text-2xl focus:outline-none"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="flex justify-between items-center w-full">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full p-2 rounded-lg bg-white bg-opacity-0 mr-2 focus:outline-none"
              value={input}
              onChange={handleInputChange}
            />
            <button className="post-button" onClick={handlePostClick}>
              Post
            </button>{" "}
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="p-4 bg-white bg-opacity-30 rounded-lg fade-in"
          >
            <h3 className="text-white text-sm font-medium mb-2">@{username}</h3>
            <h3 className="text-white text-lg">{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MainFeed;
