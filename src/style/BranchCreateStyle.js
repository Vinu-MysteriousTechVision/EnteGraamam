import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-start',
    padding: 10
  },
  seperator: {
    height: 0.5,
    marginBottom: 20,
    backgroundColor: '#002887'
  },
  registerContainer: {
    backgroundColor: 'transparent'
  },
  btnNavBackStyle: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: 'transparent'
  },
  imageNavBackStyle: {
    width: 16,
    height: 16
  },
  lblFieldTitleStyle: {
    color: '#37AADC',
    fontSize: 16,
    marginLeft: 5
  },
  txtInputStyle: {
    height: 44,
    margin: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: 'gray'
  },
  btnRegisterContainer: {
    height: 50,
    marginTop: 20,
    backgroundColor: '#001956'
  },
  btnRegister: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtButtonRegister: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20
  }
});

module.exports = styles;
