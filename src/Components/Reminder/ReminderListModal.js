import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../Components/Animation/Colors';

export default ReminderListModal = ({
  list,
  handleListVisible,
  updateReminderList,
}) => {
  // const [getName, setName] = React.useState(list.name);
  // const [getColor, setColor] = React.useState(list.color);
  // const [getTodos, setTodos] = React.useState(list.todos);
  const [getTodo, setTodo] = React.useState('');
  const [getList, setList] = React.useState(list);

  const toggleTodoCompleted = index => {
    let list = getList;
    list.todos[index].completed = !list.todos[index].completed;

    updateReminderList(list);
  };

  const addReminder = () => {
    let list = getList;
    list.todos.push({title: getTodo, completed: false});
    updateReminderList(list);
    setTodo();
    Keyboard.dismiss();
  };

  const renderToDo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
          <Icon
            name={
              todo.completed
                ? 'checkbox-marked-outline'
                : 'checkbox-blank-outline'
            }
            size={24}
            color={COLORS.gray}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? COLORS.gray : COLORS.black,
            },
          ]}>
          {todo.title}
        </Text>
      </View>
    );
  };

  const taskCount = getList.todos.length;
  const completedCount = getList.todos.filter(todo => todo.completed).length;

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 64, right: 32, zIndex: 10}}
          onPress={handleListVisible}>
          <Icon name="close" size={24} color={COLORS.black} />
        </TouchableOpacity>

        <View
          style={[
            styles.section,
            styles.header,
            {borderBottomColor: getList.color},
          ]}>
          <View>
            <Text style={styles.title}>{getList.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={[styles.section, {flex: 3}]}>
          <FlatList
            data={getList.todos}
            renderItem={({item, index}) => renderToDo(item, index)}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, {borderColor: getList.color}]}
            onChangeText={text => setTodo(text)}
            value={getTodo}
          />
          <TouchableOpacity
            style={[styles.addTodo, {backgroundColor: getList.color}]}
            onPress={() => addReminder()}>
            <Icon name="plus" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: COLORS.gray,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todo: {
    color: COLORS.black,
    fontWeight: '700',
    fontSize: 16,
  },
});
