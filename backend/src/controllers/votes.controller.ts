import { Request, Response, NextFunction } from 'express';
import { pool } from '../db/connection';
import { CustomError } from '../middleware/error.middleware';

export const voteForIdea = async (req: Request, res: Response, next: NextFunction) => {
    const connection = await pool.getConnection();

    try {
        const ideaId = parseInt(req.params.id);
        const clientIP = req.clientIP;

        if (isNaN(ideaId)) {
            const error: CustomError = new Error('Invalid idea ID');
            error.statusCode = 400;
            throw error;
        }

        await connection.beginTransaction();

        const [ideaRows] = await connection.execute(
            'SELECT id FROM ideas WHERE id = ?',
            [ideaId]
        );

        if ((ideaRows as any).length === 0) {
            await connection.rollback();
            const error: CustomError = new Error('Idea not found');
            error.statusCode = 404;
            throw error;
        }

        const [existingVote] = await connection.execute(
            'SELECT id FROM votes WHERE idea_id = ? AND ip_address = ?',
            [ideaId, clientIP]
        );

        if ((existingVote as any).length > 0) {
            await connection.rollback();
            const error: CustomError = new Error('You have already voted for this idea');
            error.statusCode = 409;
            throw error;
        }

        const [voteCountRows] = await connection.execute(
            'SELECT COUNT(*) as count FROM votes WHERE ip_address = ?',
            [clientIP]
        );

        const voteCount = (voteCountRows as any)[0].count;
        if (voteCount >= 10) {
            await connection.rollback();
            const error: CustomError = new Error('Vote limit exceeded (10 votes per IP)');
            error.statusCode = 409;
            throw error;
        }

        await connection.execute(
            'INSERT INTO votes (idea_id, ip_address) VALUES (?, ?)',
            [ideaId, clientIP]
        );

        await connection.commit();

        res.status(201).json({
            success: true,
            message: 'Vote added successfully',
            data: {
                votes_count: voteCount + 1
            }
        });

    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
};

export const getUserVotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientIP = req.clientIP;

        const [votes] = await pool.execute(
            'SELECT idea_id, created_at FROM votes WHERE ip_address = ? ORDER BY created_at DESC',
            [clientIP]
        );

        const [countRows] = await pool.execute(
            'SELECT COUNT(*) as count FROM votes WHERE ip_address = ?',
            [clientIP]
        );

        const voteCount = (countRows as any)[0].count;

        res.json({
            success: true,
            data: {
                votes: votes,
                total_votes: voteCount,
                remaining_votes: 10 - voteCount
            }
        });

    } catch (error) {
        next(error);
    }
};