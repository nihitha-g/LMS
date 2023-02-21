$(document).ready(function() {
    // Get course ID from URL or from another source
    var coursename = "Introduction to Programming";
    // var coursename = localStorage.getItem("selectedCourseIndex")
    
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
        const moduleHtml = `
          <div class="module" onclick="location.href='#'">
            <div class="module-name">${module.module_name}</div>
            <div class="module-buttons">
            <button class="play-button" onclick="showVideo('${module.youtube_link}')">Play Video</button>
            <button class="quiz-button" onclick="showQuiz('${module.quiz.question}')">Take Quiz</button>
            </div>
        

            <div id="video-modal" class="modal">
            <div class="modal-content">
              <span class="close-button" onclick="closeVideo()">&times;</span>
              <div id="video-container"></div>
              <button class="quiz-button" onclick="showQuiz('${module.quiz.question}')">Take Quiz</button>
            </div>
          </div>    

          <div id="quiz-modal" class="modal">
  <div class="modal-content">
    <span class="close-button" onclick="closeQuiz()">&times;</span>
    <div id="quiz-container"></div>
  </div>
</div>

          
            <div class="quiz" id="${module.quiz.question}" style="display": none;"margin-right": 2001px;"height": 3850px;"width": 341px;">
            <div class="quizc"  >
          <h3>Quiz:${module.module_name}</h3>
          <p>${module.quiz.question}</p><br>
          <input type="radio" name="question1" value="1" id="a">
          <label for="a">${module.quiz.Options[0]}</label><br><br>
          <input type="radio" name="question1" value="2" id="b">
          <label for="b">${module.quiz.Options[1]}</label><br><br>
          <input type="radio" name="question1" value="3" id="c">
          <label for="c">${module.quiz.Options[2]}</label><br><br>
          <input type="radio" name="question1" value="4" id="d">
          <label for="d">${module.quiz.Options[3]}</label><br><br>
        
          <button id="submit" class="submit" onclick="checkAnswer('${module.quiz.question}', '${module.quiz.CorrectOption}')">Submit Answer</button>
         
        </div>                      
          </div>        
          </div>             
        `
        $('#course-data').append(moduleHtml);
      }
   
      $('#course-data').append('</section>');
    }
  ;
  }  });

})

document.getElementById("submit").addEventListener("click", function() {
 
  window.location.href = "coursecontent.html";
});

function checkAnswer(quizId, correctAnswer) {
  var quiz = document.getElementById(quizId);
  var selectedAnswer = quiz.querySelector('input[name=question1]:checked').value;
  console.log(selectedAnswer)

  if (selectedAnswer === correctAnswer) {
 
        $.ajax({
      url: 'http://localhost:9999/a/CourseComplete',
      type: 'POST',
      dataType: 'json',

success: function(data) {

}
    })
 
    alert('Correct answer!');

  } else {
    alert('Incorrect answer. Please try again.');
  }
  
  window.location.href="coursecontent.html"
}