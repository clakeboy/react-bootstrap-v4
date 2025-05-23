import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames/bind';
import { ComponentProps } from './components/common';

interface Props extends ComponentProps {
    iconType?: string;
    icon?: string;
    spin?: boolean; // Spin icon
    bs?: boolean; // Bootstrap icon
    onClick?: (event: React.MouseEvent) => void;
}

export interface IconRef {
    setIcon: (icon: string) => void;
}

const Icon = forwardRef<IconRef, Props>(({
    iconType = 'solid',
    icon = '',
    spin,
    bs,
    className,
    onClick,
    ...restProps
}, ref) => {
    const [currentIcon, setCurrentIcon] = useState(icon);

    useEffect(() => {
        setCurrentIcon(icon ?? '');
    }, [icon]);
    
    useImperativeHandle(ref, () => {
        return {
            setIcon: (icon: string) => {
                setCurrentIcon(icon);
            },
        };
    }, []);

    const getBsClasses = useCallback(() => {
        let base;
        if (currentIcon) {
            base = classNames(base, currentIcon);
        }
        return classNames(base, className);
    }, [currentIcon, className]);

    const getClasses = useCallback(() => {
        if (bs) {
            return getBsClasses();
        }
        let base;
        switch (iconType) {
            case 'regular':
                base = 'far';
                break;
            case 'light':
                base = 'fal';
                break;
            case 'brands':
                base = 'fab';
                break;
            default:
                base = 'fas';
        }
        if (currentIcon) {
            base = classNames(base, 'fa-' + currentIcon);
        }
        if (spin) {
            base = classNames(base, 'fa-spin');
        }
        return classNames(base, className);
    }, [bs, iconType, currentIcon, spin, className, getBsClasses]);

    // 不传递 iconType 给 <i>
    // const { iconType: icontype, ...btnProps } = restProps;

    return (
        <i
            {...restProps}
            className={getClasses()}
            onClick={onClick}
        />
    );
});
Icon.displayName = 'Icon';

export default Icon;