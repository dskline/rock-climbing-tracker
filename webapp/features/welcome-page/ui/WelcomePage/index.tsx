import { NavBar } from "@/features/components/NavBar";
import { Calendar } from "@/features/welcome-page/ui/Calendar";
import { ExerciseList } from "@/features/welcome-page/ui/ExerciseList";


export const WelcomePage = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
        <ExerciseList />
        </div>
        <div className="w-1/2">
        <Calendar />
        </div>
      </div>
    </div>
  );
};
