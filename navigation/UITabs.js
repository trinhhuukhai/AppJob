/**yarn add react-navigation
 * 
 * ios : yarn android react-native-safe-area-context
 * yarn add @react-navigation/bottom-tabs
 * yarn add @react-navigation/native
 * yarn add @react-navigation/native-stack
 */
import React, { useState, useEffect } from 'react'
import { Profile, ProfileCandidateDetails, ProfileRecuiter, FormProfile, ListJobCandidate, ListJobCandidateDetail, Company, Setting, CreateCompany, ProductGridView, ViewProfileUser, FoodList, CompanyList, CompanyListItem, CompanyDetail, FormCertificate, FormEducation, FormExperience, SaveJob, SaveJobItem, ApplyJob, ApplyJobItem, ListJob, ListjobItem, ProfileCandidate, CreateJob } from '../screens'
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
    if (screenName == "Companys") {
      iconName = icons.icon_company
    } else if (screenName == "Saved") {
      iconName = icons.icon_job_save
    } else if (screenName == "Applied") {
      iconName = icons.icon_job_apply
    } else if (screenName == "Profiles") {
      iconName = icons.icon_profile_white
    }
    else if (screenName == "JobCompany") {
      iconName = icons.icon_job_recruiter
    }
    else if (screenName == "ProfileCandidateStack") {
      iconName = icons.icon_check_profile
    }
    else if (screenName == "ProfileRecuiter") {
      iconName = icons.icon_profile_white
    } else if (screenName == "Setting") {
      iconName = icons.icon_setting_logout
    } else if (screenName == "InfoCompany") {
      iconName = icons.icon_company
    } else if (screenName == "Jobs") {
      iconName = icons.icon_find_job
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



const StackCompanyC = createNativeStackNavigator()
function Companys() {
  return (
    <StackCompanyC.Navigator screenOptions={{ headerShown: true }}>
      <StackCompanyC.Screen name={"CompanyList"} component={CompanyList} />
      <StackCompanyC.Screen name={"CompanyListItem"} component={CompanyListItem} />
      <StackCompanyC.Screen name={"CompanyDetail"} component={CompanyDetail} />

    </StackCompanyC.Navigator>)
}

const StackJobC = createNativeStackNavigator()
function Jobs() {
  return (
    <StackJobC.Navigator screenOptions={{ headerShown: true }}>
      <StackJobC.Screen name={"ListJobCandidate"} component={ListJobCandidate} />
      <StackJobC.Screen name={"ListJobCandidateDetail"} component={ListJobCandidateDetail} />
    </StackJobC.Navigator>)
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
function JobCompany() {
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
function InfoCompany() {
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true)
    AsyncStorage.clear();
    navigate('Login');
  };



  return (<>

    {/* <View><Text>Token: {access}</Text>
  <Text>{role}</Text>
  </View> */}
    {role === "candidate" ? <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={"Jobs"} component={Jobs} />
      <Tab.Screen name={"Companys"} component={Companys} />
      <Tab.Screen name={"Saved"} component={Saved} />
      <Tab.Screen name={"Applied"} component={Applied} />
      <Tab.Screen name={"Profiles"} component={Profilles} />
      {/* <Tab.Screen name={"Setting"} component={Setting} /> */}

    </Tab.Navigator>
      :
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name={"InfoCompany"} component={InfoCompany} />
        <Tab.Screen name={"JobCompany"} component={JobCompany} />
        <Tab.Screen name={"ProfileRecuiter"} component={ProfileRecuiter} />
        {/* <Tab.Screen name={"Setting"} component={Setting} /> */}

      </Tab.Navigator>
    }
  </>

  )

}

export default UITabs
