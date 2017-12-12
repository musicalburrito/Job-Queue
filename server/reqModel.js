/**
 * Created by nancyli on 12/8/17.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('msg', {
    jobid: {type: String},
    htmlmsg : {type: String},
    jobstatus : {type: String}
});