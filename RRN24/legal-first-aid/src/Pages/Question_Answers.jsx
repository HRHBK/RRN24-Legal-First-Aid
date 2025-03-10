import React from 'react'
import PageLayout from '../Components/PageLayout'
import LegalQA from '../Components/LegalQA'
import './Question_Answers.css'

const Question_Answers = () => {
  return (
    <PageLayout>
      <h1>Question and Answers</h1>
      <LegalQA questions={questions} setQuestions={setQuestions} onSubmitQuestion={handleQuestionSubmit} />
    </PageLayout>
  )
}

export default Question_Answers