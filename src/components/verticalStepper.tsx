import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector"
import { formatarDataParaBR } from "@/utils/formatData"
import { styled } from "@mui/material"
import { CalendarClock, Check, TriangleAlert } from "lucide-react"
import { StepIconProps as MuiStepIconProps } from "@mui/material/StepIcon"
import { Steps } from "@/models"

interface StepIconProps extends MuiStepIconProps {
    ownerState?: { completed?: boolean; active?: boolean; isSinistro?: boolean }
}

const ColorlibStepIconRoot = styled("div")<{
    ownerState?: {
        completed?: boolean
        active?: boolean
        isCheckIcon: boolean
        isSinistro?: boolean
    }
}>(({ ownerState }) => ({
    backgroundColor: "#ccc",
    zIndex: 50,
    color: "#fff",
    width: 10,
    height: 10,
    position: "relative",
    left: "8px",
    padding: "0px",
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState?.active && {
        background: "#1230da",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState?.completed && {
        background: "#1230da",
    }),
    ...(ownerState?.isCheckIcon && {
        width: 20,
        height: 20,
        position: "relative",
        left: "4px",
    }),
    ...(ownerState?.isSinistro && {
        width: 20,
        height: 20,

        background: "#FFD700",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
}))

const ColorlibConnector = styled(StepConnector)(() => ({
    [`& .${stepConnectorClasses.line}`]: {
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1,
        width: "2px",
        height: "50px",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: "#1230da",
            height: "40px",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: "#1230da",
        },
    },
}))

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className, icon, ownerState } = props

    const icons: { [index: string]: React.ReactElement<unknown> | null } = {
        5: <Check className="text-black" size={14} color="white" />,
        6: ownerState?.isSinistro ? (
            <TriangleAlert className="text-black" size={14} />
        ) : (
            <CalendarClock className="text-black" size={14} />
        ),
    }

    const isCheckIcon = icons[String(icon)] !== undefined

    return (
        <ColorlibStepIconRoot
            ownerState={{
                completed,
                active,
                isCheckIcon,
                isSinistro: ownerState?.isSinistro,
            }}
            className={className}
        >
            {isCheckIcon && active && icons[String(icon)]}
        </ColorlibStepIconRoot>
    )
}

interface VerticalLinearStepperProps {
    steps?: Steps
}
export const VerticalLinearStepper: React.FC<VerticalLinearStepperProps> = ({
    steps = {},
}) => {
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
        step4: 5,
        step5: 4,
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
        const stepData = steps[stepKey as keyof Steps]
        return stepData
            ? {
                  ...stepData,
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
        (step) => !(["step6"].includes(step.key) && !step.dt),
    )

    const activeStepIndex = orderedSteps.reduce((lastIndex, step, index) => {
        if (step?.date || (step?.key === "step6" && steps["step6"])) {
            return index
        }
        return lastIndex
    }, -1)
    return (
        <Box>
            <Stepper
                activeStep={activeStepIndex}
                orientation="vertical"
                connector={<ColorlibConnector />}
            >
                {orderedSteps.map((step, index) => {
                    const isStepCompleted = step?.dt !== undefined
                    const isActive = index === activeStepIndex
                    const isLastStep = index === orderedSteps.length - 1
                    const isSinistro = step?.nm === "Problema com a entrega"

                    return (
                        <Step key={step.key}>
                            <StepLabel
                                style={{ padding: "0" }}
                                StepIconComponent={(props) => (
                                    <ColorlibStepIcon
                                        {...props}
                                        icon={step?.key.replace("step", "")}
                                        active={isActive}
                                        completed={isStepCompleted}
                                        ownerState={{
                                            isSinistro: isSinistro,
                                        }}
                                    />
                                )}
                            >
                                <div
                                    className={`absolute left-[10%] p-0 text-[10px] sm:text-[12px] ${
                                        isStepCompleted
                                            ? "text-black"
                                            : "text-gray-400"
                                    }`}
                                >
                                    <p
                                        className={`relative bottom-[18px]  left-[22px]   lg:left-[4px] ${
                                            step.dt
                                                ? "h-[14px] last:h-0"
                                                : "h-[10px] last:h-0"
                                        } font-semibold text-gray-400`}
                                    >
                                        {step.dt && formatarDataParaBR(step.dt)}
                                    </p>

                                    <p
                                        className={`relative font-semibold ${
                                            isLastStep && !isStepCompleted
                                                ? "bottom-[15px] left-[22px] lg:bottom-[20px]   lg:left-[4px]"
                                                : "bottom-[16px] left-[22px] lg:bottom-[18px]   lg:left-[4px]"
                                        }`}
                                    >
                                        {step?.nm}
                                    </p>
                                </div>
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </Box>
    )
}
