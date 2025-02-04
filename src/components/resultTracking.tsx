import { TrackingResult } from "@/models"
import { DetailsModal } from "./detailsModal"
import { StepperComponent } from "./stepper"

interface ResultTrackingProps {
    trackingResult: TrackingResult
}
export const ResultTracking: React.FC<ResultTrackingProps> = ({
    trackingResult,
}) => {
    return (
        <div className="flex justify-between p-4 lg:px-[116px]  ">
            <div className="flex w-full flex-col items-center  gap-8 overflow-auto bg-white p-8 text-[14px] text-[#4b4b4b] shadow-lg">
                <StepperComponent steps={trackingResult?.status} />
                <DetailsModal
                    steps={trackingResult?.status}
                    trackingResult={trackingResult}
                />
            </div>
        </div>
    )
}
