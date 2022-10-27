/**yarn add react-navigation
 * 
 * ios : yarn android react-native-safe-area-context
 * yarn add @react-navigation/bottom-tabs
 * yarn add @react-navigation/native
 * yarn add @react-navigation/native-stack
 */
import React, { useState, useEffect } from 'react'
import { Profile, ProfileCandidateDetails, ProfileRecuiter,FormProfile, Company, Setting, CreateCompany, ProductGridView, ViewProfileUser, FoodList, JobList, JobListItem, JobDetail, FormCertificate, FormEducation, FormExperience, SaveJob, SaveJobItem, ApplyJob, ApplyJobItem, ListJob, ListjobItem, ProfileCandidate, CreateJob } from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { images, icons, colors } from '../constants/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator()
// const Stack = createNativeStackNavigator()



const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: 'black',
  // tabBarActiveBackgroundColor: colors.primary,
  // tabBarInactiveBackgroundColor: colors.primary,

  tabBarIcon: ({ focused, color, size }) => {

    let screenName = route.name
    let iconName = icons.icon_profile
    if (screenName == "Job") {
      iconName = icons.icon_find_job
    } else if (screenName == "Saved") {
      iconName = icons.icon_job_save
    } else if (screenName == "Applied") {
      iconName = icons.icon_job_apply
    } else if (screenName == "Profiles") {
      iconName = icons.icon_profile_white
    }
    else if (screenName == "JobRecuiterStack") {
      iconName = icons.icon_job_recruiter
    }
    else if (screenName == "ProfileCandidateStack") {
      iconName = icons.icon_check_profile
    }
    else if (screenName == "ProfileRecuiter") {
      iconName = icons.icon_profile_white
    } else if (screenName == "Setting") {
      iconName = icons.icon_setting_logout
    }else if (screenName == "CompanyStack") {
      iconName = icons.icon_company
    }

    return <Image
      source={iconName}
      style={{
        paddingTop: 5,
        width: 25,
        height: 25
      }}
      color={focused ? 'white' : colors.inactive}
    />
  },

})



const StackJob = createNativeStackNavigator()
function Job() {
  return (
    <StackJob.Navigator screenOptions={{ headerShown: true }}>
      <StackJob.Screen name={"JobList"} component={JobList} />
      <StackJob.Screen name={"JobListItem"} component={JobListItem} />
      <StackJob.Screen name={"JobDetail"} component={JobDetail} />

    </StackJob.Navigator>)
}

const StackProfile = createNativeStackNavigator()
function Profilles() {
  return (
    <StackProfile.Navigator screenOptions={{ headerShown: true }}>
      <StackProfile.Screen name={"Profile"} component={Profile} />
      <StackProfile.Screen name={"FormCertificate"} component={FormCertificate} />
      <StackProfile.Screen name={"FormEducation"} component={FormEducation} />
      <StackProfile.Screen name={"FormExperience"} component={FormExperience} />
      <StackProfile.Screen name={"FormProfile"} component={FormProfile} />

    </StackProfile.Navigator>
  )
}

const StackRecuiterJob = createNativeStackNavigator()
function JobRecuiterStack() {
  return (
    <StackRecuiterJob.Navigator screenOptions={{ headerShown: true }}>
      <StackRecuiterJob.Screen name={"ListJob"} component={ListJob} />
      {/* <StackRecuiterJob.Screen name={"CreateJob"} component={CreateJob} /> */}
      <StackRecuiterJob.Screen name={"ListjobItem"} component={ListjobItem} />
      <StackRecuiterJob.Screen name={"ViewProfileUser"} component={ViewProfileUser} />

    </StackRecuiterJob.Navigator>
  )
}

const StackCompany = createNativeStackNavigator()
function CompanyStack() {
  return (
    <StackRecuiterJob.Navigator screenOptions={{ headerShown: true }}>
      <StackCompany.Screen name={"Company"} component={Company} />
      <StackCompany.Screen name={"CreateCompany"} component={CreateCompany} />
      <StackCompany.Screen name={"CreateJob"} component={CreateJob} />

    </StackRecuiterJob.Navigator>
  )
}

const StackProfileCandidate = createNativeStackNavigator()
function ProfileCandidateStack() {
  return (
    <StackProfileCandidate.Navigator screenOptions={{ headerShown: true }}>
      <StackProfileCandidate.Screen name={"ProfileCandidate"} component={ProfileCandidate} />
      <StackProfileCandidate.Screen name={"ProfileCandidateDetails"} component={ProfileCandidateDetails} />

    </StackProfileCandidate.Navigator>
  )
}

const StackCandidateScreen = createNativeStackNavigator()
function CandidateStack() {
  return (
    <StackCandidateScreen.Navigator screenOptions={{ headerShown: true }}>
      <StackCandidateScreen.Screen name={"ProfileCandidate"} component={ProfileCandidate} />
      <StackCandidateScreen.Screen name={"ProfileCandidateDetails"} component={ProfileCandidateDetails} />

    </StackCandidateScreen.Navigator>
  )
}

const StackSavedJob = createNativeStackNavigator()
function Saved() {
  return (
    <StackSavedJob.Navigator screenOptions={{ headerShown: true }}>
      <StackSavedJob.Screen name={"SaveJob"} component={SaveJob} />
      <StackSavedJob.Screen name={"SaveJobItem"} component={SaveJobItem} />
    </StackSavedJob.Navigator>
  )
}

const StackApplyJob = createNativeStackNavigator()
function Applied() {
  return (
    <StackApplyJob.Navigator screenOptions={{ headerShown: true }}>
      <StackApplyJob.Screen name={"ApplyJob"} component={ApplyJob} />
      <StackApplyJob.Screen name={"ApplyJobItem"} component={ApplyJobItem} />
    </StackApplyJob.Navigator>
  )
}



function UITabs(props) {

  const { navigation, route } = props
  //function of navigate to/back
  const { navigate, goback } = navigation


  const [role, setRole] = useState('')
  const [access, setAccess] = useState('')


  useEffect(() => {

    handleGetToken();

  }, [handleGetToken]);

  const handleGetToken = async () => {
    const roleApi = await AsyncStorage.getItem("roleApi");
    const accessApi = await AsyncStorage.getItem("access");
    setRole(roleApi)
    setAccess(accessApi)
  };

  const handleLogout = () => {
    AsyncStorage.clear();
    navigate('Login');
  };



  return (<>

  {/* <View><Text>Token: {access}</Text>
  <Text>{role}</Text>
  </View> */}
    {role === "candidate" ? <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={"Job"} component={Job} />
      <Tab.Screen name={"Saved"} component={Saved} />
      <Tab.Screen name={"Applied"} component={Applied} />
      <Tab.Screen name={"Profiles"} component={Profilles} />
      <Tab.Screen name={"Setting"} component={Setting} />

    </Tab.Navigator>
      :
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name={"CompanyStack"} component={CompanyStack} />
        <Tab.Screen name={"JobRecuiterStack"} component={JobRecuiterStack} />
        <Tab.Screen name={"ProfileRecuiter"} component={ProfileRecuiter} />
        <Tab.Screen name={"Setting"} component={Setting} />

      </Tab.Navigator>
    }
  </>

  )

}

export default UITabs
