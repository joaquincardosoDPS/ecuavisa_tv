import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    showArrow?: boolean;
    focused?: boolean;
}

const variantStyleMap: Record<ButtonVariant, string> = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    variant = "primary",
    showArrow = false,
    onClick,
    disabled = false,
    className,
    style,
    focused = false,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type="button"
            className={cn(styles.btn, variantStyleMap[variant], focused && styles.focused, className)}
            onClick={onClick}
            disabled={disabled}
            style={style}
            {...props}
        >
            {showArrow && (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={styles.arrow}>
                    <path d="M14 8L0 16V0L14 8Z" />
                </svg>
            )}
            {children}
        </button>
    );
});

export default Button;
