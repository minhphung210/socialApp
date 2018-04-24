import { StackNavigator } from 'react-navigation'
import Googlemail from '../Containers/Googlemail'
import History from '../Containers/History'
import Facebook from '../Containers/Facebook'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Googlemail: { screen: Googlemail },
  History: { screen: History },
  Facebook: { screen: Facebook },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
