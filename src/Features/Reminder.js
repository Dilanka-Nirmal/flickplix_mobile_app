import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import {onAuthStateChanged} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';
import {auth, db} from '../../firebase';

import COLORS from '../Components/Animation/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReminderList from '../Components/Reminder/ReminderList';
import AddReminderModal from '../Components/Reminder/AddReminderModal';

export const Reminder = ({navigation}) => {
  const [getUser, setUser] = React.useState(null);
  const [getTodoVisible, setTodoVisible] = React.useState(false);
  const [getReminderList, setReminderList] = React.useState([]);

  // React.useEffect(() => {
  //   if (getUser) {
  //     loadToDoList();
  //   }
  // }, [getUser]);

  React.useEffect(() => {
    if (getUser) {
      const unsubscribe = loadToDoList();

      return () => {
        unsubscribe();
      };
    }
  }, [getUser]);

  // Check if user is logged in
  onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid;
      setUser(uid);
    } else {
      navigation.navigate('LoginScreen');
    }
  });

  const loadToDoList = () => {
    const q = query(collection(db, 'users', getUser, 'lists'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const lists = [];

      querySnapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()});
      });

      setReminderList(lists);
    });

    return unsubscribe;
  };

  const handleTodoVisible = () =>
    getTodoVisible ? setTodoVisible(false) : setTodoVisible(true);

  const renderList = list => {
    return <ReminderList list={list} updateReminderList={updateReminderList} />;
  };

  const addReminderList = list => {
    setReminderList([
      ...getReminderList,
      {
        ...list,
        id: getReminderList.length + 1,
        todos: [],
      },
    ]);
  };

  const updateReminderList = list => {
    setReminderList(
      getReminderList.map(item => {
        return item.id === list.id ? list : item;
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={getTodoVisible}
        onRequestClose={handleTodoVisible}>
        <AddReminderModal
          handleTodoVisible={handleTodoVisible}
          addReminderList={addReminderList}
        />
      </Modal>
      <View styles={{flexDirection: 'row'}}>
        {/* <View style={styles.divider} /> */}
        <Text style={styles.title}>
          ToDo <Text style={{fontWeight: '300', color: COLORS.blue}}>List</Text>
        </Text>
        {/* <View style={styles.divider} /> */}
      </View>
      <View style={{marginVertical: 48}}>
        <TouchableOpacity style={styles.addList} onPress={handleTodoVisible}>
          <Icon name="movie-open-edit-outline" size={32} color={COLORS.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={getReminderList}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: '#A7CBD9',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: COLORS.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
