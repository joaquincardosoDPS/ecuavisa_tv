import { memo } from "react";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import styles from "./NameKeyboard.module.css";

// Teclas del nombre de perfil: 6 columnas como el diseño.
const KEY_ROWS: string[][] = [
  ["a", "b", "c", "d", "e", "f"],
  ["g", "h", "i", "j", "k", "l"],
  ["m", "n", "o", "p", "q", "r"],
  ["s", "t", "u", "v", "w", "x"],
  ["y", "z", "1", "2", "3", "4"],
  ["5", "6", "7", "8", "9", "0"],
];

interface NameKeyboardProps {
  onKey: (char: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onSearch: () => void;
}

const NameKey = memo(({ char, onPress }: { char: string; onPress: (c: string) => void }) => {
  const { ref, focused } = useFocusable({
    focusKey: `namekey-${char}`,
    onEnterPress: () => onPress(char),
  });

  return (
    <button
      type="button"
      ref={ref}
      className={[styles.key, focused ? styles.focused : ""].join(" ")}
      onClick={() => onPress(char)}
    >
      {char}
    </button>
  );
});
NameKey.displayName = "NameKey";

function NameAction({
  label,
  focusKey,
  onPress,
  className,
}: {
  label: string;
  focusKey: string;
  onPress: () => void;
  className?: string;
}) {
  const { ref, focused } = useFocusable({ focusKey, onEnterPress: onPress });

  return (
    <button
      type="button"
      ref={ref}
      className={[styles.action, className, focused ? styles.focused : ""].filter(Boolean).join(" ")}
      onClick={onPress}
    >
      {label}
    </button>
  );
}

export function NameKeyboard({ onKey, onBackspace, onClear, onSearch }: NameKeyboardProps) {
  const { focusKey, ref } = useFocusable({
    focusKey: "zone-name-keyboard",
    saveLastFocusedChild: true,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.keyboard}>
        {KEY_ROWS.map((row, i) => (
          <div key={i} className={styles.row}>
            {row.map((char) => (
              <NameKey key={char} char={char} onPress={onKey} />
            ))}
          </div>
        ))}
        <div className={styles.actionRow}>
          <NameAction label="ESPACIO" focusKey="namekey-space" onPress={() => onKey(" ")} className={styles.spaceBtn} />
          <NameAction label="BUSCAR" focusKey="namekey-search" onPress={onSearch} className={styles.searchBtn} />
          <NameAction label="X" focusKey="namekey-backspace" onPress={onBackspace} className={styles.backBtn} />
        </div>
        <NameAction label="BORRAR" focusKey="namekey-clear" onPress={onClear} className={styles.clearBtn} />
      </div>
    </FocusContext.Provider>
  );
}
