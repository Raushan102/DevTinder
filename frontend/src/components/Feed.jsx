import React from "react";
import { useDispatch } from "react-redux";

function Feed() {
  const dispatch = useDispatch();
  const feed = dispatch((store) => store.feed);
  function fetchFeed() {
    try {
      if (feed) return;
    } catch (error) {
      console.log("error", error);
    }
  }

  return <h1>this is the feed page</h1>;
}

export default Feed;
