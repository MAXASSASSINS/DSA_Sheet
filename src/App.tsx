import { CompletionProvider } from "./CompletionContext";
import HeadingList from "./HeadingList";
import Progress from "./Progress";
import { RevisionProvider } from "./RevisionContext";
import RevisionProblemsToggler from "./RevisionProblemsToggler";
import WeeklyProgress from "./WeeklyProgress";
import { WeeklyProgressProvider } from "./WeeklyProgressContext";

function App() {

  return (
    <WeeklyProgressProvider>

      <RevisionProvider>
        <CompletionProvider>
          <main className="bg-[#292827] text-white px-4">
            <h1 className="text-4xl text-center pt-8 font-bold mb-8">DSA SHEET</h1>
            <div className="grid grid-cols-2 mx-4 gap-4">
              <Progress />
              <WeeklyProgress />
            </div>

            <RevisionProblemsToggler />
            <HeadingList></HeadingList>
          </main>
        </CompletionProvider>
      </RevisionProvider>
    </WeeklyProgressProvider>
  );
}

export default App;
