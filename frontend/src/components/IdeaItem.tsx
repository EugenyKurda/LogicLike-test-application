import type {Idea} from '../types';

interface IdeaItemProps {
    idea: Idea;
    onVote: (ideaId: number) => void;
    isVoting?: boolean;
}

export const IdeaItem = ({ idea, onVote, isVoting = false }: IdeaItemProps) => {
    const getVoteText = (count: number): string => {
        if (count % 10 === 1 && count % 100 !== 11) return 'голос';
        if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'голоса';
        return 'голосов';
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1 mr-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                        {idea.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {idea.description}
                    </p>
                </div>
                <div className={`flex flex-col items-center justify-center px-5 py-4 rounded-xl min-w-[100px] shadow-lg ${
                    idea.votes_count > 0
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                    <span className="text-2xl mb-1">👍 </span>
                    <span className="text-2xl font-bold">{idea.votes_count}</span>
                    <span className="text-sm font-medium mt-1">{getVoteText(idea.votes_count)}</span>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-inner">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {Boolean(idea.has_voted) && (
                            <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-xl shadow-md">
                                <span className="text-xl">✅</span>
                                <span className="font-semibold">Вы проголосовали</span>
                            </div>
                        )}

                        {!idea.has_voted && (
                            <div className="text-gray-600 text-sm font-medium bg-white px-4 py-2 rounded-lg border border-gray-200">
                                💡 Нажмите чтобы поддержать идею
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => onVote(idea.id)}
                        disabled={idea.has_voted || isVoting}
                        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 min-w-[160px] shadow-lg ${
                            idea.has_voted
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-2 border-gray-300'
                                : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white hover:shadow-2xl transform hover:scale-105 active:scale-95'
                        } ${isVoting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isVoting ? (
                            <span className="flex items-center justify-center gap-3">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Голосую...
                            </span>
                        ) : idea.has_voted ? (
                            <span className="flex items-center justify-center gap-2">
                                <span>🎉</span>
                                Голос учтен
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <span>⚡</span>
                                Поддержать
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};