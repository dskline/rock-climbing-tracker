import { Exercise } from '@/features/exercise-recording/types';

export const EXERCISES: { [key: string]: Exercise<any> } = {
  PUSHUP: {
    // TODO: figure out how to force a list of types here
    type: 'ExerciseWithReps',
    name: "Pushup",
    description:
      "A pushup is a common calisthenic exercise beginning from the prone position. By raising and lowering the body using the arms, pushups exercise pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis, and the midsection.",
    icon: "👊",
  },
  SQUAT: {
    type: 'ExerciseWithReps',
    name: "Squat",
    description:
      "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips and buttocks, quadriceps femoris (vastus medialis, vastus intermedius, vastus lateralis), hamstrings (biceps femoris, semitendinosus, semimembranosus), as well as strengthening the bones, ligaments and insertion of the tendons throughout the lower body.",
    icon: "🏋️‍♀️",
  },
};
