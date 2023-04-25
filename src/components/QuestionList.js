import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"


function QuestionList() {
  
  const [questions, setQuestions]=useState([])

  useEffect(()=>{
     fetch("http://localhost:4000/questions")
     .then((r)=>r.json())
     .then((questions)=>{
      setQuestions( questions)})
 
  }, [])

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",

    })
    .then((r)=>r.json())
    .then(()=>{
      const updatedQuestions =questions.filter((q)=> q.id !==id)
      setQuestions(updatedQuestions)
      
    })
  }

  function handleAnswer(id, correctIndex){
    fetch(` http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers:{
        "content-Type":"Application/json",
      },
      body: JSON.stringify({correctIndex}),
    })
    .then((r)=>r.json())
    .then((updatedQuiz)=>{
      const updatedQuestions=questions.map((quiz)=>{
        if(quiz.id===updatedQuiz.id) return updatedQuiz
        return quiz
      })
      setQuestions(updatedQuestions)

    })

  }


  const questionItems= questions.map((quiz)=>{
    <QuestionItem
    key={quiz.id}
    question={quiz}
    onDeleteClick={handleDeleteClick}
    onanswerChange={handleAnswer}
    
    />
    
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        
          {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
