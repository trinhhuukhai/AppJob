/**yarn add react-navigation
 * 
 * ios : yarn android react-native-safe-area-context
 * yarn add @react-navigation/bottom-tabs
 * yarn add @react-navigation/native
 * yarn add @react-navigation/native-stack
 */
 import * as React from 'react'
 import { Profile,ProfileCandidateDetails,ProfileRecuiter, ProductGridView, FoodList, JobList, JobListItem, JobDetail, FormCertificate, FormEducation, FormExperience, SaveJob, SaveJobItem, ApplyJob, ApplyJobItem, ListJob, ListjobItem, ProfileCandidate, CreateJob } from '../screens'
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
 import { createNativeStackNavigator } from '@react-navigation/native-stack'
 
 import {
   Image
 } from 'react-native';
 import { images, icons, colors } from '../constants/index';
 
 
 const Tab = createBottomTabNavigator()
 // const Stack = createNativeStackNavigator()
 
 
 
 const screenOptions = ({ route }) => ({
   headerShown: false,
   tabBarActiveTintColor: colors.primary,
   tabBarInactiveTintColor: 'black' ,
   // tabBarActiveBackgroundColor: colors.primary,
   // tabBarInactiveBackgroundColor: colors.primary,
 
   tabBarIcon: ({ focused, color, size }) => {
 
     let screenName = route.name
     let iconName = icons.icon_profile
     if (screenName == "Job") {
       iconName = icons.icon_find_job
     } else if (screenName == "SaveJob") {
       iconName = icons.icon_job_save
     }else if (screenName == "ApplyJob") {
       iconName = icons.icon_job_apply
     }else if (screenName == "Profile") {
       iconName = icons.icon_profile_white
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
 
//  const StackJob = createNativeStackNavigator()
//  function JobStack() {
//    return (
//      <StackJob.Navigator screenOptions={{ headerShown: true }}>
//        <StackJob.Screen name={"JobList"} component={JobList} />
//        <StackJob.Screen name={"JobListItem"} component={JobListItem} />
//        <StackJob.Screen name={"JobDetail"} component={JobDetail} />
//      </StackJob.Navigator>
//    )
//  }
 
//  const StackProfile = createNativeStackNavigator()
//  function ProfileStack() {
//    return (
//      <StackProfile.Navigator screenOptions={{ headerShown: true }}>
//        <StackProfile.Screen name={"Profile"} component={Profile} />
//        <StackProfile.Screen name={"FormCertificate"} component={FormCertificate} />
//        <StackProfile.Screen name={"FormEducation"} component={FormEducation} />
//        <StackProfile.Screen name={"FormExperience"} component={FormExperience} />
 
//      </StackProfile.Navigator>
//    )
//  }
 
 const StackRecuiterJob = createNativeStackNavigator()
 function JobRecuiterStack() {
   return (
     <StackRecuiterJob.Navigator screenOptions={{ headerShown: true }}>
       <StackRecuiterJob.Screen name={"ListJob"} component={ListJob} />
       <StackRecuiterJob.Screen name={"CreateJob"} component={CreateJob} />
 
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
 
 
 
 function UITabsRecruiter(props) {
 
   return <Tab.Navigator screenOptions={screenOptions}>
     <Tab.Screen name={"JobRecuiterStack"} component={JobRecuiterStack} />
     <Tab.Screen name={"ProfileCandidateStack"} component={ProfileCandidateStack} />
     <Tab.Screen name={"ProfileRecuiter"} component={ProfileRecuiter} />
   </Tab.Navigator>
 }
 
 export default UITabsRecruiter
 