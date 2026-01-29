import React, { useEffect, useRef, useState } from 'react'
import { sidebarStyles } from '../assets/dummyStyles'
import questionData from '../assets/dummydata'
import {axios} from 'axios';
import {toast} from 'react-toastify';
import { BookOpen, Code, Coffee, Cpu, Database, Globe, Layout, Sparkles, Star, Target, Terminal, Zap } from 'lucide-react';

const API_BASE = "http://localhost:4000";

function Sidebar() {

    const [selectedTech, setSelectedTech] = useState(null);
    const [selectedLever, setSelectedLever] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnsers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const submitttedRef = useRef(false);
    const [isSidebareOpen, setIsSidebareOpen] = useState(false);
    const asideRef = useRef(null);


// if the inner widht is greater than 768px then it will call function
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 768) setIsSidebareOpen(true);
            else setIsSidebareOpen(false)
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //if the sidebare is open and inner width is less than 768px then it will collaspse
    useEffect(() => {
        if(window.innerWidth < 768 ) {
            if(isSidebareOpen) document.body.style.overflow = "hidden";
            else document.body.style.owerflow = "";
        } else{
             document.body.style.owerflow = "";
        }
           return() => {
            document.body.style.overflow =""
           };
    }, [isSidebareOpen]);

    //techs and levers
     const technologies = [
    {
      id: "html",
      name: "HTML",
      icon: <Globe size={20} />,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      id: "css",
      name: "CSS",
      icon: <Layout size={20} />,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: "js",
      name: "JavaScript",
      icon: <Code size={20} />,
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      id: "react",
      name: "React",
      icon: <Cpu size={20} />,
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      id: "node",
      name: "Node.js",
      icon: <Code size={20} />,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: <Database size={20} />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      id: "java",
      name: "Java",
      icon: <Coffee size={20} />,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      id: "python",
      name: "Python",
      icon: <Terminal size={20} />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      id: "cpp",
      name: "C++",
      icon: <Code size={20} />,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      id: "bootstrap",
      name: "Bootstrap",
      icon: <Layout size={20} />,
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
  ];

  const levels = [
    {
      id: "basic",
      name: "Basic",
      questions: 20,
      icon: <Star size={16} />,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      questions: 40,
      icon: <Zap size={16} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "advanced",
      name: "Advanced",
      questions: 60,
      icon: <Target size={16} />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  //here this function will handle what you select the tech
  const handleTechSelect = (techId) => {
    if(selectedTech === techId) {
        setSelectedTech(null); //all the initial value are defined here
        setSelectedLever(null);
    } else{
        setSelectedTech(techId);
        setSelectedLever(null);
    }
    setCurrentQuestion(0);
    setUserAnsers({});
    setShowResults(false);
    submitttedRef.current = false;

    if( window.innerWidth < 768) setIsSidebareOpen(true);

    setTimeout(() => {
        const el = asideRef.current?.querrySelector(`[data-tech="${techId}"]`);
        if(el) el.scrollIntoview({behavior: "smooth", block: "center"});
    }, 120);
  };

  const handleLeverlSelect = (leverId) => {
    setSelectedLever(leverId);
    setCurrentQuestion(0);
    setUserAnsers({});
    setShowResults(false);
    submitttedRef.current = false;

    if(window.innerWidth < 768) setIsSidebareOpen(false);
  };

const handleAnswerSelect = (answerIndex) =>{
    const newAnswers = {
        ...userAnswers,
        [currentQuestion]: answerIndex
    };
    setUserAnsers(newAnswers);
    setTimeout(() => {
        if(currentQuestion < getQuestions().lenght - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
        else{
            setShowResults(true);
        }
    }, 500)
}

const getQuestions = () => {
    if(!selectedTech || !selectedLever) return [];
    return questionData[selectedTech]?.[selectedLever] || [];
}

//calulate the score
const calculateScore = () => {
    const questions = getQuestions();
    let correct = 0;
    questions.forEach((question, index) => {
        if(userAnswers[index] === question.correctAnswer) {
            correct++;
        }
    });
    return {
        correct,
        total: questions.length,
        percentage: questions.length ? math.round((correct / questions.length) = 100) : 0,
    };
}

// reset the quiz
const resetQuiz = () => {
  setCurrentQuestion(0);
  setUserAnsers({});
    setShowResults(false);
    submitttedRef.current = false;
}

const questions = getQuestions();
const currentQ = questions[currentQuestion];
const score = calculateScore()

const getPerformanceStatut = () => {
  if(score.percentage >= 90) return{
    text: 'OutStanding!',
    color: 'bg-gradien-to-r from-amber-200 to-amber-300',
    icon: <Sparkles className='text-amber-800'/>
  }
  if(score.percentage >= 75) return{
    text: 'Exellent!',
    color: 'bg-gradien-to-r from-blue-200 to-indigo-200',
    icon: <Sparkles className='text-blue-800'/>
  }
  if(score.percentage >= 60) return{
    text: 'Good job!',
    color: 'bg-gradien-to-r from-green-200 to-teal-200',
    icon: <Sparkles className='text-green-800'/>
  };
  return {
    text: 'keep practicing',
    color:'bg-gradien-to-r from-gray-200 to-gray-300',
    icon:<BookOpen className='text-gray-800' />
  }
}

const performance = getPerformanceStatut();
const toggleSidebar = () => setIsSidebareOpen((prev) => !prev); // toggle sidebar for smaller screen
const getAuthHeader = () => {
  const token = localStorage.getItem('token')  || 
  localStorage.getItem('authToken') || null;
  return token? { Authorization: `Bearer ${token}`} : {};
};

const submitResult = async () => {
  if(submitResult.current) return;
  if(!selectedTech || !selectedLever) return;

  const payload = {
    title:`${selectedTech.toUppercase() + selectedLever.slice(1)} quiz`,
    technologies: selectedTech,
    level: selectedLever,
    totalQuestion: score.total,
    correct: score.correct,
    wrong: score.total - score.correct,
  };

  try {
    submitttedRef.current = true;
    toast.info('saving your results...');
    const res = await axios.post(`${API_BASE}/api/results/`, payload, {
      headers: {
        'Content-Type': 'apllication/json',
        ...getAuthHeader(),
      },
      timeOut: 10000,
    })

    if(res.data && res.data.success) {
      toast.success('Result saved!');
    } else {
      toast.warn('result not saved')
      submitttedRef.current = false;
    }
  } catch (error) {
    submitttedRef.current = false;
    console.error('error saving result:',
      err?.reponse?.data || err.message || err
    );
    toast.error('could not save result. check console or network.');
  }
}

useEffect(() => {
  if(showResults) {
    submitResult();
  }
}, [showResults]);

  return (
    <div className={sidebarStyles.pageContainer}>
      {isSidebareOpen && (
        <div onClick={() => window.innerWidth < 768 && setIsSidebareOpen(false)} className={sidebarStyles.mobileOverlay}></div>
      )}

      <div className={sidebarStyles.mainContainer}>
        <aside className={`${sidebarStyles.sidebar} ${isSidebareOpen ? 'translate-x-0' : 'translate-x-full'}`} ref={asideRef}>
<div className={sidebarStyles.sidebarHeader}></div>
<div className={sidebarStyles.headerDecoration1}></div>
<div className={sidebarStyles.headerDecoration1}></div>

<div className={sidebarStyles.headerContent}>
  <div className={sidebarStyles.logoContainer}>
    <div className={sidebarStyles.logoIcon}>
      <BookOpen className='text-indigo-700' size={28}/>
    </div>

    <div>
      <h1 className={sidebarStyles.logoTitle}>Teck quiz master</h1>
      <p className={sidebarStyles.logoSubtitle}>Test your knowledge & improve skills</p>
    </div>
  </div>
</div>
        </aside>
      </div>
    </div>
  )
}

export default Sidebar
