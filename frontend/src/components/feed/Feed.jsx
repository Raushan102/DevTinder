import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../util/constent";
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

  /* ---------------- RESET WHEN USER CHANGES ---------------- */
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

  /* ---------------- RESET WHEN FILTERS CHANGE ---------------- */
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

  /* ---------------- FETCH FEED WITH FILTERS (PAGE-DRIVEN) ---------------- */
  useEffect(() => {
    if (!user || !hasMore || loading) return;

    const fetchFeed = async () => {
      setLoading(true);
      try {
        // Build URL with filters
        let url = `${BASE_URL}/user/feeds?page=${page}&limit=10`;

        // Add skills filter (comma-separated)
        if (activeFilters.skills.length > 0) {
          url += `&skills=${activeFilters.skills.join(',')}`;
        }

        // Add experience levels filter (comma-separated)
        if (activeFilters.experienceLevels.length > 0) {
          url += `&experience=${activeFilters.experienceLevels.join(',')}`;
        }

        // Add age range filters
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

  /* ---------------- SWIPE HANDLER ---------------- */
  const handleSwipeAction = (_, id) => {
    dispatch(removeUserFromFeed(id));

    // If cards are running low → load next page
    if (feed.length - 1 < 3 && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  /* ---------------- FILTER HANDLER ---------------- */
  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
  };

  /* ---------------- TOGGLE FILTER ---------------- */
  const toggleFilter = () => {
    setIsFilterOpen(isFilterOpen => !isFilterOpen);
  };

  /* ---------------- GUARDS ---------------- */
  if (!user) return null;

  const isInitialLoading = loading && feed.length === 0;
  const isEmptyFeed = feed.length === 0 && !loading;
  const activeFilterCount = activeFilters.skills.length + activeFilters.experienceLevels.length;

  /* ---------------- UI ---------------- */
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Filter Toggle Button - Top Left (Mobile/Tablet only) */}
      <button
        onClick={toggleFilter}
        className="lg:hidden fixed top-20 left-1 z-50 btn btn-primary btn-sm gap-2 shadow-lg"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <div className="badge badge-secondary badge-sm">
            {activeFilterCount}
          </div>
        )}
      </button>

      {/* Left Sidebar - Filters */}
      <FilterSidebar
        onApplyFilters={handleApplyFilters}
        initialFilters={activeFilters}
        isOpen={isFilterOpen}
        onToggle={toggleFilter}
      />

      {/* Main Content - Feed Cards */}
      <div className="flex-1 overflow-y-auto bg-base-200">
        {isInitialLoading ? (
          // Initial Loading State
          <div className="flex items-center justify-center w-full h-screen">
            <div className="text-center">
              <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
              <p className="text-lg font-semibold">Loading developers...</p>
            </div>
          </div>
        ) : isEmptyFeed ? (
          // Empty State
          <div className="flex flex-col items-center justify-center w-full h-screen px-4">
            <Ghost size={84} className="sm:w-40 sm:h-40 opacity-30 mb-4" />
            <p className="mt-4 font-semibold text-xl sm:text-2xl text-center">
              {hasMore ? "Loading developers..." : "No developers found"}
            </p>
            {!hasMore && activeFilterCount > 0 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-base-content/60 mb-3 max-w-md">
                  Try adjusting your filters to see more developers
                </p>
                <button
                  onClick={toggleFilter}
                  className="btn btn-primary btn-sm gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Adjust Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          // Feed Cards
          <div className="flex justify-center items-center w-full px-2 py-2 sm:py-4 md:py-6 min-h-screen pt-16 lg:pt-2">
            <div className="relative w-full mb-10 sm:max-w-[360px] md:max-w-[380px] h-[calc(100vh-157px)] sm:h-auto sm:aspect-[9/14] sm:min-h-[78vh] md:min-h-[85vh]">
              {feed.slice(0, 3).map((profile, index) => (
                <div
                  key={profile._id}
                  className="absolute inset-0"
                  style={{
                    zIndex: 10 - index,
                    transform: `translateY(${index * 8}px) scale(${1 - index * 0.04
                      })`,
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

            {/* Loading More Indicator */}
            {loading && (
              <div className="fixed bottom-6 right-4 sm:right-6 bg-primary text-primary-content px-3 py-2 sm:px-4 rounded-xl flex items-center gap-2 text-xs sm:text-sm shadow-lg z-30">
                <Loader2 size={14} className="sm:w-4 sm:h-4 animate-spin" />
                <span className="hidden sm:inline">Loading more...</span>
                <span className="sm:hidden">Loading...</span>
              </div>
            )}

            {/* End of Feed Message */}
            {!hasMore && feed.length > 0 && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-base-300 text-base-content px-4 py-2 rounded-xl text-sm shadow-lg z-30">
                You've seen all developers
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
