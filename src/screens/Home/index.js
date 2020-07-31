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
    AsyncStorage.getItem('data').then((value) => {
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
  hapusData = (value) => {
    let newDelete = this.state.data.filter((cek) => {
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
          style={{
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
          }}
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
  peringatan = (value) => {
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
      <View style={{flex: 1}}>
        <Modal
          visible={this.state.visible}
          animationType="slide"
          onRequestClose={() => this.setState({visible: false})}>
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
              <View
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  paddingLeft: 10,
                  elevation: 5,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({visible: false})}>
                  <Icon name="arrow-left" size={25} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 150,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{
                    height: 100,
                    width: '80%',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'deepskyblue',
                    padding: 5,
                  }}
                  placeholder="Tulis aktivitas"
                  textAlignVertical="top"
                  multiline={true}
                  onChangeText={(text) => this.setState({todo: text})}
                />
              </View>
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {this.state.dataColor.map((value, key) => {
                  if (this.state.color == value.color) {
                    return (
                      <View
                        key={key}
                        style={{
                          width: width / 6,
                          alignItems: 'center',
                          height: 60,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.setState({color: value.color})}
                          activeOpacity={0.5}
                          delayPressIn={10}
                          style={{
                            height: 50,
                            width: '90%',
                            backgroundColor: value.color,
                            borderWidth: 3,
                          }}></TouchableOpacity>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={key}
                        style={{
                          width: width / 6,
                          alignItems: 'center',
                          height: 60,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.setState({color: value.color})}
                          activeOpacity={0.5}
                          delayPressIn={10}
                          style={{
                            height: 50,
                            width: '90%',
                            backgroundColor: value.color,
                          }}></TouchableOpacity>
                      </View>
                    );
                  }
                })}
              </View>
              <View
                style={{
                  height: 100,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableNativeFeedback onPress={() => this.tambahData()}>
                  <View
                    style={{
                      height: 50,
                      width: '70%',
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'deepskyblue',
                      elevation: 5,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 16,
                      }}>
                      Tambah Data
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </ScrollView>
          </View>
        </Modal>
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>To Do List</Text>
        </View>
        <ScrollView style={{flex: 1}}>
          {this.state.data.map((value, key) => {
            return (
              <View
                key={key}
                style={{
                  height: 60,
                  width: '100%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  marginBottom: 5,
                  elevation: 5,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '5%',
                    backgroundColor: value.color,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
                <View
                  style={{
                    height: '100%',
                    width: '85%',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    padding: 5,
                  }}>
                  <Text>{value.todo}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.peringatan(value.id)}
                  activeOpacity={0.5}
                  delayPressIn={10}
                  style={{
                    height: '100%',
                    width: '10%',
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.5}
          delayPressIn={10}
          style={{
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
          }}
          onPress={() => this.setState({visible: true})}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
        {this.simpanData()}
      </View>
    );
  }
}
export default Home;
