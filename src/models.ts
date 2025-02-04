interface Ocorrencia {
    data: string
    descricao: string
}

type TrackingStep = {
    nm: string
    dt: string
    dateTime: string
}
export interface TrackingResult {
    status: {
        step1: TrackingStep
        step2: TrackingStep
        step3: TrackingStep
        step4: TrackingStep
        step5: TrackingStep
        step6: TrackingStep
    }
    detalhes: {
        minuta: string
        remetente: string
        destinatario: string
        notas: string[]
        dataEntrega: string
        previsao: string
        recebedor: string
        ocorrencias: Ocorrencia[]
        anexos: string
    }
}
export interface Steps {
    step1?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step2?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step3?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step4?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step5?: { nm: string; dt?: string; dateTime?: string; hr?: string }
    step6?: { nm: string; dt?: string; dateTime?: string; hr?: string }
}
