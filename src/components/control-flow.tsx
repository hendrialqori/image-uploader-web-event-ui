import React from "react";

type Props = {
    children: React.ReactNode
}

function Flow({ children }: Props) {
    let show: React.ReactNode;
    let otherwise: React.ReactNode;

    React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            if (Flow.If == child.type && child.props.condition) {
                show = child

            } else if (Flow.ElseIf == child.type && child.props.condition) {
                show = child

            } else if (Flow.Else == child.type) {
                otherwise = child
            }
        }
    })

    return show ?? otherwise
}

Flow.If = (props: Props & { condition: boolean }) => props.children
Flow.ElseIf = (props: Props & { condition: boolean }) => props.children
Flow.Else = (props: Props) => props.children

export default Flow