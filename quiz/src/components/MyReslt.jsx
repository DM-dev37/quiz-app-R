import React, { useCallback, useEffect, useState } from "react";
import { resultStyles } from "../assets/dummyStyles";
import axios from "axios";
import { toast } from "react-toastify";
import { Server } from "lucide-react";

// show badge according percentage
const Badge = ({ percent }) => {
  if(percent >=85)
    return <span className={resultStyles.badgeExcellent}> Execellent</span>
  if(percent >=65)
    return <span className={resultStyles.badgeGood}> Good</span>
  if(percent >=85)
    return <span className={resultStyles.badgeAverage}> Average</span>
    return <span className={resultStyles.badgeNeedsWork}>Needs work</span>
}

function MyReslt({apiBase = 'http://localhost: 4000'}) {

  const [results, setResuls] = useState(null);
  const [loadind, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTechnology, setSelectedTechnology] = useState('all'); //for filter
  const [technology, setTechnology] = useState([]);

  //token for use verification
  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem('token')|| localStorage.getItem('token')|| null;
    return token ? {Authorization: `bearer ${token}`} : {};
  }, []);

  //Effect: fecht result when component or when selectedtechnology change
  useEffect (() => {
    let mounted = true;
    const  fetchtResults = async(tech = 'all') => {
      setLoading(true);
      setError(null);

      try {
        const q =
        tech && tech.toLocaleLowerCase() !== 'all'
        ? `technology= ${encodeURIComponent(tehc)} `
        :"";
        const res = await axios.get(`${apiBase}/api/results${q}`, {
          headers: {"content-type": "application/json", ...getAuthHeader()};
          timeout: 10000,
        });
        if(!mounted) return;
        if(res.status === 200 && res.data && res.data.success) {
          setResuls(Array.isArray(res.data.result) ? res.data.results : []);
        } else{
          setResuls([]);
          toast.warn("unexpected Server response while fetching result");
        }
      } catch (error) {
        console.error( 'failed to fecht result:',
          err?.response?.data || err.message || err
        );
        if(!mounted) return;
        if(err?.response?.satus === 401) {
          setError('not authentificate. Please log in to view results.');
          toast.error('not authentificate. Please login');
        } else {
          setError("Could not load result from server.");
          toast.error('could not load result from server');
          setResuls([]);
        } finally{
          if(mounted)
          setLoading(false);
        }
      } 
    };

    fetchtResults(selectedTechnology);
    return() => {
      mounted= false;
    };
    
  }, [apiBase, selectedTechnology, getAuthHeader])  


  return (
    <div>
      <p></p>
    </div>
  );
}

export default MyReslt;
