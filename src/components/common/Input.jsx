import { TextInput, TouchableOpacity } from "react-native";
import { useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Input = (props) => {
  const { name, onChange, value, style, password, search, onSearch } = props;
  const ref = useRef();
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleFocus = () => setFocus(!focus);

  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 1,
          borderColor: `${
            search ? "transparent" : focus ? "#419FFF" : "#BEBEBE"
          }`,
          backgroundColor: `${search && "#F4F4F4"}`,
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
          width: "100%",
        },
        style,
      ]}
      activeOpacity={1}
      onPress={() => ref.current.focus()}
    >
      <TextInput
        {...props}
        style={{ width: "90%", height: "100%" }}
        onChangeText={(text) => onChange({ name, text })}
        onFocus={handleFocus}
        onBlur={handleFocus}
        value={value}
        ref={ref}
        textAlignVertical="top"
        secureTextEntry={password && !visible ? true : false}
      />
      {password && (
        <Ionicons
          name={visible ? "eye" : "eye-off"}
          size={20}
          onPress={() => setVisible(!visible)}
        />
      )}
      {search && <Ionicons name="search" size={20} onPress={onSearch} />}
    </TouchableOpacity>
  );
};
