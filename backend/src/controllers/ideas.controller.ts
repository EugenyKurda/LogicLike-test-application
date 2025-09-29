import { Request, Response, NextFunction } from 'express';
import { pool } from '../db/connection';
import { CustomError } from '../middleware/error.middleware';

export const getIdeas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientIP = req.clientIP;

        const query = `SELECT i.*,
        COUNT(v.id) as votes_count,
        EXISTS(
          SELECT 1 FROM votes WHERE idea_id = i.id AND ip_address = ?
        ) as has_voted
      FROM ideas i
      LEFT JOIN votes v ON i.id = v.idea_id
      GROUP BY i.id
      ORDER BY votes_count DESC, i.created_at DESC
    `;

        const [rows] = await pool.execute(query, [clientIP]);
        res.json({
            success: true,
            data: rows,
            count: (rows as any).length
        });

    } catch (error) {
        next(error);
    }
};

export const getIdeaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ideaId = parseInt(req.params.id);
        const clientIP = req.clientIP;

        if (isNaN(ideaId)) {
            const error: CustomError = new Error('Invalid idea ID');
            error.statusCode = 400;
            throw error;
        }

        const query = `
            SELECT i.*,
                   COUNT(v.id)                                     as votes_count,
                   EXISTS(SELECT 1
                          FROM votes
                          WHERE idea_id = i.id AND ip_address = ?) as has_voted
            FROM ideas i
                     LEFT JOIN votes v ON i.id = v.idea_id
            WHERE i.id = ?
            GROUP BY i.id
        `;

        const [rows] = await pool.execute(query, [clientIP, ideaId]);
        const ideas = rows as any[];

        if (ideas.length === 0) {
            const error: CustomError = new Error('Idea not found');
            error.statusCode = 404;
            throw error;
        }

        res.json({
            success: true,
            data: ideas[0]
        });

    } catch (error) {
        next(error);
    }
};