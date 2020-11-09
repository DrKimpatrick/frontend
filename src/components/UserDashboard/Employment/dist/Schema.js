"use strict";
exports.__esModule = true;
exports.employmentSchema = void 0;
var yup_1 = require("yup");
exports.employmentSchema = yup_1.object().shape({
    companyName: yup_1.string().required('company name is required'),
    supervisor: yup_1.string().required('supervisor is required'),
    title: yup_1.string().required('title is required'),
    startDate: yup_1.string().required('start date is required'),
    skillsUsed: yup_1.array().of(yup_1.string()).optional()
});
