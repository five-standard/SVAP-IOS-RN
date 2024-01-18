import { TextInput } from "react-native";

export default function CustomInput(props) {
  const { name, onChange } = props;
  return (
    <TextInput {...props} onChangeText={(text) => onChange({ name, text })} />
  );
}
