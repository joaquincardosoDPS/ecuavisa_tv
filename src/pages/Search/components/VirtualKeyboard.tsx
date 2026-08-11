import { memo } from "react";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import styles from "./VirtualKeyboard.module.css";
import { SidebarIcon } from "@/layout/header/SidebarIcons";

const KEYS = [
  "A", "B", "C", "D", "E", "F", "G",
  "H", "I", "J", "K", "L", "M", "N",
  "O", "P", "Q", "R", "S", "T", "U",
  "V", "W", "X", "Y", "Z", "0", "1",
  "2", "3", "4", "5", "6", "7", "8",
  "9"
];

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onClear: () => void;
}

interface KeyProps {
  char: string;
  onPress: (char: string) => void;
  onArrowPress?: (direction: string) => boolean;
}

const KeyboardKey = memo(({ char, onPress, onArrowPress }: KeyProps) => {
  const { ref, focused } = useFocusable({
    focusKey: `key-${char}`,
    onEnterPress: () => onPress(char),
    onArrowPress
  });

  return (
    <button
      ref={ref}
      className={[styles.keyButton, focused ? styles.focused : ""].join(" ")}
      onClick={() => onPress(char)}
      type="button"
    >
      {char}
    </button>
  );
});
KeyboardKey.displayName = "KeyboardKey";

const ActionKey = memo(({ label, icon, action, focusKey, flexClass }: { label: string; icon?: string; action: () => void; focusKey: string; flexClass?: string }) => {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: action
  });

  return (
    <button
      ref={ref}
      className={[styles.actionButton, flexClass, focused ? styles.focused : ""].filter(Boolean).join(" ")}
      onClick={action}
      type="button"
    >
      {icon ? (
        <span className={styles.iconWrap} title={label}>
          <SidebarIcon name={icon as any} size={20} />
        </span>
      ) : (
        label
      )}
    </button>
  );
});
ActionKey.displayName = "ActionKey";

export function VirtualKeyboard({ onKeyPress, onBackspace, onClear: _onClear }: VirtualKeyboardProps) {
  const { focusKey, ref } = useFocusable({
    focusKey: "zone-keyboard",
    saveLastFocusedChild: true,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.keyboardContainer}>
        <div className={styles.keysWrapper}>
          {KEYS.map((char, index) => (
            <KeyboardKey 
              key={char} 
              char={char} 
              onPress={onKeyPress} 
              onArrowPress={(dir) => {
                if (dir === 'up' && index < 7) {
                  setFocus('header-search');
                  return false;
                }
                return true;
              }}
            />
          ))}

          <ActionKey
            label="Espacio"
            focusKey="key-space"
            action={() => onKeyPress(" ")}
            flexClass={styles.spaceButton}
          />
          <ActionKey
            label="Borrar"
            focusKey="key-backspace"
            action={onBackspace}
          />
        </div>
      </div>
    </FocusContext.Provider>
  );
}
