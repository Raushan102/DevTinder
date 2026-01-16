import { useState } from "react";
import { X, SlidersHorizontal, Search } from "lucide-react";

const SKILLS_OPTIONS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java",
  "C++", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Angular",
  "Vue.js", "Django", "Flask", "Spring Boot", "MongoDB", "PostgreSQL",
  "MySQL", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git",
  "Redux", "Next.js", "Express", "GraphQL", "REST API", "HTML", "CSS",
  "Tailwind CSS", "Bootstrap", "Material UI", "Firebase", "Redis",
  "Kafka", "RabbitMQ", "Jenkins", "CI/CD", "Terraform", "Ansible"
];

const EXPERIENCE_LEVELS = [
  { value: "fresher", label: "Fresher (0-1 yr)" },
  { value: "junior", label: "Junior (1-3 yrs)" },
  { value: "mid", label: "Mid (3-5 yrs)" },
  { value: "senior", label: "Senior (5-8 yrs)" },
  { value: "expert", label: "Expert (8+ yrs)" }
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

  const handleMinAgeChange = (value) => {
    const numValue = Math.max(18, Math.min(65, parseInt(value) || 18));
    setFilters(prev => ({
      ...prev,
      minAge: numValue,
      maxAge: Math.max(numValue, prev.maxAge)
    }));
  };

  const handleMaxAgeChange = (value) => {
    const numValue = Math.max(18, Math.min(65, parseInt(value) || 65));
    setFilters(prev => ({
      ...prev,
      maxAge: numValue,
      minAge: Math.min(numValue, prev.minAge)
    }));
  };

  const handleReset = () => {
    const resetFilters = {
      skills: [],
      minAge: 18,
      maxAge: 65,
      experienceLevels: [],
      searchSkill: ""
    };
    setFilters(resetFilters);
  };

  const handleApply = () => {
    const appliedFilters = {
      skills: filters.skills,
      minAge: filters.minAge,
      maxAge: filters.maxAge,
      experienceLevels: filters.experienceLevels
    };
    onApplyFilters(appliedFilters);
    if (onToggle && window.innerWidth < 1024) onToggle(); // Close only on mobile
  };

  const handleClose = () => {
    if (onToggle && window.innerWidth < 1024) onToggle(); // Close only on mobile
  };

  const filteredSkills = SKILLS_OPTIONS.filter(skill =>
    skill.toLowerCase().includes(filters.searchSkill.toLowerCase())
  );

  const activeFilterCount = filters.skills.length + filters.experienceLevels.length;

  const FilterContent = () => (
    <div className="h-full flex flex-col bg-base-100">
      {/* Header - Compact */}
      <div className="flex items-center justify-between px-3 py-2.5 lg:px-4 lg:py-3 border-b border-base-300 bg-base-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
          <h2 className="text-base lg:text-lg font-bold">Filters</h2>
          {activeFilterCount > 0 && (
            <div className="badge badge-primary badge-xs">{activeFilterCount}</div>
          )}
        </div>
        <button
          onClick={handleClose}
          className="btn btn-ghost btn-xs btn-circle lg:hidden"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content - Scrollable - More Compact */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 lg:px-4 lg:py-4 space-y-4">
        {/* Skills Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Skills</span>
            {filters.skills.length > 0 && (
              <span className="badge badge-primary badge-xs">
                {filters.skills.length}
              </span>
            )}
          </div>

          {/* Search Input - Compact */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-base-content/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.searchSkill}
              onChange={(e) => setFilters(prev => ({ ...prev, searchSkill: e.target.value }))}
              className="input input-sm input-bordered w-full pl-8 text-sm"
            />
          </div>

          {/* Selected Skills - Compact */}
          {filters.skills.length > 0 && (
            <div className="p-2 bg-primary/10 rounded-lg">
              <div className="flex flex-wrap gap-1">
                {filters.skills.map(skill => (
                  <div key={skill} className="badge badge-primary badge-sm gap-1">
                    <span className="text-xs">{skill}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSkillToggle(skill);
                      }}
                      className="hover:text-error"
                      type="button"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Grid - More Compact */}
          <div className="border border-base-300 rounded-lg p-2 max-h-48 overflow-y-auto bg-base-200/50">
            {filteredSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {filteredSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSkillToggle(skill);
                    }}
                    type="button"
                    className={`btn btn-xs transition-all text-xs ${
                      filters.skills.includes(skill)
                        ? "btn-primary"
                        : "btn-ghost hover:btn-outline"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-base-content/60">
                <Search className="w-8 h-8 mx-auto mb-1 opacity-30" />
                <p className="text-xs">No skills found</p>
              </div>
            )}
          </div>

          {/* Quick Actions - Compact */}
          {filters.searchSkill === "" && (
            <div className="flex gap-1.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const popular = ["JavaScript", "React", "Node.js", "Python", "TypeScript"];
                  setFilters(prev => ({
                    ...prev,
                    skills: [...new Set([...prev.skills, ...popular])]
                  }));
                }}
                type="button"
                className="btn btn-xs btn-outline text-xs"
              >
                + Popular
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFilters(prev => ({ ...prev, skills: [] }));
                }}
                type="button"
                className="btn btn-xs btn-ghost text-xs"
                disabled={filters.skills.length === 0}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="divider my-2"></div>

        {/* Age Range - Compact */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Age</span>
            <span className="text-xs font-mono font-semibold">
              {filters.minAge}-{filters.maxAge}
            </span>
          </div>

          {/* Number Inputs - Compact */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min="18"
              max="65"
              value={filters.minAge}
              onChange={(e) => {
                e.preventDefault();
                handleMinAgeChange(e.target.value);
              }}
              className="input input-sm input-bordered w-full text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              min="18"
              max="65"
              value={filters.maxAge}
              onChange={(e) => {
                e.preventDefault();
                handleMaxAgeChange(e.target.value);
              }}
              className="input input-sm input-bordered w-full text-sm"
              placeholder="Max"
            />
          </div>

          {/* Range Sliders - Compact */}
          <div className="space-y-1">
            <input
              type="range"
              min="18"
              max="65"
              value={filters.minAge}
              onChange={(e) => handleMinAgeChange(e.target.value)}
              className="range range-primary range-xs"
            />
            <input
              type="range"
              min="18"
              max="65"
              value={filters.maxAge}
              onChange={(e) => handleMaxAgeChange(e.target.value)}
              className="range range-primary range-xs"
            />
          </div>

          {/* Age Presets - Compact */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                setFilters(prev => ({ ...prev, minAge: 18, maxAge: 25 }));
              }}
              type="button"
              className="btn btn-xs btn-outline text-xs"
            >
              18-25
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFilters(prev => ({ ...prev, minAge: 26, maxAge: 35 }));
              }}
              type="button"
              className="btn btn-xs btn-outline text-xs"
            >
              26-35
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFilters(prev => ({ ...prev, minAge: 36, maxAge: 50 }));
              }}
              type="button"
              className="btn btn-xs btn-outline text-xs"
            >
              36-50
            </button>
          </div>
        </div>

        <div className="divider my-2"></div>

        {/* Experience Level - Compact */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Experience</span>
            {filters.experienceLevels.length > 0 && (
              <span className="badge badge-primary badge-xs">
                {filters.experienceLevels.length}
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            {EXPERIENCE_LEVELS.map(exp => (
              <label
                key={exp.value}
                className={`flex items-center gap-2 p-2 border rounded-lg transition-all cursor-pointer ${
                  filters.experienceLevels.includes(exp.value)
                    ? "border-primary bg-primary/10"
                    : "border-base-300 hover:bg-base-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.experienceLevels.includes(exp.value)}
                  onChange={() => handleExperienceToggle(exp.value)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="text-sm flex-1">{exp.label}</span>
              </label>
            ))}
          </div>

          {/* Quick Select - Compact */}
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                setFilters(prev => ({
                  ...prev,
                  experienceLevels: ["fresher", "junior"]
                }));
              }}
              type="button"
              className="btn btn-xs btn-outline text-xs"
            >
              Entry
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFilters(prev => ({
                  ...prev,
                  experienceLevels: ["senior", "expert"]
                }));
              }}
              type="button"
              className="btn btn-xs btn-outline text-xs"
            >
              Senior
            </button>
          </div>
        </div>

        {/* Extra padding for mobile */}
        <div className="h-16 lg:h-2"></div>
      </div>

      {/* Footer - Compact & Sticky */}
      <div className="border-t border-base-300 px-3 py-2.5 lg:px-4 lg:py-3 bg-base-100 space-y-2 flex-shrink-0">
        {/* Active Filters Summary */}
        {activeFilterCount > 0 && (
          <div className="text-xs text-base-content/70 text-center">
            {activeFilterCount} active
          </div>
        )}

        {/* Action Buttons - Compact */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
            type="button"
            className="btn btn-sm btn-outline flex-1 text-sm"
            disabled={activeFilterCount === 0}
          >
            Reset
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleApply();
            }}
            type="button"
            className="btn btn-sm btn-primary flex-1 text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - Smaller width */}
      <div className={`hidden lg:block w-64 xl:w-72 border-r border-base-300 bg-base-100 h-screen sticky top-0 overflow-hidden transition-all duration-300`}>
        <FilterContent />
      </div>

      {/* Mobile/Tablet Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={handleClose}
          />

          {/* Filter Panel - Smaller width */}
          <div className="lg:hidden fixed inset-y-0 left-0 z-[70] w-[280px] sm:w-[320px] bg-base-100 shadow-2xl animate-slideInLeft overflow-hidden">
            <FilterContent />
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Prevent scroll jump */
        .overscroll-contain {
          overscroll-behavior: contain;
        }
      `}</style>
    </>
  );
}

export default FilterSidebar;
