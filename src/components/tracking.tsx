import { Button } from "./ui/button"
import { Input } from "./ui/input"

import { ResultTracking } from "./resultTracking"
import { useState } from "react"
import { BarLoader } from "react-spinners"
import { fetchTrackingData } from "./serviceTracking"

export const Tracking: React.FC = () => {
    const [nf, setNf] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [track, setTrack] = useState(false)
    const [trackingResult, setTrackingResult] = useState<any | null>(null)

    const [loading, setLoading] = useState(false)

    const handleTracking = async () => {
        if (!nf) {
            setError("O código de rastreio não pode estar em branco.")
            return
        }

        setLoading(true)
        try {
            setError(null)
            const trackingData = await fetchTrackingData(nf)
            setTrackingResult(trackingData)
            console.log(trackingData)
            setTrack(true)
        } catch (error) {
            console.log(error)

            setError(
                "Ops! Não encontramos registros com as informações fornecidas.",
            )
            setTrack(false)
        } finally {
            setLoading(false)
        }
    }

    const LoaderComponent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-[116px] py-[116px]">
                    <BarLoader color="#5c74ff" />
                    <p className="text-sm"> Aguarde...</p>
                </div>
            )
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 bg-gradient-3 px-6 py-[20px] shadow-lg  md:px-[116px] lg:py-[60px]">
                <p className="text-[20px] font-[700] text-white lg:text-[36px] ">
                    Acompanhe seu objeto
                </p>

                <div className="flex">
                    <Input
                        placeholder="Código de rastreio"
                        className="w-full rounded-none bg-white sm:w-[242px]"
                        value={nf}
                        onChange={(e) => setNf(e.target.value)}
                        maxLength={6}
                        minLength={6}
                    />
                    <Button
                        disabled={loading}
                        onClick={handleTracking}
                        className="hover:bg-green rounded-none bg-[#1230da] font-[600] text-white hover:text-gray-500 lg:w-[84px]"
                    >
                        Rastrear
                    </Button>
                </div>
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            </div>
            {LoaderComponent()}
            {track && trackingResult && (
                <ResultTracking trackingResult={trackingResult} />
            )}
        </>
    )
}
