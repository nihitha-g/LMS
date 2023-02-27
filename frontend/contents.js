$(document).ready(function() {
    // Get course ID from URL or from another source
    // var coursename = "Introduction to Programming";
    var coursename = localStorage.getItem("selectedCourseIndex")
    
    // Make AJAX request to retrieve course data
    $.ajax({
      url: 'http://localhost:9999/' + coursename,
      type: 'POST',
      dataType: 'json',
      success: function(data) {
        console.log("hi")
         console.log(data)
       var courseData = data;
        // Populate course data in HTML elements
           // Uspdate the course data container with the course name and description
           
    $('#course-data').append(`<h1>${courseData.course_name}</h1>`);
    $('#course-data').append(`<p>${courseData.course_description}</p>`);
   

    $('#course-data').append(`<p>INSTRUCTOR EMAIL : ${courseData.Instrutor_Email}</p>`);
    console.log(courseData.sections)
    // Loop through the sections and modules to add them to the HTML
    for (const section of courseData.sections) {
      const sectionHtml = `
        <section class="section">
          <div class="section-header">
            <h2>${section.section_name}</h2>
          </div>
      `
      $('#course-data').append(sectionHtml);
    

      for (const module of section.modules) {
        let moduleHtml = `
          <div class="module" onclick="location.href='#'">
            <div class="module-name">${module.module_name}</div>
            <div class="module-buttons">
              <button class="play-button" onclick="showVideo('${module.youtube_link}')">Play Video</button>
              <button class="quiz-button" onclick="showQuiz('${module.module_name}')">Take Quiz</button>
            </div>
        
            <div id="video-modal" class="modal">
              <div class="modal-content">
                <span class="close-button" onclick="closeVideo()">&times;</span>
                <div id="video-container"></div>
                <button class="quiz-button" onclick="showQuiz('${module.module_name}')">Take Quiz</button>
              </div>
            </div>    
        
            <div id="quiz-modal" class="modal">
              <div class="modal-content">
                <span class="close-button" onclick="closeQuiz()">&times;</span>
                <div id="quiz-container"></div>
              </div>
            </div>
        
            <div class="quiz" id="${module.module_name}" style="display: none; margin-right: 2001px; height: 3850px; width: 341px;">
              <div class="quizc">
                <h3>Quiz: ${module.module_name}</h3>
        `
        for (let i = 0; i < module.quiz[0].quize.length; i++) {
          moduleHtml += `
            <div class="quiz-question" id="quiz-question-${i}" style="display: ${i === 0 ? 'block' : 'none'};">
              <h4>Question ${i+1}: ${module.quiz[0].quize[i].question}</h4>
              <div class="quiz-options">
                <input type="radio" name="question${i+1}" value="1" id="${i+1}a">
                <label for="${i+1}a">${module.quiz[0].quize[i].Options[0]}</label><br>
                <input type="radio" name="question${i+1}" value="2" id="${i+1}b">
                <label for="${i+1}b">${module.quiz[0].quize[i].Options[1]}</label><br>
                <input type="radio" name="question${i+1}" value="3" id="${i+1}c">
                <label for="${i+1}c">${module.quiz[0].quize[i].Options[2]}</label><br>
                <input type="radio" name="question${i+1}" value="4" id="${i+1}d">
                <label for="${i+1}d">${module.quiz[0].quize[i].Options[3]}</label><br>
                <button id="close-button" class="close-button" onclick="closeQuiz('${module.module_name}')">Close</button>
              </div>
              <div class="quiz-buttons">
              
                ${i > 0 ? `<button class="prev-button" onclick="showQuizQuestion('${module.module_name}', ${i-1})">Previous</button>` : ''}
                ${i < module.quiz[0].quize.length-1 ? `<button class="next-button" onclick="showQuizQuestion('${module.module_name}', ${i+1})">Next</button>` : ''}
                ${i === module.quiz[0].quize.length-1 ? `<button class="submit-button" id="submit" onclick="submitQuiz('${module.module_name}','${module.quiz[0].quize[i].CorrectOption}')">Submit</button>` : ''}
               
              </div>
            </div>
          `;
        }
        console.log(${module.quiz[0].quize[i].CorrectOption})
        
        moduleHtml += `
          </div>
         
       
        </div>
        `;
         
        
        
        $('#course-data').append(moduleHtml);
      }
   
      $('#course-data').append('</section>');
    }
  ;
  }  });

})

// document.getElementById("submit").addEventListener("click", function() {
 
//   window.location.href = "coursecontent.html";
// });
// Step 1
var totalQuestions = 0;
var correctAnswers = 0;

function submitQuiz(quizId,correctAnswer) {
  var quiz = document.getElementById(quizId);
  var selectedAnswer = quiz.querySelector('input[name="question"]:checked').value;

  // Step 2
  if (selectedAnswer === correctAnswer) {
    correctAnswers++;
  }
}

document.getElementById("submit").addEventListener("click", function() {
  // Step 3
  var questions = document.querySelectorAll('.quiz-question');
  totalQuestions = questions.length;
  questions.forEach(function(question) {
    checkAnswer(question.id, question.dataset.answer);
  });

  // Step 4
  alert(`You got ${correctAnswers} out of ${totalQuestions} correct!`);
  window.location.href = "coursecontent.html";
});


// function checkAnswer(quizId, correctAnswer ,course_name,module) {
//   var quiz = document.getElementById(quizId);
//   var selectedAnswer = quiz.querySelector('input[name=question1]:checked').value;
//   console.log(selectedAnswer)

// update={
//   email:localStorage.getItem('k'),
//   course_name:course_name,
//   module:module,
// }
// console.log(update)
//   if (selectedAnswer === correctAnswer) {
//  update =JSON.stringify(update)
//         $.ajax({
//       url: 'http://localhost:9999/a/CourseComplete',
//       type: 'POST',
//       contentType: 'application/json',
//       data:update,
// success: function(data) {
//   console.log(data);
// },error: function(err) {
// alert(err);   }})
 
//     alert('Correct answer!');

//   } else {
//     alert('Incorrect answer. Please try again.');
//   }
  
//   window.location.href="coursecontent.html"
// }

