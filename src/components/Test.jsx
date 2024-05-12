import { useState } from "react";
import CompletedTasksService from "../API/CompletedTasksService";
import { userService } from "../API/UserService";

const Test = ({tests, completedTask, user, categoryId, categories}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [previousIsCorrect, setPreviousIsCorrect] = useState(false);

    const handleAnswerOptionClick = (isCorrect) => {
		setPreviousIsCorrect(isCorrect);
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < tests.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
			if(isCorrect && score + 1 === tests.length) {
				saveResult()
			}
		}
	};

	function passAgain() {
		setCurrentQuestion(0);
		setScore(0);
		setShowScore(false);
	}

	function goToPreviousQuestion() {
		if(previousIsCorrect) {
			setScore(score - 1);
		}
		setCurrentQuestion(currentQuestion - 1);
	}

	function saveResult() {
		if(completedTask.status === 404) {
			CompletedTasksService.create({userId: user.id, categoryId: categoryId})
			const progress = user.progress + 1 / categories.length;
			userService.updateProgress(user.id, {progress: progress})
		}
	}

    return (
        <div className="questions">
				{showScore ? (
					<>
					<div className='score-section'>
						Вы набрали {score} из {tests.length}
					</div>
					<button type="button" className="btn btn-link" onClick={() => passAgain()}>
						Пройти заново
					</button>
					</>
				) : (
					<>
						<div className='question-section'>
							<div className='question-count'>
								<span>Вопрос {currentQuestion + 1}</span>/{tests.length}
							</div>
							<div className='question-text'>{tests[currentQuestion].question}</div>
						</div>
						<div className='answer-section'>
							{tests[currentQuestion].testBody.map((answerOption) => (
								<button className="question-button" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
							))}
						</div>
						{currentQuestion > 0 ? 
						<button type="button" className="btn btn-link" onClick={() => goToPreviousQuestion()}>
							Прошлый вопрос
						</button>
						: <></>}
					</>
				)}
				</div>
    );
}

export default Test;