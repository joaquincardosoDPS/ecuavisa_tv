import { useState, useRef, useEffect } from "react";
import styles from "./ProfileActionRow.module.css";

type ProfileActionVariant = "navigation" | "editable" | "action";

interface ProfileActionRowProps {
  icon: React.ReactNode;
  label: string;
  variant?: ProfileActionVariant;
  value?: string;
  onValueChange?: (value: string) => void;
  onClick?: () => void;
  onSave?: () => void;
}

function ProfileActionRow({
  icon,
  label,
  variant = "action",
  value,
  onValueChange,
  onClick,
  onSave,
}: ProfileActionRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    if (variant === "editable") setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { setIsEditing(false); onSave?.(); }
    if (e.key === "Escape") setIsEditing(false);
  };

  return (
    <button
      type="button"
      onClick={variant === "editable" ? handleEditClick : onClick}
      className={styles.row}
    >
      <div className={styles.left}>
        <span className={styles.iconWrap}>{icon}</span>
        <span className={styles.label}>{label}</span>
      </div>

      {variant === "navigation" && (
        <div className={styles.chevronWrap}>
          <svg width="14" height="24" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1L8.5 8L1.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {variant === "editable" && (
        isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={value ?? ""}
            onChange={(e) => onValueChange?.(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            className={styles.editInput}
          />
        ) : (
          <span className={styles.editValue}>{value}</span>
        )
      )}
    </button>
  );
}

export default ProfileActionRow;
