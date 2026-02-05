// Feed.jsx - Premium Feed Layout (No Scroll, Glassmorphism)
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../util/constent";
import GlassmorphismLayout from "../util/Glassmorphismlayout";
import {
  addFeed,
  removeUserFromFeed,
  removeFeed,
  undoFeed,
} from "../../store/FeedSlice";
import Card from "./Card";
import FilterSidebar from "./FilterSidebar";
import { Ghost, Loader2, SlidersHorizontal } from "lucide-react";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed) || [];
  const user = useSelector((store) => store.user);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    skills: [],
    minAge: 18,
    maxAge: 65,
    experienceLevels: []
  });
  const prevUserIdRef = useRef(null);
  const prevFiltersRef = useRef(null);

  function handleRollBack(PreviousProfile) {
    dispatch(undoFeed(PreviousProfile));
  }

  useEffect(() => {
    const currentUserId = user?._id || null;
    if (prevUserIdRef.current !== currentUserId) {
      prevUserIdRef.current = currentUserId;
      dispatch(removeFeed());
      setPage(1);
      setHasMore(true);
      setActiveFilters({
        skills: [],
        minAge: 18,
        maxAge: 65,
        experienceLevels: []
      });
    }
  }, [user, dispatch]);

  useEffect(() => {
    const filtersChanged = JSON.stringify(activeFilters) !== JSON.stringify(prevFiltersRef.current);
    if (filtersChanged && prevFiltersRef.current !== null) {
      prevFiltersRef.current = activeFilters;
      dispatch(removeFeed());
      setPage(1);
      setHasMore(true);
    } else if (prevFiltersRef.current === null) {
      prevFiltersRef.current = activeFilters;
    }
  }, [activeFilters, dispatch]);

  useEffect(() => {
    if (!user || !hasMore || loading) return;

    const fetchFeed = async () => {
      setLoading(true);
      try {
        let url = `${BASE_URL}/user/feeds?page=${page}&limit=10`;

        if (activeFilters.skills.length > 0) {
          url += `&skills=${activeFilters.skills.join(',')}`;
        }

        if (activeFilters.experienceLevels.length > 0) {
          url += `&experience=${activeFilters.experienceLevels.join(',')}`;
        }

        url += `&minAge=${activeFilters.minAge}&maxAge=${activeFilters.maxAge}`;

        const res = await axios.get(url, { withCredentials: true });
        const data = res?.data?.data ?? [];

        if (data.length === 0) {
          setHasMore(false);
          return;
        }

        dispatch(addFeed(data));
      } catch (err) {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [page, user, hasMore, dispatch, activeFilters]);

  const handleSwipeAction = (_, id) => {
    dispatch(removeUserFromFeed(id));
    if (feed.length - 1 < 3 && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (!user) return null;

  const isInitialLoading = loading && feed.length === 0;
  const isEmptyFeed = feed.length === 0 && !loading;
  const activeFilterCount = activeFilters.skills.length + activeFilters.experienceLevels.length;

  return (
      <GlassmorphismLayout
          backgroundImage="assets/hero-bg.jpg"
          mobileBackgroundImage="assets/c1.jpg"
          overlayStyle="editorial"
          loaderDuration={500}
          showShutterEffect={true}
        >
    <div className="flex w-full h-full overflow-hidden p-1 sm:px-6 md:px-8 py-4">

      {/* Mobile Filter Toggle */}
      <button
        onClick={toggleFilter}
        className="lg:hidden fixed top-30 left-4 z-40 px-4 py-2
                 backdrop-blur-xl bg-white/10 border border-white/20  shadow-xl
                 hover:bg-white/20 transition-all"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4  text-white sm:text-black" strokeWidth={2.5} />
          <span className="text-sm font-bold text-white sm:text-black">Filters</span>
          {activeFilterCount > 0 && (
            <div className="px-1.5 py-0.5 bg-black text-white text-xs font-bold rounded">
              {activeFilterCount}
            </div>
          )}
        </div>
      </button>

      {/* Filter Sidebar */}
      <FilterSidebar
        onApplyFilters={handleApplyFilters}
        initialFilters={activeFilters}
        isOpen={isFilterOpen}
        onToggle={toggleFilter}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden ">
        {isInitialLoading ? (
          <div className="text-center">
            <Loader2 size={48} className="animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg font-semibold">
              Loading developers...
            </p>
          </div>
        ) : isEmptyFeed ? (
          <div className="flex flex-col items-center justify-center">
            <Ghost size={80} className="text-gray-400 mb-6" strokeWidth={1.5} />
            <p className="text-gray-300 font-bold text-2xl text-center mb-2">
              {hasMore ? "Loading..." : "No developers found"}
            </p>
            {!hasMore && activeFilterCount > 0 && (
              <button
                onClick={toggleFilter}
                className="mt-4 px-6 py-2.5 bg-black text-white hover:bg-gray-900
                         rounded-xl transition-all font-semibold text-sm"
              >
                Adjust Filters
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-start justify-center w-full sm:max-w-[25rem] h-full pt-0 sm:pt-0 lg:pt-0">
            {/* Compact Card Container - Max 500px height */}
            <div className="relative w-full aspect-[3/4] h-[600px] sm:max-h-[600px]">
              {feed.slice(0, 3).map((profile, index) => (
                <div
                  key={profile._id}
                  className="absolute inset-0"
                  style={{
                    zIndex: 10 - index,
                    transform: `translateY(${index * 5}px) scale(${1 - index * 0.03})`,
                  }}
                >
                  <Card
                    profile={profile}
                    onSwipe={handleSwipeAction}
                    isTopCard={index === 0}
                    unDoFeed={handleRollBack}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && feed.length > 0 && (
          <div className="fixed bottom-6 right-6 z-30
                     px-4 py-2.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-xl">
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-white" />
              <span className="text-sm font-semibold text-white">Loading...</span>
            </div>
          </div>
        )}

        {/* End Message */}
        {!hasMore && feed.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30
                     px-4 py-2.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-xl">
            <span className="text-sm font-semibold text-white">
              You've seen all developers
            </span>
          </div>
        )}
      </div>
    </div>
    </GlassmorphismLayout>
  );
}

export default Feed;
