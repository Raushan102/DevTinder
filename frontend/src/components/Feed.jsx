import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./constent";
import { addFeed, removeUserFromFeed } from "../util/FeedSlice";
import Card from "./Card";
import { Ghost, Loader2, Sparkles } from "lucide-react";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed) || [];
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const hasFetchedRef = useRef(false);

  async function fetchFeed(pageNum) {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/user/feeds?page=${pageNum}&limit=10`,
        { withCredentials: true }
      );
      const newData = res?.data?.data ?? [];

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        dispatch(addFeed(newData));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!hasFetchedRef.current && feed.length === 0) {
      hasFetchedRef.current = true;
      fetchFeed(1);
    }
  }, []);

  const handleSwipeAction = (action, id) => {
    const newLength = feed.length - 1;
    dispatch(removeUserFromFeed(id));

    if (newLength <= 2 && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFeed(nextPage);
    }
  };

  // Initial loading state
  if (loading && feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <Loader2 size={64} className="animate-spin text-primary mb-4" />
        <p className="text-base-content/60 font-semibold">Loading profiles...</p>
      </div>
    );
  }

  // Empty state
  if (feed.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-base-200 p-4">
        <div className="p-12 bg-base-200 rounded-full mb-6 shadow-lg">
          <Ghost size={80} className="text-base-content/20" />
        </div>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-base-content mb-2">
          Out of Developers
        </h2>
        <p className="text-sm font-bold opacity-50 uppercase tracking-widest mt-2">
          {!hasMore ? "No more profiles available" : "Check back later for more"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen rounded-[3.4rem] bg-base-200 p-4 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Card Stack Container */}
      <div
        className="relative z-10"
        style={{ width: '380px', height: '640px' }}
      >
        {feed.map((profile, index) => {
          if (index > 2) return null;

          return (
            <div
              key={profile._id}
              className="absolute left-0 top-0"
              style={{
                zIndex: feed.length - index,
                transform: `translateY(${index * 15}px) scale(${1 - index * 0.05})`,
                opacity: 1 - index * 0.2,
              }}
            >
              <Card
                profile={profile}
                onSwipe={handleSwipeAction}
                isTopCard={index === 0}
              />
            </div>
          );
        })}
      </div>



      {/* Background loading indicator */}
      {loading && feed.length > 0 && (
        <div className="fixed bottom-8 right-8 bg-primary text-primary-content p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3">
          <Loader2 size={20} className="animate-spin" />
          <span className="font-semibold text-sm">Loading more...</span>
        </div>
      )}
    </div>
  );
}

export default Feed;
