import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TextInput,
  Dimensions,
  TouchableNativeFeedback,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Home extends React.Component {
  state = {
    visible: false,
    status: false,
    todo: '',
    color: 'crimson',
    data: [],
    dataColor: [
      {
        color: 'crimson',
      },
      {
        color: 'green',
      },
      {
        color: 'gold',
      },
      {
        color: 'orange',
      },
      {
        color: 'purple',
      },
      {
        color: 'skyblue',
      },
      {
        color: 'pink',
      },
      {
        color: 'blueviolet',
      },
      {
        color: 'brown',
      },
      {
        color: 'coral',
      },
      {
        color: 'darkcyan',
      },
      {
        color: 'goldenrod',
      },
    ],
  };
  componentDidMount() {
    AsyncStorage.getItem('data').then(value => {
      if (value != null) {
        this.setState({data: JSON.parse(value)});
      }
    });
  }
  tambahData = () => {
    const {todo, color} = this.state;
    if (todo != '' && color != '') {
      this.state.data.push({
        id: Math.random(),
        todo: todo,
        color: color,
      });
      this.setState({
        data: this.state.data,
        status: true,
        todo: '',
        color: 'crimson',
        visible: false,
      });
    } else {
      ToastAndroid.show(
        'Data tidak boleh kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  hapusData = value => {
    let newDelete = this.state.data.filter(cek => {
      return value != cek.id;
    });
    this.setState({data: newDelete, status: true});
  };
  simpanData = () => {
    const {status} = this.state;
    if (status) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          delayPressIn={10}
          style={styles.buttonSave}
          onPress={() => {
            AsyncStorage.setItem('data', JSON.stringify(this.state.data));
            this.setState({status: false});
            ToastAndroid.show(
              'Data berhasil tersimpan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }}>
          <Icon name="save" size={30} color="white" />
        </TouchableOpacity>
      );
    } else {
      return false;
    }
  };
  peringatan = value => {
    Alert.alert(
      'Hapus Data',
      'Anda yakin ingin menghapusnya ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.hapusData(value)},
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.visible}
          animationType="slide"
          onRequestClose={() => this.setState({visible: false})}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.scrollViewModal}>
              <View style={styles.navbarModal}>
                <TouchableOpacity
                  onPress={() => this.setState({visible: false})}>
                  <Icon name="arrow-left" size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapModal}>
                <TextInput
                  style={styles.inputActivity}
                  placeholder="Tulis aktivitas"
                  textAlignVertical="top"
                  multiline={true}
                  onChangeText={text => this.setState({todo: text})}
                />
              </View>
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {this.state.dataColor.map((value, key) => {
                  if (this.state.color == value.color) {
                    return (
                      <View key={key} style={styles.colorWrap}>
                        <TouchableOpacity
                          onPress={() => this.setState({color: value.color})}
                          activeOpacity={0.5}
                          delayPressIn={10}
                          style={{
                            ...styles.buttonColorChoise,
                            backgroundColor: value.color,
                            borderWidth: 3,
                          }}
                        />
                      </View>
                    );
                  } else {
                    return (
                      <View key={key} style={styles.colorWrap}>
                        <TouchableOpacity
                          onPress={() => this.setState({color: value.color})}
                          activeOpacity={0.5}
                          delayPressIn={10}
                          style={{
                            ...styles.buttonColorChoise,
                            backgroundColor: value.color,
                          }}
                        />
                      </View>
                    );
                  }
                })}
              </View>
              <View style={styles.addButtonModalWrap}>
                <TouchableNativeFeedback onPress={() => this.tambahData()}>
                  <View style={styles.addButtonModal}>
                    <Text style={styles.textAddButtonModal}>Tambah Data</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </ScrollView>
          </View>
        </Modal>
        <View style={styles.navbar}>
          <Text style={styles.textNavbar}>To Do List</Text>
        </View>
        <ScrollView style={styles.scrollViewWrap}>
          {this.state.data.map((value, key) => {
            return (
              <View key={key} style={styles.listWrap}>
                <View
                  style={{...styles.tagColor, backgroundColor: value.color}}
                />
                <View style={styles.listBox}>
                  <Text>{value.todo}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.peringatan(value.id)}
                  activeOpacity={0.5}
                  delayPressIn={10}
                  style={styles.deleteButton}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.5}
          delayPressIn={10}
          style={styles.addButton}
          onPress={() => this.setState({visible: true})}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
        {this.simpanData()}
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textNavbar: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollViewWrap: {
    flex: 1,
  },
  listWrap: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 5,
    elevation: 5,
  },
  tagColor: {
    height: '100%',
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBox: {
    height: '100%',
    width: '85%',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 5,
  },
  deleteButton: {
    height: '100%',
    width: '10%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
    borderRadius: 100,
    elevation: 3,
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    zIndex: 1,
  },
  buttonSave: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
    borderRadius: 100,
    elevation: 3,
    position: 'absolute',
    bottom: '20%',
    right: '10%',
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  scrollViewModal: {
    flex: 1,
  },
  navbarModal: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 10,
    elevation: 5,
  },
  inputWrapModal: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputActivity: {
    height: 100,
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'deepskyblue',
    padding: 5,
  },
  colorWrap: {
    width: width / 6,
    alignItems: 'center',
    height: 60,
  },
  buttonColorChoise: {
    height: 50,
    width: '90%',
  },
  addButtonModalWrap: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonModal: {
    height: 50,
    width: '70%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
    elevation: 5,
  },
  textAddButtonModal: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});
