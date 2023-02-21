saveAndNext = $("#next")

// saveAndNext.addEventListener("click", nextbtn())
// saveAndNext.addEventListener("click",nextbtn)
saveAndNext.click(nextbtn)
function nextbtn() {
  console.log("hey");
  const qui = [{
    op1: $("#op1").val(),
    op2: $("#op2").val(),
    op3: $("#op3").val(),
    op4: $("#op4").val(),
  }]
  const quizz = {
    question: $("#question").val(),
    Options : qui,
    cor: $("#co").val(),

  }
  const data = {
    module_name: $("#module-name").val(),
    youtube: $("#youtube").val(),
    quiz: quizz,
  };
  var store = JSON.parse(localStorage.getItem("links"));
  store.push(data);
  console.log(data);
  localStorage.setItem("links", JSON.stringify(store));
  $.ajax({
    url: 'instructor_AddCourses.html #modules', // URL of the page that contains the element you want to reload
    success: function(data) {
      $('.modules').html($(data).find('.modules').html()); // Replace the contents of the .modules element with the reloaded contents
    }
  });
  
  // window.location.reload();
  alert("Successfully added module");
}
sectionN = $("#sectionC")
sectionN.click(sName);
function sName(){
  // sname = $("#section-name").val()
  console.log("sdfsd")
}
var Instrutor_Email = window.localStorage.getItem("k")
console.log(Instrutor_Email)
function addCourse() {
  localStorage.clear()
  var courseName = $("#courseName").val();
  console.log(courseName);
  var courseDescription = $("#courseDescription").val();
  
  

  var data = {
    Course_Name: courseName,
    Course_Description: courseDescription,
    Instrutor_Email : Instrutor_Email
    
  };
  localStorage.setItem('courseName', data.Course_Name);
  let dat = JSON.stringify(data);
  $.ajax({
    method: "POST",
    contentType: "application/json",
    data: dat,
    url: "http://localhost:9999/c",
    success: (result) => {
      alert("sucessfully added");
    },
    error: (result) => {
      alert(result);
    },
  });
  localStorage.setItem("links", JSON.stringify([]));
}

function addSection() {
  var course_name = localStorage.getItem('courseName');
  var section_name = $("#section-name").val();
  var sdata = {
    course_name: course_name,
    section_name: section_name,
    modules: localStorage.getItem("links"),
  };
  let sdat = JSON.stringify(sdata);
  console.log("fff",sdata.modules);
  $.ajax({
    method: "POST",
    contentType: "application/json",
    data: sdat,
    url: "http://localhost:9999/quiz/section",
    success: (result) => {
      alert("sucessfully added");
    },
    error: (result) => {
      alert(result);
    },
  });
  localStorage.setItem("links", JSON.stringify([]));
}



// function gen() {
//   store = [];
//   const data = {
//     module_name: $("#module-name").val(),
//     youtube: $("#youtube").val(),
//     question: $("#question").val(),
//     op1: $("#op1").val(),
//     op2: $("#op2").val(),
//     op3: $("#op3").val(),
//     op4: $("#op4").val(),
//     cor: $("#co").val(),
//   };
//   store.append(data);
//   console.log(store);
//   $("#module-name").val(),
//     $("#youtube").val(),
//     $("#question").val(),
//     $("#op1").val(),
//     $("#op2").val(),
//     $("#op3").val(),
//     $("#op4").val(),
//     $("#co").val();
// }