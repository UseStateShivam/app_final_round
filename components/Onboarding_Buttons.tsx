import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const NextButton = ({ ...props }) => (
    <TouchableOpacity style={styles.nextButton} {...props}>
        <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
);

export const DoneButton = ({ ...props }) => (
    <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={styles.doneButtonText}>Done</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    nextButton: {
        padding: 10,
        backgroundColor: "#007AFF",
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    nextButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    doneButton: {
        padding: 10,
        backgroundColor: "#28A745",
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    doneButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})