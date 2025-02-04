import * as React from "react"
import { styled } from "@mui/material/styles"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector"
import { StepIconProps as MuiStepIconProps } from "@mui/material/StepIcon"
import {
    Check,
    FileCheck,
    PackageCheck,
    PackageOpen,
    TriangleAlert,
    Truck,
} from "lucide-react"
import { formatarDataParaBR } from "@/utils/formatData"

interface StepIconProps extends MuiStepIconProps {
    ownerState: { completed?: boolean; active?: boolean; isSinistro?: boolean }
}

const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: "#1230da",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: "#1230da",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        width: "100%",
        backgroundColor: "#eaeaf0",
        borderRadius: 1,
    },
}))

const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean; isSinistro?: boolean }
}>(({ ownerState }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        background: "#1230da",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        background: "#1230da",
    }),
    ...(ownerState.isSinistro && {
        background: "#FFD700",
    }),
}))

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className, icon, ownerState } = props

    const icons: { [index: string]: React.ReactElement<unknown> | null } = {
        1: <FileCheck className="text-white" size={24} />,
        2: <PackageOpen className="text-white" size={24} />,
        3: <PackageCheck className="text-white" size={24} />,
        4: <Truck className="text-white" size={24} />,
        5: <Check className="text-white" size={24} />,
        6: ownerState?.isSinistro ? (
            <TriangleAlert className="text-black" size={24} />
        ) : null,
    }

    if (!icons[String(icon)]) {
        return null
    }

    return (
        <ColorlibStepIconRoot
            ownerState={{
                completed,
                active,
                isSinistro: ownerState?.isSinistro,
            }}
            className={className}
        >
            {icons[String(icon)]}
        </ColorlibStepIconRoot>
    )
}

interface Steps {
    step1?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step2?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step3?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step4?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step5?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step6?: { nm: string; dt?: string; dateTime?: string; hr?: string }
}

interface StepperComponentProps {
    steps: Record<
        string,
        { nm: string; dt?: string; dateTime?: string; hr?: string } | undefined
    >
}

export const StepperComponent: React.FC<StepperComponentProps> = ({
    steps = {},
}) => {
    const [isSmallScreen, setIsSmallScreen] = React.useState(false)

    React.useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const stepLabels: Record<keyof Steps, string> = {
        step1: "Pedido recebido",
        step2: "Enviado para a transportadora",
        step3: "Recebido pela transportadora",
        step4: "Mercadoria em trânsito",
        step5: "Pedido entregue",
        step6: "Problema com o pedido",
    }

    const stepOrder = {
        step1: 1,
        step2: 2,
        step3: 3,
        step5: 4,
        step4: 5,
        step6: 6,
    }

    let orderedSteps = [
        "step1",
        "step2",
        "step3",
        "step4",
        "step5",
        "step6",
    ].map((stepKey) => {
        const stepData = steps[stepKey]
        return stepData
            ? {
                  ...stepData,
                  nm: stepLabels[stepKey as keyof Steps],
                  key: stepKey,
                  date: stepData.dateTime
                      ? new Date(stepData.dateTime)
                      : stepData.dt
                        ? new Date(stepData.dt)
                        : null,
              }
            : {
                  key: stepKey,
                  nm: stepLabels[stepKey as keyof Steps],
                  date: null,
              }
    })

    orderedSteps = orderedSteps.sort((a, b) => {
        if (!a.date) return 1
        if (!b.date) return -1
        const dateComparison = a.date.getTime() - b.date.getTime()
        if (dateComparison !== 0) return dateComparison

        return (
            stepOrder[a.key as keyof typeof stepOrder] -
            stepOrder[b.key as keyof typeof stepOrder]
        )
    })

    orderedSteps = orderedSteps.filter(
        (step) => step.key !== "step6" || step.dt,
    )

    const activeStepIndex = orderedSteps.reduce((lastIndex, step, index) => {
        if (step?.date || (step?.key === "step6" && steps["step6"])) {
            return index
        }
        return lastIndex
    }, -1)

    const lastStep = orderedSteps[activeStepIndex]

    if (isSmallScreen) {
        return (
            <div className="flex w-full flex-col items-center pt-8">
                <div className="flex w-[90%] flex-col items-center justify-center md:w-[80%] lg:w-[70%]">
                    <p className="mb-4 flex  text-center text-[16px] font-semibold text-black md:text-[18px]">
                        Status
                    </p>
                </div>
                <div className="w-full overflow-x-auto">
                    <Stepper
                        alternativeLabel
                        activeStep={activeStepIndex}
                        connector={<ColorlibConnector />}
                    >
                        {orderedSteps.map((step, index) => {
                            const isStepCompleted = step?.dt !== undefined
                            const isActive = index === activeStepIndex

                            const isSinistro = step?.key === "step6"

                            return (
                                <Step key={step?.key}>
                                    <StepLabel
                                        StepIconComponent={(props) => (
                                            <ColorlibStepIcon
                                                {...props}
                                                icon={step?.key.replace(
                                                    "step",
                                                    "",
                                                )}
                                                active={isActive}
                                                completed={isStepCompleted}
                                                ownerState={{ isSinistro }}
                                            />
                                        )}
                                    >
                                        <div
                                            className={`text-[10px] sm:text-[12px] ${
                                                isStepCompleted
                                                    ? "text-black"
                                                    : "text-gray-400"
                                            }`}
                                        ></div>
                                    </StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                    <div className="mt-8 text-center">
                        <p className="font-medium">{lastStep?.nm}</p>
                        {lastStep?.dateTime && (
                            <div className="text-gray-600">
                                <p>
                                    {formatarDataParaBR(
                                        lastStep?.dateTime,
                                        true,
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex w-full flex-col items-center pt-8">
            <div className="w-full">
                <div className="flex items-center justify-center">
                    <p className="mb-[40px] text-[18px] font-[600] text-black">
                        Status
                    </p>
                </div>
                <Stepper
                    alternativeLabel
                    activeStep={activeStepIndex}
                    connector={<ColorlibConnector />}
                >
                    {orderedSteps.map((step, index) => {
                        const isStepCompleted = step?.date !== null
                        const isActive = index === activeStepIndex
                        const isSinistro = step?.key === "step6"

                        return (
                            <Step key={step?.key}>
                                <StepLabel
                                    StepIconComponent={(props) => (
                                        <ColorlibStepIcon
                                            {...props}
                                            icon={step?.key.replace("step", "")}
                                            active={isActive}
                                            completed={isStepCompleted}
                                            ownerState={{ isSinistro }}
                                        />
                                    )}
                                >
                                    <div
                                        className={`text-[10px] sm:text-[12px] ${
                                            isStepCompleted
                                                ? "text-black"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        <span className="text-center">
                                            <p className="font-medium">
                                                {step?.nm}
                                            </p>
                                            {step?.dateTime && (
                                                <div className="text-gray-600">
                                                    <p>
                                                        {formatarDataParaBR(
                                                            step?.dateTime,
                                                            true,
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                </StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
            </div>
        </div>
    )
}
