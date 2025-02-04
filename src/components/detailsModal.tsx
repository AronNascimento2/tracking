import { useState, useEffect } from "react"
import { formatarDataParaBR } from "@/utils/formatData"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Steps, TrackingResult } from "@/models"
import { VerticalLinearStepper } from "./verticalStepper"

interface Props {
    steps: Steps
    trackingResult: TrackingResult
}

export const DetailsModal = ({ steps, trackingResult }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isOpen])

    return (
        <div className="relative">
            <button
                onClick={toggleModal}
                className="w-[200px] rounded-none  bg-[#1230da] py-2 text-white hover:text-white lg:w-[500px]"
            >
                Rastreio detalhado
            </button>

            <div
                className={`fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50 transition-opacity duration-300 ${
                    isOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
                onClick={toggleModal}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out sm:max-w-lg lg:w-full ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-end">
                        <button
                            onClick={toggleModal}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex w-full items-center justify-center py-8">
                        <p className="text-lg font-bold lg:text-[17px]">
                            Rastreio detalhado
                        </p>
                    </div>
                    <VerticalLinearStepper steps={steps} />
                    <div className="mt-8 border-t-[1px] py-4 text-[10px] leading-[20px]">
                        {trackingResult?.detalhes?.previsao && (
                            <p className="text-[12px] text-blue-500">
                                <span className="font-semibold">
                                    {" "}
                                    Previsão de entrega :{" "}
                                </span>
                                {trackingResult?.detalhes?.dataEntrega}
                            </p>
                        )}
                        {trackingResult?.detalhes?.recebedor && (
                            <p>
                                <span className="font-semibold">
                                    {" "}
                                    Recebido por:{" "}
                                </span>
                                {trackingResult?.detalhes?.recebedor}
                            </p>
                        )}

                        <p>
                            <span className="font-semibold"> Remetente: </span>
                            {trackingResult?.detalhes?.remetente}
                        </p>
                        <p>
                            <span className="font-semibold">
                                {" "}
                                Destinatário:{" "}
                            </span>
                            {trackingResult?.detalhes?.destinatario}
                        </p>
                        {trackingResult?.detalhes?.anexos && (
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">
                                    Comprovante :
                                </span>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger className="font-bold text-blue-500">
                                        clique aqui
                                    </DialogTrigger>
                                    <DialogContent
                                        aria-describedby={undefined}
                                        className="flex h-auto max-w-5xl flex-col items-center gap-4 p-6"
                                    >
                                        <VisuallyHidden>
                                            <DialogTitle />
                                        </VisuallyHidden>

                                        <div className="flex h-auto w-auto flex-1 items-center justify-center overflow-auto pt-10">
                                            <img
                                                src={
                                                    trackingResult?.detalhes
                                                        ?.anexos
                                                }
                                                alt="Comprovante"
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                        <div className="flex w-full gap-2">
                            <div className="">
                                <button onClick={() => setOpen(!open)}>
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold">
                                            Nota fiscal :
                                        </span>
                                    </div>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {trackingResult?.detalhes?.notas.map(
                                    (nota: string) => (
                                        <div
                                            key={nota}
                                            className="flex w-auto items-center justify-center text-black"
                                        >
                                            <p>{nota}</p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                        {trackingResult?.detalhes?.ocorrencias.length > 0 && (
                            <>
                                <div className="w-full">
                                    <div className="flex items-center">
                                        <span className="font-semibold">
                                            Detalhes do rastreio:
                                        </span>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full overflow-auto">
                                    <div className="flex flex-col items-start">
                                        {trackingResult?.detalhes?.ocorrencias?.map(
                                            (ocorrencia, index) => (
                                                <div
                                                    key={`${ocorrencia?.descricao}-${index}`}
                                                    className="flex w-auto items-center justify-center gap-2 text-[9px]"
                                                >
                                                    <p>
                                                        {formatarDataParaBR(
                                                            ocorrencia?.data,
                                                        )}
                                                    </p>

                                                    <p className="">
                                                        {ocorrencia?.descricao}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
