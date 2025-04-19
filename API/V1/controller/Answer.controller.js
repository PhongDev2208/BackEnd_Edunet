const Answers = require("../model/Answers.model")
const Question = require("../model/Question.model")
module.exports.GetAll = async (req, res) => {
        const {key} = req.query
        const DataAnswers = await Answers.find({
            topic_id : key,
            userid_id : res.locals.user_id
        }).select("-answers")
        return res.json({
            status: true,
            type: "Answers",
            error: null,
            data: DataAnswers
        })
   
}  

module.exports.Detail = async (req,res) => {
    try {
        const {key} = req.query
    const DataAnswers = await Answers.findOne({
        _id : key
    }).select("answers").lean()
    const DataCustom = await Promise.all(DataAnswers.answers.map(async(item) => {
          const Newdata = await Question.findOne({
            _id : item.Question_id
          }).lean()

          Newdata.answersuser = item.results
          return Newdata
    }))
    return res.json({
        status: true,
        type: "Answers",
        error: null,
        data: DataCustom
    })
    } catch  {
        return res.json({
            status: false,
            type: "Answers",
            error: 500,
            data: []
        })
    }
}
 
module.exports.Post = async (req, res) => {
    try {
        const {answers,topic_id} = req.body;
        const Data = {
            userid_id : res.locals.user_id,
            answers  : answers,
            topic_id : topic_id,
            date : Date.now()
        }
        const newdata = Answers(Data)
        await newdata.save()
        return res.json({
            status: true,
            type: "Answers",
            error: null,
            data: newdata._id
        })
    } catch {
        return res.json({
            status: false,
            type: "Answers",
            error: 500,
            data: []
        })
    }
}