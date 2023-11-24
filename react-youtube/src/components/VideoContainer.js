import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constant";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
    return () => {
      window.removeEventListener("scroll", infiniteScroll, true);
    };
  }, [nextPageToken]);

  const getVideos = async () => {
    try {
      const url =
        nextPageToken !== ""
          ? `${YOUTUBE_API}&pageToken=${nextPageToken}`
          : YOUTUBE_API;
      const data = await fetch(url);
      const json = await data.json();
      setNextPageToken(json?.nextPageToken);
      setVideos([...videos, ...json?.items]);
    } catch (e) {
      console.error(e);
    }
  };

  const infiniteScroll = () => {
    if (
      window.innerHeight + Math.round(document.documentElement.scrollTop) >=
      document.documentElement.offsetHeight - 300
    ) {
      getVideos();
    }
  };

  if (!videos.length) return <Shimmer />;

  return (
    <div
      className={`flex flex-wrap justify-center mt-[72px] ${
        !isMenuOpen ? "" : "ml-[280px]"
      }`}
    >
      {videos?.map((video) => (
        <Link key={video?.id} to={"/watch?v=" + video.id}>
          <VideoCard videoInfo={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
