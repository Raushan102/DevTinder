/* eslint-disable react-hooks/static-components */
// FilterSidebar.jsx - Premium Glassmorphism Filter (Matching Navbar/Footer)
import { useState } from "react";
import { X, SlidersHorizontal, Search } from "lucide-react";

const SKILLS_OPTIONS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java",
  "C++", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Angular",
  "Vue.js", "Django", "Flask", "Spring", "MongoDB", "PostgreSQL",
  "MySQL", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git",
  "Redux", "Next.js", "Express", "GraphQL", "REST API"
];

const EXPERIENCE_LEVELS = [
  { value: "fresher", label: "Fresher" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "expert", label: "Expert" }
];

function FilterSidebar({ onApplyFilters, initialFilters = {}, isOpen, onToggle }) {
  const [filters, setFilters] = useState({
    skills: initialFilters.skills || [],
    minAge: initialFilters.minAge || 18,
    maxAge: initialFilters.maxAge || 65,
    experienceLevels: initialFilters.experienceLevels || [],
    searchSkill: ""
  });

  const handleSkillToggle = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleExperienceToggle = (level) => {
    setFilters(prev => ({
      ...prev,
      experienceLevels: prev.experienceLevels.includes(level)
        ? prev.experienceLevels.filter(l => l !== level)
        : [...prev.experienceLevels, level]
    }));
  };

  const handleReset = () => {
    setFilters({
      skills: [],
      minAge: 18,
      maxAge: 65,
      experienceLevels: [],
      searchSkill: ""
    });
  };

  const handleApply = () => {
    onApplyFilters({
      skills: filters.skills,
      minAge: filters.minAge,
      maxAge: filters.maxAge,
      experienceLevels: filters.experienceLevels
    });
    if (onToggle && window.innerWidth < 1024) onToggle();
  };

  const filteredSkills = SKILLS_OPTIONS.filter(skill =>
    skill.toLowerCase().includes(filters.searchSkill.toLowerCase())
  );

  const activeCount = filters.skills.length + filters.experienceLevels.length;

  const FilterContent = () => (
    <div className="h-full flex flex-col backdrop-blur-xl bg-white/20 border-r border-white/20"  style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
        }}>

      {/* Header - Glassmorphism */}
      <div className="px-5 py-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-black" strokeWidth={2} />
            <h2 className="text-base font-bold text-black uppercase tracking-wider">Filters</h2>
            {activeCount > 0 && (
              <div className="px-2 py-0.5 bg-black text-white text-xs font-bold">
                {activeCount}
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1.5 hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Skills Section */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-black">Skills</h3>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 sm:text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.searchSkill}
              onChange={(e) => setFilters(prev => ({ ...prev, searchSkill: e.target.value }))}
              className="w-full px-3 py-2 pl-9 bg-white/10 border border-white/20
                       backdrop-blur-md text-white sm:text-black placeholder-gray-400 sm:placeholder-gray-500
                       focus:outline-none focus:bg-white/15 focus:border-white/30
                       transition-all text-sm"

            />
          </div>

          {/* Selected Skills */}
          {filters.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {filters.skills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-black text-white text-xs font-semibold
                           hover:bg-gray-800 transition-all"
                >
                  <span>{skill}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          {/* Skills Grid */}
          <div className="   p-2.5 max-h-48 overflow-y-auto" style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
        }}>
            <div className="flex flex-wrap gap-1.5">
              {filteredSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-2.5 py-1.5 text-xs font-semibold transition-all ${
                    filters.skills.includes(skill)
                      ? " text-black"
                      : " text-black hover:bg-white/20 "
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Age Range */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Age</h3>
            <span className="text-sm font-mono font-bold text-black">
              {filters.minAge}-{filters.maxAge}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <input
              type="number"
              min="18"
              max="65"
              value={filters.minAge}
              onChange={(e) => {
                const val = Math.max(18, Math.min(65, parseInt(e.target.value) || 18));
                setFilters(prev => ({ ...prev, minAge: val, maxAge: Math.max(val, prev.maxAge) }));
              }}
              className="px-3 py-2 bg-white/10 border border-white/20
                       backdrop-blur-md text-white sm:text-black text-center font-semibold
                       focus:outline-none focus:bg-white/15 focus:border-white/30
                       transition-all text-sm"
            />
            <input
              type="number"
              min="18"
              max="65"
              value={filters.maxAge}
              onChange={(e) => {
                const val = Math.max(18, Math.min(65, parseInt(e.target.value) || 65));
                setFilters(prev => ({ ...prev, maxAge: val, minAge: Math.min(val, prev.minAge) }));
              }}
              className="px-3 py-2 bg-white/10 border border-white/20
                       backdrop-blur-md text-white sm:text-black text-center font-semibold
                       focus:outline-none focus:bg-white/15 focus:border-white/30
                       transition-all text-sm"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-black">Experience</h3>

          <div className="space-y-1.5">
            {EXPERIENCE_LEVELS.map(exp => (
              <label
                key={exp.value}
                className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-all ${
                  filters.experienceLevels.includes(exp.value)
                    ? "bg-white/15 border border-white/30"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.experienceLevels.includes(exp.value)}
                  onChange={() => handleExperienceToggle(exp.value)}
                  className="w-4 h-4 accent-orange-400"
                />
                <span className="text-sm font-semibold text-white sm:text-black flex-1">
                  {exp.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Glassmorphism */}
      <div className="px-5 py-4 border-t border-white/20">
        <div className="flex gap-2.5">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/15
                     border border-white/20 backdrop-blur-md
                     text-sm font-bold uppercase tracking-wider text-black
                     transition-all disabled:opacity-40"
            disabled={activeCount === 0}
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2.5 bg-black hover:bg-gray-900
                     text-white
                     text-sm font-bold uppercase tracking-wider
                     transition-all hover:scale-105 active:scale-95"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 h-full">
        <FilterContent />
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onToggle}
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-[70] w-80 shadow-2xl">
            // eslint-disable-next-line react-hooks/static-components
            <FilterContent />
          </div>
        </>
      )}
    </>
  );
}

export default FilterSidebar;
