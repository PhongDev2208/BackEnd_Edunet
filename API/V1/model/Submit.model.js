const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({

  assignment_id: {
    type: String,
  },
  user_id: {
    type: String,

  },
  file_path: {
    type: String,
    default : null
  },
  submitted_at: {
    type: String
    },
  content: {
    type: String,
  },
});
const Submission = mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
