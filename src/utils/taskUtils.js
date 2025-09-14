// // src/utils/taskUtils.js

// export function generateRanges(tasks, rangeSize = 6) {
//   const sorted = [...tasks].sort((a, b) => a.id - b.id);
//   const ranges = [];

//   for (let i = 0; i < sorted.length; i += rangeSize) {
//     const chunk = sorted.slice(i, i + rangeSize);
//     if (chunk.length > 0) {
//       ranges.push({
//         start: chunk[0].id,
//         end: chunk[chunk.length - 1].id,
//       });
//     }
//   }

//   return ranges;
// }

// utils/taskUtils.js

export function generateRanges(tasks, rangeSize = 10) {
  const sorted = [...tasks].sort((a, b) => Number(a.id) - Number(b.id));
  const ranges = [];

  for (let i = 0; i < sorted.length; i += rangeSize) {
    const chunk = sorted.slice(i, i + rangeSize);
    if (chunk.length > 0) {
      // Вместо id — просто берём диапазон по позиции
      ranges.push({
        index: ranges.length, // просто порядковый номер
        taskIds: chunk.map(t => t.id), // сохраняем id задач
      });
    }
  }

  return ranges;
}
