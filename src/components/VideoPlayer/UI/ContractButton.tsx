import React from "react";
import iconosContraer from "@/assets/img/icons/iconos-contraer.svg";
import styles from "./ContractButton.module.css";

interface ContractButtonProps {
  onClick?: () => void;
}

const ContractButtonComponent = ({ onClick }: ContractButtonProps) => {
  return (
    <button
      onClick={onClick}
      title="Contraer" className={styles.buttonStyle1}
    >
      <img src={iconosContraer} alt="Contraer" width={22} height={22} />
    </button>
  );
};

export const ContractButton = React.memo(ContractButtonComponent);
