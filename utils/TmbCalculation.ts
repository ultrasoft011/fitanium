export function TmbCalculation(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}
