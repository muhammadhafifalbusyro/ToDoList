import React from 'react';
import {View, Image, StyleSheet,Text} from 'react-native';
import Spinner from 'react-native-spinkit';
import StatusBarCustom from '../../components/statusbar';

class SplashScreen extends React.Component {
  componentDidMount = () => {
    // Remember the timer handle
    this.timerHandle = setTimeout(() => {
      this.props.navigation.replace('Home');
      this.timerHandle = 0;
    }, 4000);
  };
  componentWillUnmount = () => {
    // Is our timer running?
    if (this.timerHandle) {
      // Yes, clear it
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBarCustom />
        <Image
          source={require('../../assets/images/ikontodolist.png')}
          style={styles.logo}
        />
        <Text style={styles.text1}>ToDo<Text style={styles.text2}>List</Text></Text>
        <Spinner
          visible={true}
          type="Wave"
          color="deepskyblue"
          style={styles.spinner}
        />
      </View>
    );
  }
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    resizeMode: 'contain',
    height: 100,
    width: 80,
  },
  spinner: {
    marginTop: 10,
  },
  text1:{
    fontSize:25,
    fontWeight:'bold'
  },
  text2:{
    color:'deepskyblue'
  }
});
