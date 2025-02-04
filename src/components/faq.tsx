import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const Faq: React.FC = () => {
    const itemsAccordion = [
        {
            title: " Qual o telefone das unidades de tratamento e entrega?",
            description:
                "Essas unidades não possuem atendimento telefônico. Todas as dúvidas referentes a objetos ou manifestações devem ser esclarecidas por meio do Fale Conosco, Chat ou da nossa Central de Atendimento.",
        },
        {
            title: "Recebi um código de postagem mas ele não aparece no sistema de rastreamento. O que fazer?",
            description:
                "Orientamos o cliente a contatar o remetente para verificar se o código está correto, inclusive as letras, e se o objeto já foi realmente postado. Caso positivo, o remetente deve registrar uma reclamação para verificar o ocorrido.",
        },
        {
            title: "Não consigo registrar uma reclamação, o que faço?",
            description:
                "O sistema Fale Conosco poderá apresentar intermitência. A área técnica será acionada para a resolução do problema o mais breve possível. Dessa forma, tentar realizar o registro da reclamação mais tarde.",
        },
    ]
    return (
        <div className=" flex flex-col justify-between px-[20px] py-[73px] text-[16px] lg:px-[116px]">
            <div className="flex items-center  pb-4">
                <img src="work-computer.png" alt="" className="h-[48px]" />
                <p className="text-[24px] font-[700]">Perguntas frequentes</p>
            </div>

           
            {itemsAccordion.map((item) => (
                <Accordion key={item.title} type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-[16px] font-[500]  lg:text-[20px]">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent>{item.description}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
    )
}
