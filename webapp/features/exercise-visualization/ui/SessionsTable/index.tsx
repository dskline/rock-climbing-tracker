import { Exercise, Session } from '@/features/exercise-recording/types'

type Props = {
  sessions: Session[];
}
export const SessionsTable = ({ sessions }: Props) => {
  return (
    <div>
      {!sessions && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {sessions && (
        <table>
          <thead>
          <tr>
            <th>Session Date</th>
            <th>Total Reps</th>
          </tr>
          </thead>
          <tbody>
          {sessions.map((session) => (
            <tr key={session.start_time}>
              <td>{session.start_time}</td>
              <td>
                {session.session_exercises
                  ? calculateTotalReps(session.session_exercises)
                  : 0}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function calculateTotalReps(exercises: Array<Exercise<any>>) {
  let total = 0;
  for (const exercise of exercises) {
    if (exercise.data.reps) {
      total += exercise.data.reps;
    }
  }
  return total;
}
