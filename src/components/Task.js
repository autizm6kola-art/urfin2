// // import React, { useEffect } from "react";
// // import '../styles/taskItem.css';

// // function Task({ task, onCorrect, alreadyCorrect }) {
// //   const [answer, setAnswer] = React.useState('');
// //   const [isCorrect, setIsCorrect] = React.useState(null);

// //   useEffect(() => {
// //     if (alreadyCorrect) {
// //       setIsCorrect(true);
// //     }
// //   }, [alreadyCorrect]);

// //   const handleChange = (e) => {
// //     setAnswer(e.target.value);
// //     setIsCorrect(null);
// //   };

// //   const checkAnswer = () => {
// //     if (answer.trim().toLowerCase() === task.correctAnswer.toLowerCase()) {
// //       if (!isCorrect) {
// //         setIsCorrect(true);
// //         onCorrect(task.id);
// //       }
// //     } else {
// //       setIsCorrect(false);
// //     }
// //   };

// //   return (
// //     <div className="task-item" style={{ marginBottom: '20px' }}>
// //       <p><strong>Задача {task.id}</strong></p>
// //       <p>{task.text}</p>

// //       <input
// //         type="text"
// //         value={answer}
// //         onChange={handleChange}
// //         placeholder="Введите ответ"
// //         disabled={isCorrect === true}
// //         className={
// //           isCorrect === null ? '' : isCorrect ? 'correct' : 'incorrect'
// //         }
// //       />

// //       <button
// //         onClick={checkAnswer}
// //         disabled={isCorrect === true}
// //         className="check-button"
// //       >
// //         Проверить
// //       </button>
// //     </div>
// //   );
// // }

// // export default Task;


import React, { useEffect, useState } from "react";
import '../styles/taskItem.css';

function Task({ task, onCorrect, alreadyCorrect }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (alreadyCorrect) {
      setIsCorrect(true);
    }
  }, [alreadyCorrect]);

  useEffect(() => {
  if (alreadyCorrect) {
    setIsCorrect(true);
    setSelectedAnswer(task.correctAnswer); // нужно для раскраски нужной кнопки
  }
}, [alreadyCorrect]);


  const handleAnswer = (answer) => {
    if (isCorrect !== null) return; // уже ответил

    const correct = answer === task.correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);

    if (correct) {
      onCorrect(task.id);
    }
  };

  return (
    <div className="task-item">
      <p><strong> {task.id}</strong></p>

      {task.audio && (
        <audio controls src={task.audio} style={{ marginBottom: '10px' }} />
      )}

      <p>{task.text}</p>

      <div className="answer-buttons">
  <button
    onClick={() => handleAnswer(true)}
    disabled={isCorrect !== null}
    className={`answer-button ${
      selectedAnswer === true
        ? isCorrect ? 'correct' : 'incorrect'
        : ''
    }`}
  >
    Верно
  </button>

  <button
    onClick={() => handleAnswer(false)}
    disabled={isCorrect !== null}
    className={`answer-button ${
      selectedAnswer === false
        ? isCorrect ? 'correct' : 'incorrect'
        : ''
    }`}
  >
    Неверно
  </button>
</div>

    </div>
  );
}

export default Task;


