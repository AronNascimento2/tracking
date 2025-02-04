export function formatarDataParaBR(
    data: string,
    incluirHora: boolean = true,
): string {
    if (!data) return ""

    const incluiHora = data.includes(" ") && incluirHora // Usa o parâmetro incluirHora para determinar se deve incluir a hora

    const [dataParte, horaParte] = data.split(" ")
    const [ano, mes, dia] = dataParte.split("-")

    let dataFormatada = `${dia}/${mes}/${ano}`

    if (incluiHora && horaParte) {
        dataFormatada += ` ${horaParte}`
    }

    return dataFormatada
}
