import { useEffect, useState } from 'react'

import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);  



  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);


  // Load JSON Data
  useEffect(() => {
    fetch('quiz.json')
    .then(res => res.json())
    .then(data => setQuizs(data))
  }, [])


  // Set Single Question
  useEffect(() => {
    if(quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex])
    }
  }, [quizs, questionIndex])

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }

  // Check Answer
  const checkAnswer = (event, selected) => {
    if(!selectedAnswer) {
      setCorrectAnswer(question.answer)
      setSelectedAnswer(selected)

      if(selected === question.answer) {
        event.target.classList.add('bg-success')
        setMarks(marks + 1)
      } else {
        event.target.classList.add('bg-danger')
      }
    }
  }

  // Next Question
  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1)
    setSelectedAnswer('')
    setCorrectAnswer('')
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger')
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  }

  // Show Result 
  const showTheResult = () => {
    setShowResult(true)
    setShowStart(false)
    setShowQuiz(false)
  }

  // Start Over
  const startOver = () => {
    setQuestion({})
    setQuestionIndex(0)
    setCorrectAnswer('')
    setSelectedAnswer('')
    setMarks(0)

    setShowQuiz(true)
    setShowResult(false)

    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger')
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  }

  

  return (
    <>
      {/* Welcome Page */}
      <Start 
        startQuiz={startQuiz}
        showStart={showStart}
      />

      {/* Quiz Page */}
      <Quiz 
        showQuiz={showQuiz}
        question={question}
        quizs={quizs}
        checkAnswer={checkAnswer}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        questionIndex={questionIndex}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
      />

      {/* Result Page */}
      <Result 
        showResult = {showResult} 
        quizs = {quizs} 
        marks = {marks}
        startOver = {startOver}
      />
    </>
  )
}

export default App
