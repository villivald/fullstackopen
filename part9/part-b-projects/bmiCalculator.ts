const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  let result: string;

  if (bmi < 15) {
    result = "Very severely underweight";
  } else if (bmi < 16) {
    result = "Severely underweight";
  } else if (bmi < 18.5) {
    result = "Underweight";
  } else if (bmi < 25) {
    result = "Normal (healthy weight)";
  } else if (bmi < 30) {
    result = "Overweight";
  } else if (bmi < 35) {
    result = "Obese Class I (Moderately obese)";
  } else if (bmi < 40) {
    result = "Obese Class II (Severely obese)";
  } else {
    result = "Obese Class III (Very severely obese)";
  }

  return result;
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
