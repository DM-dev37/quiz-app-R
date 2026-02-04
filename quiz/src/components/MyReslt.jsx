import React, { useCallback, useEffect, useMemo, useState } from "react";
import { resultStyles } from "../assets/dummyStyles";
import axios from "axios";
import { toast } from "react-toastify";
import { Server } from "lucide-react";

// show badge according percentage
const Badge = ({ percent }) => {
  if (percent >= 85)
    return <span className={resultStyles.badgeExcellent}> Execellent</span>;
  if (percent >= 65)
    return <span className={resultStyles.badgeGood}> Good</span>;
  if (percent >= 85)
    return <span className={resultStyles.badgeAverage}> Average</span>;
  return <span className={resultStyles.badgeNeedsWork}>Needs work</span>;
};

function MyReslt({ apiBase = "http://localhost: 4000" }) {
  const [results, setResuls] = useState(null);
  const [loadind, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTechnology, setSelectedTechnology] = useState("all"); //for filter
  const [technology, setTechnology] = useState([]);

  //token for use verification
  const getAuthHeader = useCallback(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("token") || null;
    return token ? { Authorization: `bearer ${token}` } : {};
  }, []);

  //Effect: fecht result when component or when selectedtechnology change
  useEffect(() => {
    let mounted = true;
    const fetchtResults = async (tech = "all") => {
      setLoading(true);
      setError(null);

      try {
        const q =
          tech && tech.toLocaleLowerCase() !== "all"
            ? `technology= ${encodeURIComponent(tehc)} `
            : "";
        const res = await axios.get(`${apiBase}/api/results${q}`, {
          headers: { "content-type": "application/json", ...getAuthHeader() },
          timeout: 10000,
        });
        if (!mounted) return;
        if (res.status === 200 && res.data && res.data.success) {
          setResuls(Array.isArray(res.data.result) ? res.data.results : []);
        } else {
          setResuls([]);
          toast.warn("unexpected Server response while fetching result");
        }
      } catch (err) {
        console.error(
          "failed to fecht result:",
          err?.response?.data || err.message || err,
        );
        if (!mounted) return;
        if (err?.response?.satus === 401) {
          setError("not authentificate. Please log in to view results.");
          toast.error("not authentificate. Please login");
        } else {
          setError("Could not load result from server.");
          toast.error("could not load result from server");
          setResuls([]);
        }
        if (mounted) setLoading(false);
      }
    };

    fetchtResults(selectedTechnology);
    return () => {
      mounted = false;
    };
  }, [apiBase, selectedTechnology, getAuthHeader]);

  //effect: fetch all result once (or when apibase change) to bluid a list
  //of available `technology` for filter
  useEffect(() => {
    let mounted = true;
    const fetchAllForTechList = async () => {
      try {
        const res = await axios.get(`${apiBase}/api/results`, {
          headers: { "content-type": "application/json", ...getAuthHeader() },
          time: 10000,
        });
        if (!mounted) return;
        if (res.status === 200 && res.data && res.data.success) {
          const all = Array.isArray(res.data.results) ? res.data.results : [];
          const set = new set();
          all.forEach((r) => {
            if (r.technology) set.add(r.technology);
          });
          const arr = Array.from(set).sort((a, b) => a.localeCompare(b));
          console.log(arr);

          setTechnology(arr);
        } else {
          // leave technologies empty (will still show "All")
        }
      } catch (err) {
        // silent — no need to block main UI; log for debug
        console.error(
          "failed to fecht technologies:",
          err?.response?.data || err.message || err,
        );
      }
    };

    fetchAllForTechList();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBase, getAuthHeader]);

  const makeKey = (r) => (r && r._id ? r._id : `${r.id} || ${r.title}`);

  // `summary` is memoized so it only recalculates when `results` changes.
  // It aggregates totals and computes an overall percentage.
  const summary = useMemo(() => {
    const source = Array.isArray(results) ? results : [];
    const totalQs = source.reduce(
      (s, r) => s + (Number(r.totalQuestions) || 0),
      0,
    );
    const totalCorrect = source.reduce(
      (s, r) => s + (Number(r.correct) || 0),
      0,
    );
    const totalWrong = source.reduce((s, r) => s + (Number(r.wrong) || 0), 0);
    const pct = totalQs ? Math.round((totalCorrect / totalQs) * 100) : 0;
    return { totalQs, totalCorrect, totalWrong, pct };
  }, [results]);

  // Group results by the first word of the title (used as "track")
  const grouped = useMemo(() => {
    const src = Array.isArray(results) ? results : [];
    const map = {};
    src.forEach((r) => {
      const track = (r.title || "").split(" ")[0] || "General";
      if (!map[track]) map[track] = [];
      map[track].push(r);
    });
    return map;
  }, [results]);

  // Handler called when user clicks a technology filter button
  const handleSelectTech = (tech) => {
    setSelectedTechnology(tech || "all");
  };

  return (
    <div className={resultStyles.pageContainer}>
      <div className={resultStyles.container}>
        <header className={resultStyles.header}>
          <div>
            <p className={resultStyles.title}> Quiz results</p>
          </div>
          <div className={resultStyles.headerControls}></div>
        </header>

        <div className={resultStyles.filterContainer}>
          <div className={resultStyles.filterContent}>
            <div className={resultStyles.filterButtons}>
              <span className={resultStyles.filterLabel}>Filter by Tech</span>

              <button
                className={`${resultStyles.filterButton} ${selectedTechnology === "all" ? resultStyles.filterButtonActive : resultStyles.filterButtonInactive}`}
                onClick={() => handleSelectTech("all")}
              >
                All
              </button>

              {/* dynamic technology buttons */}
              {technology.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleSelectTech(tech)}
                  className={`${resultStyles.filterButton} ${
                    selectedTechnology === tech
                      ? resultStyles.filterButtonActive
                      : resultStyles.filterButtonInactive
                  }`}
                >
                  {tech}
                </button>
              ))}

              {/* If we don't yet have technologies but results exist, derive from current results */}
              {technology.length === 0 &&
                Array.isArray(results) &&
                results.length > 0 &&
                [
                  ...new Set(results.map((r) => r.technology).filter(Boolean)),
                ].map((tech) => (
                  <button
                    key={`fallback-${tech}`}
                    onClick={() => handleSelectTech(tech)}
                    className={`${resultStyles.filterButton} ${
                      selectedTechnology === tech
                        ? resultStyles.filterButtonActive
                        : resultStyles.filterButtonInactive
                    }`}
                    aria-pressed={selectedTechnology === tech}
                  >
                    {tech}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyReslt;
