import { useState, useEffect } from 'react';
import type {Idea} from '../types';
import { api } from '../api';

export const useIdeas = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchIdeas = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.getIdeas();
            setIdeas(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const voteForIdea = async (ideaId: number) => {
        try {
            await api.voteForIdea(ideaId);
            await fetchIdeas();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to vote');
        }
    };

    useEffect(() => {
        fetchIdeas();
    }, []);

    return { ideas, loading, error, voteForIdea, refetch: fetchIdeas };
};