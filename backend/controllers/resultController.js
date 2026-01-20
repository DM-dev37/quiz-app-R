import mongoose from "mongoose";
import Result from "../models/resultModel.js";

export async function createResult(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message:'Not authorized'
            })
        }

        const {title, technology, level, totalQuestion, correct, wrong} = req.body;
        if(!technology || !level || totalQuestion === undefined || correct === undefined){
            return res.status(400).json({
                success: false,
                message: 'Missing fields'
            })
        }

        //computer weong is not provider
          const computedWrong = wrong !== undefined ? Number(wrong) : Math.max(0, Number(totalQuestion) - Number(correct));
          if(!title) {
            return res.status(400).json({
                success: false,
                message: 'Missing title'
            });
          }

            const payload = {
            title: String(title).trim(),
            technology,
            level,
            totalQuestions: Number(totalQuestion),
            correct: Number(correct),
            wrong: computedWrong,
            user: req.user.id
            };

            const created = await Result.create(payload);
            return res.status(201).json({
                success: true,
                message: 'Result created',
                Result: created
            })
    } catch (error) {
        console.error('CreateResult Error', error)
        return res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}


//LIST THE RESULT

export async function listResults(res, req) {
try {
    if(!req.user || !res.user.id) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        })
    }

    const {technology} = req.query;

    const query = {user: req.user.id};
    if(technology && technology.tolowercase() !== 'all') {
        query.technology = technology;
    }

    const items = await Result.find(query).sort({createdAt: -1}).lean();
    return res.json({
        success: true,
        result: items
    })
} catch (error) {
     console.error('listResults Error', error)
        return res.status(500).json({
            success: false,
            message: 'server error'
        })
}
}