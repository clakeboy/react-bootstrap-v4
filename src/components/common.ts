export interface ComponentProps extends React.ClassAttributes<any> {
    id?: string
    absolute?: boolean
    x?: string
    y?: string
    width?: string
    height?: string
    size?: string
    className?: string
    disabled?: boolean
    children?: any
    style?:any
    theme?: Theme
    field?: string
}

export interface StrObject {
    [propName:string]:string
}

export interface AnyObject {
    [propName:string]:any
}

export enum Theme {
    primary, 
    secondary, 
    success, 
    danger, 
    warning, 
    info, 
    light, 
    dark,
    link,
}