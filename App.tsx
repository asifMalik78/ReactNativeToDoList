import { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";

type Task = {
  title: string;
  about: string;
};
export default function App() {
  const [data, setData] = useState<Task[]>([]);
  const [todo, setToDo] = useState<Task>({ title: "", about: "" });

  const changeHandler = (name: string, value: string) => {
    setToDo((prev: Task) => {
      return { ...prev, [name]: value };
    });
  };

  const addTodo = () => {
    if (todo.title == "" || todo.about == "") return;
    setData([todo, ...data]);

    setToDo({ title: "", about: "" });
  };

  const deleteTodo = (id: number) => {
    setData((prev: Task[]) => {
      return prev.filter((curr: Task, idx) => {
        return idx !== id;
      });
    });
  };
  return (
    <View
      style={{
        backgroundColor: "#12110f",
        marginTop: StatusBar.currentHeight,
        height: Dimensions.get("screen").height,
        width: "100%",
        padding: 18,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 10,
          alignItems: "stretch",
        }}
      >
        <View style={{ flex: 0.78, gap: 6 }}>
          <TextInput
            placeholder="Title..."
            placeholderTextColor={"#f0e3ca"}
            value={todo.title}
            style={{
              color: "#f0e3ca",
              borderWidth: 2,
              borderColor: "#a35709",
              backgroundColor: "#1f1e1b",
              height: 42,
              padding: 12,
              borderRadius: 6,
            }}
            onChangeText={(text) => changeHandler("title", text)}
          />

          <TextInput
            placeholder="About..."
            placeholderTextColor={"#f0e3ca"}
            value={todo.about}
            style={{
              color: "#f0e3ca",
              borderWidth: 2,
              borderColor: "#a35709",
              backgroundColor: "#1f1e1b",
              height: 42,
              padding: 12,
              borderRadius: 6,
            }}
            onChangeText={(text) => changeHandler("about", text)}
          />
        </View>

        <Pressable style={{ flex: 0.22, zIndex: 999 }} onPress={addTodo}>
          <View
            style={{
              borderWidth: 2,
              borderColor: "#ff8303",
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "#ff8303",
                fontSize: 50,
              }}
            >
              +
            </Text>
          </View>
        </Pressable>
      </View>

      {data.length == 0 && (
        <View
          style={{
            marginTop: 160,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ backgroundColor: "#ff8303", height: 3, width: 55 }} />
          <Text
            style={{
              color: "#f0e3ca",
              fontSize: 28,
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            No tasks
          </Text>
          <View style={{ backgroundColor: "#ff8303", height: 3, width: 55 }} />
        </View>
      )}

      <ScrollView
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
          marginTop: 34,
          marginBottom: 95,
        }}
      >
        <View style={{ gap: 10 }}>
          {data?.map((curr: Task, idx) => (
            <View
              key={idx}
              style={{
                width: "100%",
                borderWidth: 2,
                borderColor: "#a35709",
                backgroundColor: "#1f1e1b",
                borderRadius: 6,
                padding: 14,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 26,
              }}
            >
              <View style={{ gap: 6, flex: 1 }}>
                <Text style={{ color: "#f0e3ca", fontSize: 24 }}>
                  {curr.title}
                </Text>
                <Text style={{ color: "#f0e3ca", fontSize: 18 }}>
                  {curr.about}
                </Text>
              </View>

              <Pressable onPress={() => deleteTodo(idx)}>
                <Image
                  source={require("./assets/delete.png")}
                  style={{ width: 32, height: 32 }}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
