import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import COLORS from '../Animation/Colors';
import ReminderListModal from './ReminderListModal';

export default ReminderList = ({list, updateReminderList}) => {
  const [getListVisible, setListVisible] = React.useState(false);

  const handleListVisible = () =>
    getListVisible ? setListVisible(false) : setListVisible(true);

  const completedCount = list.todos.filter(todo => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  return (
    <View>
      <Modal
        animationType="slide"
        visible={getListVisible}
        onRequestClose={handleListVisible}>
        <ReminderListModal
          list={list}
          handleListVisible={handleListVisible}
          updateReminderList={updateReminderList}
        />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, {backgroundColor: list.color}]}
        onPress={handleListVisible}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
});
