import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../util/constent";
import { addFeed, removeUserFromFeed, removeFeed } from "../../store/FeedSlice";
import Card from "./Card";
import { Ghost, Loader2 } from "lucide-react";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed) || [];
  const user = useSelector((store) => store.user);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const prevUserIdRef = useRef(null);

  /* ---------------- RESET WHEN USER CHANGES ---------------- */
  useEffect(() => {
    const currentUserId = user?._id || null;

    if (prevUserIdRef.current !== currentUserId) {
      prevUserIdRef.current = currentUserId;

      dispatch(removeFeed());
      setPage(1);
      setHasMore(true);
    }
  }, [user, dispatch]);

  /* ---------------- FETCH FEED (PAGE-DRIVEN) ---------------- */
  useEffect(() => {
    if (!user || !hasMore || loading) return;

    const fetchFeed = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/user/feeds?page=${page}&limit=10`,
          { withCredentials: true }
        );

        const data = res?.data?.data ?? [];

        if (data.length === 0) {
          setHasMore(false);
          return;
        }

        dispatch(addFeed(data));
      } catch (err) {
        console.error("Fetch Error:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [page, user, hasMore, dispatch]);

  /* ---------------- SWIPE HANDLER ---------------- */
  const handleSwipeAction = (_, id) => {
    dispatch(removeUserFromFeed(id));

    // If cards are running low → load next page
    if (feed.length - 1 < 3 && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  /* ---------------- GUARDS ---------------- */
  if (!user) return null;

  if (loading && feed.length === 0) {
    return (
      <div className="flex items-center justify-center w-full py-20">
        <Loader2 size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  if (feed.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full pt-60  pb-80">
        <Ghost size={84} className="sm:w-40 sm:h-40 opacity-30" />
        <p className="mt-4 font-semibold text-xl sm:text-2xl">
          {hasMore ? "Loading developers..." : "No more developers"}
        </p>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="flex justify-center items-center w-full px-2 py-2 sm:py-4 md:py-6  sm:min-h-[calc(100vh-65px)] md:min-h-screen">
      <div className="relative w-full sm:max-w-[360px] md:max-w-[380px] h-[calc(100vh-157px)] sm:h-auto sm:aspect-[9/14] sm:min-h-[78vh] md:min-h-[85vh]">
        {feed.slice(0, 3).map((profile, index) => (
          <div
            key={profile._id}
            className="absolute inset-0"
            style={{
              zIndex: 10 - index,
              transform: `translateY(${index * 8}px) scale(${1 - index * 0.04})`,
            }}
          >
            <Card
              profile={profile}
              onSwipe={handleSwipeAction}
              isTopCard={index === 0}
            />
          </div>
        ))}
      </div>

      {loading && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-primary text-primary-content px-3 py-2 sm:px-4 rounded-xl flex items-center gap-2 text-xs sm:text-sm shadow-lg z-50">
          <Loader2 size={14} className="sm:w-4 sm:h-4 animate-spin" />
          <span className="hidden sm:inline">Loading more...</span>
          <span className="sm:hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Feed;
