const Question = require("../model/Question.model")
const Topic = require("../model/Topic.model")
const helper = require("../../../Helper/helper")
module.exports.GetAll = async (req, res) => {
    try {
        const { key } = req.query
        // const sampleQuestions = [
        //     {
        //         topic_id: "671d1df5e6b49275331094db",
        //         type : "Single",
        //         question: "What is the capital of France?",
        //         answers: ["Berlin", "Madrid", "Paris", "Rome"],
        //         correct_answers:[2,3,4],
        //         updated_by: "user_01",
        //         position: 1,
        //         status: 1,
        //         updated_at: new Date().toISOString(),
        //         created_by: "user_01",
        //         created_at: new Date().toISOString(),
        //     }
        // ];
        // await Question.insertMany(sampleQuestions);
        const DataQuestion = await Question.find({
            topic_id: key
        })
        return res.json({
            status: true,
            type: "Question",
            error: null,
            data: DataQuestion
        })
    } catch {
        return res.json({
            status: false,
            type: "Question",
            error: 500,
            data: []
        })
    }
}

module.exports.Post = async(req,res)=> {
    await Question.deleteMany()
    const {title,Description,course_id,question} = req.body
    const newtopic = {
        title : title,
        Description : Description, 
        course_id :course_id,
        date : helper.timenow()
    }
    const savetopic = new Topic(newtopic)
    await savetopic.save()
    for(const item of question){
        const newquestion = {
            question : item.question,
            correct_answers : item.correct_answers, 
            answers : item.answers,
            topic_id : savetopic._id
        }
        const saveQuestion = new Question(newquestion)
        await saveQuestion.save()
    }
    return res.json({
        status : true
    })
}