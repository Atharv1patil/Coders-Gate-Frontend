import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const Progressbar = ({progress}) => {
  return (
    <View>
      <Progress.Bar progress={progress} width={Dimensions.get('screen').width*0.95} style={{margin: 10}} />
    </View>
  )
}

export default Progressbar