import type {Idea} from "../types";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
    getIdeas: async (): Promise<Idea[]> => {
        const response = await fetch(`${API_BASE}/ideas`);
        if (!response.ok) throw new Error('Failed to fetch ideas');
        const data = await response.json();
        return data.data || data;
    },

    voteForIdea: async (ideaId: number): Promise<void> => {
        const response = await fetch(`${API_BASE}/ideas/${ideaId}/vote`, {
            method: 'POST',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to vote');
        }
    },
};