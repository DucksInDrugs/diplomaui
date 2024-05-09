import { useState } from "react";

const Test = ({tests}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < tests.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

    return (
        <div className="questions">
				{showScore ? (
					<div className='score-section'>
						You scored {score} out of {tests.length}
					</div>
				) : (
					<>
						<div className='question-section'>
							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{tests.length}
							</div>
							<div className='question-text'>{tests[currentQuestion].question}</div>
						</div>
						<div className='answer-section'>
							{tests[currentQuestion].testBody.map((answerOption) => (
								<button className="question-button" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
							))}
						</div>
					</>
				)}
				</div>
    );
}

export default Test;