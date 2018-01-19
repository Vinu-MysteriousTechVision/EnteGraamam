import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  NetInfo,
  Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BranchMemberCreateController from '../controller/BranchMemberCreateController';
import PropTypes from 'prop-types';
import styles from '../style/BranchMemberCreateStyle';

class BranchMemberCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
      name: '',
      houseName: '',
      place: '',
      postalName: '',
      pincode: '',
      dateOfBirth: '',
      fatherName: '',
      motherName: '',
      qualification: '',
      job: ''
    };

    this.dataBase = null;
    this.objBranchMemberCreateController = new BranchMemberCreateController();
    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Create Branch Member',
      headerTitleStyle: { color: '#FFFFFF' },
      headerStyle: { backgroundColor: '#28417D' },
      headerBackTitleStyle: { backgroundColor: '#FFFFFF' },
      headerLeft: (
        <TouchableHighlight style={styles.btnNavBackStyle} underlayColor="rgba(255,255,255,0.15)" onPress={() => params.onBack()}>
          <Image source={require('../res/images/back_white.png')} style={styles.imageNavBackStyle} />
        </TouchableHighlight>
      )
    };
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  };

  _keyboardDidShow (e) {
    console.log(e);
  }

  _keyboardDidHide (e) {
    console.log(e);
  }

  tapOnBack() {
    this.props.navigation.goBack();
  }

  componentDidMount() {

    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange );
    NetInfo.isConnected.fetch().done( (isConnected) => { this.setState({ isConnected }); } );
    this.props.navigation.setParams({ onBack: this.tapOnBack.bind(this) });
    this.refName.focus();

    this.objBranchMemberCreateController.openDBSchema();
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener( 'connectionChange', this._handleConnectivityChange );
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  registerRequest() {
    const { params = {} } = this.props.navigation.state;
    var branchData = params.branch;


    var branchMember = {
      'branch_id': branchData.id,
      'name': this.state.name,
      'houseName': this.state.houseName,
      'place': this.state.place,
      'postalName': this.state.postalName,
      'pincode': this.state.pincode,
      'dateOfBirth': this.state.dateOfBirth,
      'fatherName': this.state.fatherName,
      'motherName': this.state.motherName,
      'qualification': this.state.qualification,
      'job': this.state.job,
      'isSynced': false
    };

    this.objBranchMemberCreateController.createBranchMember(branchMember);

    if (params.registerCallback) {
      params.registerCallback(this.objBranchMemberCreateController.getBranchMember());
    }
    this.tapOnBack();
  }

  tapOnSelectCource() {
    this.props.navigation.navigate('DataList');
  }

  focusNextField = (nextField, nextFieldSubstitute = null) => {
    if (nextField) {
      nextField.focus();
      return;
    }

    if (nextFieldSubstitute) {
      nextFieldSubstitute.focus();
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'always'}
          scrollEventThrottle={16}>
          <View style={[styles.registerContainer, { backgroundColor: '#FFFFFF' }]}>
            <TextInput
              ref={(objName) => this.refName = objName}
              style={styles.txtInputStyle}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              editable={true}
              maxLength={100}
              placeholder="Name"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField(this.refHouseName)} />
            <View style={styles.seperator} />
            <TextInput
              ref={(objHouseName) => this.refHouseName = objHouseName}
              style={styles.txtInputStyle}
              onChangeText={(houseName) => this.setState({ houseName })}
              value={this.state.houseName}
              editable={true}
              maxLength={100}
              placeholder="House name"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField(this.refPlace)} />
            <View style={[styles.seperator, { marginBottom: 0, marginLeft: 0 }]} />
            <TextInput
              ref={(objPlace) => this.refPlace = objPlace}
              style={styles.txtInputStyle}
              onChangeText={(place) => this.setState({ place })}
              value={this.state.place}
              editable={true}
              maxLength={100}
              placeholder="Place"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField(this.refPostalName)} />
            <View style={[styles.seperator, { marginBottom: 0, marginLeft: 0 }]} />
            <TextInput
              ref={(objPostalName) => this.refPostalName = objPostalName}
              style={styles.txtInputStyle}
              onChangeText={(postalName) => this.setState({ postalName })}
              value={this.state.postalName}
              editable={true}
              maxLength={100}
              placeholder="Postoffice"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField(this.refPincode)} />
            <View style={[styles.seperator, { marginBottom: 0, marginLeft: 0 }]} />
            <TextInput
              ref={(objPincode) => this.refPincode = objPincode}
              style={styles.txtInputStyle}
              onChangeText={(pincode) => this.setState({ pincode })}
              value={this.state.pincode}
              editable={true}
              maxLength={100}
              placeholder="Pincode"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField(this.refDOB)} />
            <View style={styles.seperator} />
            <TextInput
              ref={(objDateOfBirth) => this.refDOB = objDateOfBirth}
              style={styles.txtInputStyle}
              onChangeText={(dateOfBirth) => this.setState({ dateOfBirth })}
              value={this.state.dateOfBirth}
              editable={true}
              maxLength={100}
              placeholder="Date Of Birth"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField(this.refFatherName)} />
            <View style={styles.seperator} />
            <TextInput
              ref={(objFatherName) => this.refFatherName = objFatherName}
              style={styles.txtInputStyle}
              onChangeText={(fatherName) => this.setState({ fatherName })}
              value={this.state.fatherName}
              editable={true}
              maxLength={100}
              placeholder="Father name"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField(this.refMotherName)} />
            <View style={styles.seperator} />
            <TextInput
              ref={(objMotherName) => this.refMotherName = objMotherName}
              style={styles.txtInputStyle}
              onChangeText={(motherName) => this.setState({ motherName })}
              value={this.state.motherName}
              editable={true}
              maxLength={100}
              placeholder="Mother name"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField(this.refQualification)} />
            <View style={styles.seperator} />
            <TouchableHighlight style={[{ backgroundColor: 'transparent', margin: 5 }]} underlayColor="rgba(255,255,255,0.15)" onPress={this.tapOnSelectCource.bind(this)}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, height: 44, justifyContent: 'center' }}>
                  <Text style={{ color: '#828282', fontWeight: 'normal', fontSize: 14 }}>Select Qualification</Text>
                </View>
                <View style={styles.imageContainerSelction}>
                  <Image source={require('../res/images/right.png')} style={styles.imageRightArrow} />
                </View>
              </View>
            </TouchableHighlight>
            <View style={styles.seperator} />
            <TextInput
              ref={(objJob) => this.refJob = objJob}
              style={styles.txtInputStyle}
              onChangeText={(job) => this.setState({ job })}
              value={this.state.job}
              editable={true}
              maxLength={100}
              placeholder="Occupation"
              placeholderTextColor='#828282'
              underlineColorAndroid="rgba(0,0,0,0)"
              returnKeyType="next"
              returnKeyLabel="次"
              blurOnSubmit={false} />
            <View style={styles.seperator} />
          </View>
          <View style={[styles.btnRegisterContainer]}>
            <TouchableHighlight style={styles.btnRegister} underlayColor="rgba(255,255,255,0.15)" onPress={this.registerRequest.bind(this)}>
              <Text style={styles.txtButtonRegister} numberOfLines={1}>Add</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

BranchMemberCreate.propTypes = {
  navigation: PropTypes.object
};

module.exports = BranchMemberCreate;
