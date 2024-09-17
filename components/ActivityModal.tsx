// ActivityModal.tsx
import React from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";

type ActivityModalProps = {
  visible: boolean;
  activityLevel: string;
  onClose: () => void;
};

const ActivityModal: React.FC<ActivityModalProps> = ({
  visible,
  activityLevel,
  onClose,
}) => {
  const getMessage = (level: string): string => {
    switch (level) {
      case "none":
        return "Actividad baja, permaneces la mayoría de tiempo sedentario";
      case "light":
        return "Realizas actividad física de 1 a 3 días a la semana";
      case "moderate":
        return "Realizas actividad física y/o fuerza de 4 a 5 días a la semana";
      case "active":
        return "Realizas ejercicio constantemente de 6 a 7 días a la semana";
      case "very_active":
        return "Realizas actividad física de alto rendimiento con turnos dobles";
      default:
        return "";
    }
  };

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Información de Actividad</Text>
          <Text style={styles.modalMessage}>{getMessage(activityLevel)}</Text>
          <Button title="Cerrar" onPress={onClose} color="#ff0000" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default ActivityModal;
