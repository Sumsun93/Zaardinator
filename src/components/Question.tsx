import {useEffect, useState} from "react";
import {EFFECT_TYPES, QUESTION_TYPES} from "../constants/questionTypes";
import {Button, Slider, Typography} from "antd";

type QuestionProps = {
    data: {
        title: string,
        type: QUESTION_TYPES,
        min?: number,
        max?: number,
        default?: number | boolean
        options?: string[],
        unit?: string,
        label?: string,
        labelState?: string[],
        labelEffect?: EFFECT_TYPES,
        effect?: EFFECT_TYPES,
    }
    children?: any,
    value?: any,
    setValue?: any,
}

const Template = ({ data, children, value }: QuestionProps) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        filter: data.effect === EFFECT_TYPES.BLUR ? `blur(${value / 10}px)` : 'none',
        marginBottom: '100px',
    }}>
        <Typography.Title
            level={1}
            style={{
                fontWeight: 900,
                marginBottom: '100px',
            }}
        >
            {data.title}
        </Typography.Title>

        {children}
    </div>
)

const Question = ({ data, value, setValue }: QuestionProps) => {
    switch (data.type) {
        case QUESTION_TYPES.SWITCH:
            return (
                <Template data={data} value={value}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            type={'primary'}
                            ghost={value}
                            onClick={() => setValue(false)}
                            style={{
                                marginRight: '1em',
                                fontSize: '3em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                outline: 'none',
                                padding: '30px',
                                color: value ? 'white' : 'black',
                            }}
                        >
                            Non
                        </Button>
                        <Button
                            type={'primary'}
                            ghost={!value}
                            onClick={() => setValue(true)}
                            style={{
                                fontSize: '3em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                outline: 'none',
                                padding: '30px',
                                color: !value ? 'white' : 'black',
                            }}
                        >
                            Oui
                        </Button>
                    </div>
                </Template>
            );
        case QUESTION_TYPES.SLIDER:
            return (
                <Template data={data} value={value}>
                    <Slider
                        min={data.min}
                        max={data.max}
                        onChange={(value) => setValue(value)}
                        value={typeof value === 'number' ? value : 0}
                        style={{
                            width: '100%',
                        }}
                        tooltip={{
                            open: false
                        }}
                    />
                    <Typography.Title level={1}>{value} {data.unit}</Typography.Title>
                    {data.label && (
                        <Typography.Title
                            level={2}
                            style={{
                                filter: data.labelEffect === EFFECT_TYPES.BLUR ? `blur(${value / 30}px)` : 'none',
                            }}
                        >{data.label}</Typography.Title>
                    )}
                    {data.labelState && (
                        <Typography.Title
                            level={2}
                            style={{
                                filter: data.labelEffect === EFFECT_TYPES.BLUR ? `blur(${value / 30}px)` : 'none',
                            }}
                        >
                            {/* @ts-ignore */}
                            {data.labelState[Math.round((value - data.min) / (data.max - data.min) * (data.labelState.length - 1))]}
                        </Typography.Title>
                    )}
                </Template>
            );
        case QUESTION_TYPES.MULTIPLE_CHOICE:
            return (
                <Template data={data} value={value}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {data.options?.map((option, index) => (
                            <Button
                                key={index}
                                type={'primary'}
                                ghost={!value.includes(option)}
                                onClick={() => {
                                    if (value.includes(option)) {
                                        setValue(value.filter((v: string) => v !== option))
                                    } else {
                                        setValue([...value, option])
                                    }
                                }}
                                style={{
                                    marginRight: index !== (data.options?.length || 0) - 1 ? '1em' : 0,
                                    fontSize: '3em',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    outline: 'none',
                                    padding: '30px',
                                    color: !value.includes(option) ? 'white' : 'black',
                                }}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </Template>
            );

        default:
            return null;
    }
};

export default Question;
