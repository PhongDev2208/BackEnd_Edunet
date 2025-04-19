const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    time:
    {
        start_time: Date,
        end_time: Date,
        startDisplay: String,
        EndDisplay: String,
      
    }
    ,
    status: { type: Boolean, default: 1 },
    course_id: { type: String },
    created_At: String,
    Created_by: String,
    deleted_at: String,
    deleted_by: String,
    updated_at: String,
    updated_By: String
});

const Assignment = mongoose.model('Assignment', AssignmentSchema, "Assignment");
module.exports = Assignment;