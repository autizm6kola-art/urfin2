import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRanges } from '../utils/taskUtils';
import ProgressBar from './ProgressBar';
import { getTaskKey } from '../utils/storage';
import BackButton from './BackButton';
import '../styles/menuPage.css';
import { clearAllAnswers } from '../utils/storage';



function MenuPage({ allTasks }) {
  const [ranges, setRanges] = useState([]);
  const [progressByRange, setProgressByRange] = useState({});
  const [totalCorrect, setTotalCorrect] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const generated = generateRanges(allTasks);
    setRanges(generated);
  }, [allTasks]);

  useEffect(() => {
    const progress = {};
    let total = 0;

    ranges.forEach((range, i) => {
      let correct = 0;
      range.taskIds.forEach((id) => {
        if (localStorage.getItem(getTaskKey(id)) === 'true') {
          correct++;
        }
      });

      progress[range.index] = {
        correct,
        total: range.taskIds.length,
        percent: (correct / range.taskIds.length) * 100,
      };

      total += correct;
    });

    setProgressByRange(progress);
    setTotalCorrect(total);
  }, [ranges]);

  if (!ranges.length) return <div>Загрузка меню...</div>;

  return (
  <div className="menu-container">
    
    <BackButton />

    <h1 className="menu-title">УРФИН</h1>

    <ProgressBar correct={totalCorrect} total={allTasks.length} />

    <p className="menu-progress-text">
      Отвечено на {totalCorrect} вопросов из {allTasks.length}
    </p>

    <div className="range-buttons-wrapper">
      {ranges.map((range) => {
        const progress = progressByRange[range.index];
        const label = `${range.taskIds[0]}–${range.taskIds[range.taskIds.length - 1]}`;
        let buttonClass = 'range-button';

        if (progress) {
          if (progress.percent === 100) {
            buttonClass += ' completed';
          } else if (progress.percent > 0) {
            buttonClass += ' partial';
          }
        }

        return (
          <button
            key={range.index}
            onClick={() => navigate(`/tasks/${range.taskIds.join(',')}`)}
            className={buttonClass}
          >
            {label}
          </button>

          
        );
      })}
    </div>

    <button
      className="reset-button"
      onClick={() => {
      clearAllAnswers();
      window.location.reload();
      
      }}
    >
      Сбросить все ответы
    </button>

  </div>
);

}

export default MenuPage;
