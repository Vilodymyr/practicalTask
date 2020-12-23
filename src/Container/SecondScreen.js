import React from 'react';
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getTracks} from '../helper/api';
const {width} = Dimensions.get('window');
import {images} from '../themes';

class SecondScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayMusicLanugauge: [],

      selectedIds: [],
    };
    this.callendPointGet1();
  }

  async callendPointGet1() {
    const {
      navigation: {
        state: {params},
      },
    } = this.props;
    const json1 = await getTracks(params.selectedIds);
    const {tracks} = json1;
    let itemsTracks = tracks.map((item) => {
      const {album} = item;
      return {
        id: album.id,
        title: album.name,
        imageUri: album.images ? album.images[0].url : undefined,
        data: item,
      };
    });
    this.setState({arrayMusicLanugauge: itemsTracks});
  }

  _renderItemsCategories(item, index) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{marginBottom: 2}}
        onPress={() => Actions.thirdScreen({data: item.data})}>
        <View
          style={{
            height: 130,
            width: 130,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: item.color,
              borderRadius: 50,
            }}>
            <Image
              source={{uri: item.imageUri}}
              resizeMode={'contain'}
              style={{
                height: '100%',
                width: '100%',
                alignSelf: 'flex-end',
                borderRadius: 50,
              }}
            />
            {this.state.selectedIds.includes(item.id) && (
              <View
                style={{
                  position: 'absolute',
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  backgroundColor: 'white',
                  alignSelf: 'flex-end',
                  margin: 7,
                  right: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.check_Icon}
                  resizeMode={'contain'}
                  style={{height: '60%', width: '60%'}}
                />
              </View>
            )}
          </View>
          <Text
            numberOfLines={2}
            style={{
              color: 'white',
              fontSize: 12,
              textAlign: 'center',
              marginBottom: 10,
              marginTop: 10,
              width: '100%',
              maxWidth: '70%',
              marginBottom: 10,
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderFooter = () => {
    return <View style={{height: 100, width: '100%'}} />;
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <SafeAreaView>
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                padding: 5,
                textAlign: 'center',
              }}>
            </Text>
          </View>
          <FlatList
            data={this.state.arrayMusicLanugauge}
            ref={(ref) => {
              this.flatList_Ref = ref;
            }}
            numColumns={3}
            columnWrapperStyle={style.row}
            renderItem={({item, index}) =>
              this._renderItemsCategories(item, index)
            }
            ListFooterComponent={this.renderFooter}
            enableEmptySections={true}
            style={{height: '90%', width: '95%', alignSelf: 'center'}}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
          />
          {this.state.selectedIds.length !== 0 && (
            <TouchableOpacity
              style={{
                height: '7%',
                width: width / 2 - 50,
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 10,
                position: 'absolute',
                alignSelf: 'center',
                bottom: 10,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                {'Done'}
              </Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  row: {
    margin: 5,
    justifyContent: 'space-around',
  },
});

export default SecondScreen;
