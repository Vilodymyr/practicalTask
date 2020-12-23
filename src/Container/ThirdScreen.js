import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
const {width} = Dimensions.get('window');
import {colors} from '../themes';

class ThirdScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      data: this.props.data,
    };
  }

  async componentDidMount() {}

  componentWillUnmount() {}

  renderFooter = () => {
    return <View style={{height: 100, width: '100%'}} />;
  };

  render() {
    let calculationWidth = width;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <SafeAreaView>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              marginBottom: 10,
              height: 200,
              width: calculationWidth,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                width: '100%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '30%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: this.state.data.album.images[0].url}}
                  resizeMode={'contain'}
                  style={{
                    height: '80%',
                    width: '80%',
                  }}
                />
              </View>
              <View
                style={{
                  width: '70%',
                  height: '100%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: colors.gray,
                    marginBottom: 3,
                  }}>
                  {'Name: '}
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: colors.colorBlack,
                      textAlign: 'right',
                    }}>
                    {this.state.data.name}
                  </Text>
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: colors.gray,
                    marginBottom: 3,
                  }}>
                  {'Artists: '}
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: colors.colorBlack,
                      textAlign: 'right',
                    }}>
                    {this.state.data.artists[0].name}
                  </Text>
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: colors.gray,
                    marginBottom: 3,
                  }}>
                  {'Album: '}
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: colors.colorBlack,
                      textAlign: 'right',
                    }}>
                    {this.state.data.album.name}
                  </Text>
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: colors.gray,
                    marginBottom: 3,
                  }}>
                  {'Duration: '}
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: colors.colorBlack,
                      textAlign: 'right',
                    }}>
                    {this.state.data.duration_ms}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default ThirdScreen;
