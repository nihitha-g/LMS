const moduleCTRl = require("../models/section");
const courseCTRL = require("../models/courses");
const quizCTRl = require("../models/quize");
// const { application } = require('express')


async function getCourse(req,res){
  console.log("hi")
  // const courseName = req.body.course_name;
  try{
  let data=await courseCTRL.Course.find()
    .populate({
      path: "sections",
      populate: {

        path: "modules.quiz",
        model: "Quiz",
      },
    })
    res.send(data);
}
catch (e) {
    console.log(e);
}

}
// async function get(req, res) {
//   console.log("hi")
//   // const courseName = req.body.course_name;
//   try{
//   let data=await courseCTRL.Course.find()
//     .populate({
//       path: "sections",
//       populate: {

//         path: "modules.quiz",
//         model: "Quiz",
//       },
//     })
//     res.send(data);
// }
// catch (e) {
//     console.log(e);
// }
//     // .exec((err, data) => {
//     //   if (err) {
//     //     res.status(500).send(err);
//     //   } else {
//     //     res.send(data);
//     //   }
//     // });
// }
async function getSection(req, res) {
  const courseName = req.params.course_name;
  try{
  let data=await courseCTRL.Course.findOne({ course_name: courseName })
    .populate({
      path: "sections",
      populate: {

        path: "modules.quiz",
        model: "Quiz",
      },
    })
    res.send(data);
}
catch (e) {
    console.log(e);
}
    // .exec((err, data) => {
    //   if (err) {
    //     res.status(500).send(err);
    //   } else {
    //     res.send(data);
    //   }
    // });
}

async function getInsCourse(req,res){
   const insName = req.params.Instrutor_Email;
  try{
  let data=await courseCTRL.Course.findOne({Instrutor_Email : insName })
    .populate({
      path: "sections",
      populate: {

        path: "modules.quiz",
        model: "Quiz",
      },
    })
    res.send(data);
}
catch (e) {
    console.log(e);
}
    // .exec((err, data) => {
    //   if (err) {
    //     res.status(500).send(err);
    //   } else {
    //     res.send(data);
    //   }
    // });



}


async function addSection(req, res) {
  console.log("its the body",req.body);
  let addSectionName = moduleCTRl.Section({
    section_name: req.body.section_name,
    modules: [],
  });
  let add_section = await addSectionName.save();
  let section_id = await moduleCTRl.Section.findOne(
    { section_name: req.body.section_name },
    { _id: 1 }
  );
  console.log("hii",section_id)
  let add_section_course = await courseCTRL.Course.updateOne(
    { course_name: req.body.course_name },
    { $push: { sections: section_id } }
  );
  console.log(add_section_course)
  p = JSON.parse(req.body.modules)
  console.log(p[0].quiz.Options)

  for (var i = 0; i < p.length; i++) {
    currentModule = {}; //for current module
    options = [p[i].quiz.Options[0].op1,p[i].quiz.Options[0].op2,p[i].quiz.Options[0].op3,p[i].quiz.Options[0].op4]//for options array
    currentQuiz = {}//contains current quiz
    currentModule["module_name"] = p[i].module_name;
    currentModule["youtube_link"] = p[i].youtube;
    currentQuiz['question'] = p[i].quiz.question
    currentQuiz["Options"] = options
    currentQuiz["CorrectOption"] = p[i].quiz.cor
     // for current quiz
     console.log("sds",currentQuiz.Options)
    // currentModule["CorrectOption"] = p[i].CorrectOption
    let addQuiz = quizCTRl.Quiz(currentQuiz);
    let saved_quiz = await addQuiz.save();
    console.log(".............",i,"--------------------------------")
    console.log("begin", saved_quiz);
    console.log("id of quiz", saved_quiz._id);
    console.log("question",p[i].quiz.question)
    // let found_quiz = await quizCTRl.Quiz.findOne(
    //   { question: p[i].quiz.question },
    //   { _id: 1 }
    // );
    // console.log("hii", found_quiz);
    currentModule["quiz"] = saved_quiz._id;
    // let current_section= await moduleCTRl.Section.findOne({section_name: req.body.section_name})
    let add_update = await moduleCTRl.Section.updateOne( 
      { section_name: req.body.section_name },
      { $push: { modules: currentModule } }
    );
  }
  res.send("worked");
}

module.exports = { addSection, getSection,getCourse,getInsCourse };

// function addModule(req, res){
//     for(var i in p){
//         currentModule = p[i].
//     }
// }
