interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const target = 2;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const rating = average > target ? 3 : average === target ? 2 : 1;
  const ratingDescription =
    average > target
      ? "Great work! You've overcome the goal!"
      : average === target
      ? "Well done. The goal is reached."
      : "Not bad, but you can do better.";
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
