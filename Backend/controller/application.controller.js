import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
        return res.status(400).json({
            message: "Job id npot exist.",
            success: false
        });
    }
    const existJob = await Application.findOne({ job: jobId, applicant: userId });
    if (existJob) {
        return res.status(400).json({
            message: "You have already allplied for this jobs",
            success: false
        });
    }
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(400).json({
            message: "Job not found",
            success: false
        });
    }

    const newJob = await Application.create({
        job: jobId,
        applicant: userId
    });

    job.applications.push(newJob);
    await job.save();
    return res.status(200).json({
        message: "Job applied successfully.",
        success: true
    });
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).populate({
            path: 'job',
            option: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                option: { sort: { createdAt: -1 } }
            }
        })
        if (!application) {
            return res.status(404).json({
                message: "No Application",
                success: false
            });
        }
        return res.status(200).json({ application, success: true });

    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            option: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
                option: { sort: { createdAt: -1 } }
            }
        })
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const applicantionId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({
                message: "Status is requires.",
                success: false
            });
        }
        const applicantion = await Application.findOne({ _id: applicantionId });
        if (!applicantion) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }
        applicantion.status = status.toLowerCase();
        await applicantion.save();
        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}