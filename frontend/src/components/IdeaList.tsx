import { useState } from 'react';
import { useIdeas } from '../hooks/useIdeas';
import { IdeaItem } from './IdeaItem';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

export const IdeaList = () => {
    const { ideas, loading, error, voteForIdea, refetch } = useIdeas();
    const [votingId, setVotingId] = useState<number | null>(null);

    const handleVote = async (ideaId: number) => {
        setVotingId(ideaId);
        try {
            await voteForIdea(ideaId);
        } finally {
            setVotingId(null);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={refetch} />;

    return (
        <div className="space-y-4">
            {ideas.map(idea => (
                <IdeaItem
                    key={idea.id}
                    idea={idea}
                    onVote={handleVote}
                    isVoting={votingId === idea.id}
                />
            ))}
        </div>
    );
};