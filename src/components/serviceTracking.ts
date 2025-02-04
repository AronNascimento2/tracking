const mockTrackingDataList = [
    {
        tracking: {
            status: {
                step1: {
                    nm: "Pedido recebido",
                    dt: "2025-02-03",
                    dateTime: "2025-02-03 09:27",
                },
                step2: {
                    nm: "Enviado para a transportadora",
                    dt: "2025-02-03",
                    dateTime: "2025-02-03 09:28",
                },
            },
            detalhes: {
                minuta: "743048",
                remetente: "BMX - BIOMERIEUX BRASIL",
                destinatario:
                    "LIFE LABORATORIO DE INSUMOS FARMACEUTICOS ESTEREIS LTDA",
                dataEntrega: "05/02/2025",
                previsao: "05/02/2025",
                recebedor: "",
                notas: [145047],
                ocorrencias: [
                    {
                        data: "2025-02-03 09:27",
                        descricao: "Pedido recebido",
                    },
                    {
                        data: "2025-02-03 09:28",
                        descricao: "Enviado para a transportadora",
                    },
                ],
                anexos: "",
            },
        },
    },
    {
        tracking: {
            status: {
                step1: {
                    nm: "Pedido recebido",
                    dt: "2025-02-02",
                    dateTime: "2025-02-02 08:15",
                },
                step2: {
                    nm: "Enviado para a transportadora",
                    dt: "2025-02-02",
                    dateTime: "2025-02-02 10:00",
                },
                step3: {
                    nm: "Recebido pela transportadora",
                    dt: "2025-02-03",
                    dateTime: "2025-02-03 10:00",
                },
                step4: {
                    nm: "Mercadoria em trânsito",
                    dt: "2025-02-04",
                    dateTime: "2025-02-04 10:00",
                },
                step5: {
                    nm: "Pedido entregue",
                    dt: "2025-02-04",
                    dateTime: "2025-02-04 15:00",
                },
            },
            detalhes: {
                minuta: "582947",
                remetente: "ACME CORP",
                destinatario: "TECH SOLUTIONS LTDA",
                recebedor: "",
                notas: [789456],
                ocorrencias: [
                    {
                        data: "2025-02-02 08:15:30",
                        descricao: "Pedido recebido",
                    },
                    {
                        data: "2025-02-02 10:00",
                        descricao: "Enviado para a transportadora",
                    },
                    {
                        data: "2025-02-03 10:00",
                        descricao: "Recebido pela transportadora",
                    },
                    {
                        data: "2025-02-04 10:00",
                        descricao: "Mercadoria em trânsito",
                    },
                    {
                        data: "2025-02-04 15:00",
                        descricao: "Pedido entregue",
                    },
                ],
                anexos: "",
            },
        },
    },
    {
        tracking: {
            status: {
                step1: {
                    nm: "Pedido recebido",
                    dt: "2025-02-01",
                    dateTime: "2025-02-01 14:20",
                },
                step2: {
                    nm: "Enviado para a transportadora",
                    dt: "2025-02-01",
                    dateTime: "2025-02-01 16:45",
                },
                step6: {
                    nm: "Problema com a entrega",
                    dt: "2025-02-01",
                    dateTime: "2025-02-01 17:45",
                },
            },
            detalhes: {
                minuta: "936271",
                remetente: "ELETROSHOP",
                destinatario: "COMERCIO ELETRONICO BRASIL",
                dataEntrega: "07/02/2025",
                previsao: "07/02/2025",
                recebedor: "",
                notas: [369852],
                ocorrencias: [
                    {
                        data: "2025-02-01 14:20",
                        descricao: "Pedido recebido",
                    },
                    {
                        data: "2025-02-01 16:45",
                        descricao: "Enviado para a transportadora",
                    },
                    {
                        data: "2025-02-01 17:45",
                        descricao: "Problema com a entrega",
                    },
                ],
                anexos: "",
            },
        },
    },
    {
        tracking: {
            status: {
                step1: {
                    nm: "Pedido recebido",
                    dt: "2025-02-01",
                    dateTime: "2025-02-01 09:00",
                },
                step2: {
                    nm: "Enviado para a transportadora",
                    dt: "2025-02-03",
                    dateTime: "2025-02-03 09:28",
                },
                step3: {
                    nm: "Recebido pela transportadora",
                    dt: "2025-02-05",
                    dateTime: "2025-02-05 10:00",
                },
            },
            detalhes: {
                minuta: "485302",
                remetente: "FASHION STORE",
                destinatario: "VESTUÁRIO LTDA",
                dataEntrega: "08/02/2025",
                previsao: "08/02/2025",
                recebedor: "",
                notas: [147258],
                ocorrencias: [
                    {
                        data: "2025-02-01 09:00",
                        descricao: "Pedido recebido",
                    },
                    {
                        data: "2025-02-03 09:28",
                        descricao: "Enviado para a transportadora",
                    },
                    {
                        data: "2025-02-05 10:00",
                        descricao: "Recebido pela transportadora",
                    },
                ],
                anexos: "",
            },
        },
    },
]
export const fetchTrackingData = async (nf: string) => {
    console.log(`Simulando busca para NF: ${nf}`)
    const randomMock =
        mockTrackingDataList[
            Math.floor(Math.random() * mockTrackingDataList.length)
        ]
    return new Promise((resolve) => {
        setTimeout(() => resolve(randomMock.tracking), 1000)
    })
}
