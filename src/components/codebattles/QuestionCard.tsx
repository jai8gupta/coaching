const QuestionCard = ({
    question,
    index,
    selected,
    onSelect,
  }: {
    question: any;
    index: number;
    selected: number | undefined;
    onSelect: (optionIndex: number) => void;
  }) => {
    return (
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-lg text-black  dark:text-white font-semibold mb-4">
          {index + 1}. {question.question_text}
        </h2>
  
        <div className="space-y-3">
          {question.options.map((option: string, i: number) => (            
            <button
              key={i}
              onClick={() => {  
                  onSelect(i)}
              }
              className={`block w-full text-left px-4 py-2 rounded-md border transition-all
                  ${
                    selected === i
                      ? "bg-red-500 dark:bg-blue-600 text-black  dark:text-white border-blue-500"
                      : "bg-background text-black dark:text-white border-border hover:bg-red-200 dark:hover:bg-blue-950 hover:border-blue-400"
                  }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default QuestionCard;