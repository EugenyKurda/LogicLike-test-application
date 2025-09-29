import { IdeaList } from './components/IdeaList';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Идеи для развития LogicLike
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Голосуйте за самые интересные идеи! С одного IP-адреса можно отдать
                            не более 10 голосов за разные идеи.
                        </p>
                    </header>

                    <main className="flex justify-center">
                        <div className="w-full max-w-3xl">
                            <IdeaList />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;