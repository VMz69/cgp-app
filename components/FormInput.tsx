import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
  placeholder?: string;
}

export function FormInput({ placeholder, ...props }: FormInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
});
