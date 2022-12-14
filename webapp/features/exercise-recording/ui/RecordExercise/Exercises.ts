import { ExerciseMetadata } from '@/features/exercise-recording/types'

export const EXERCISES: { [key: string]: ExerciseMetadata } = {
  PUSHUP: {
    id: 'PUSHUP',
    name: "Pushup",
    description:
      "A pushup is a common calisthenic exercise beginning from the prone position. By raising and lowering the body using the arms, pushups exercise pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis, and the midsection.",
    icon: "👊",
  },
  SQUAT: {
    id: 'SQUAT',
    name: "Squat",
    description:
      "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips and buttocks, quadriceps femoris (vastus medialis, vastus intermedius, vastus lateralis), hamstrings (biceps femoris, semitendinosus, semimembranosus), as well as strengthening the bones, ligaments and insertion of the tendons throughout the lower body.",
    icon: "🏋️‍♀️",
  },
  BENCH_PRESS: {
    id: 'BENCH_PRESS',
    name: "Bench Press",
    description:
      "The bench press is a strength training exercise that consists of pressing a weight upwards from a supine position. The exercise works the pectoralis major, anterior deltoids, and triceps brachii, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis, and the midsection.",
    icon: "🏋️‍♀️",
  }
};
